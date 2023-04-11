import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "../../components/SearchBar";
import Map from "./Maps";
import { getCurrentLocation } from "./LocationService";
import { searchCarpark } from "./SearchCarpark";
import CarparkInfoCard from "./CarparkInfoCard";

const DisplayCarpark = ({ route }) => {
  const [filteredCarparks, setFilteredCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    route.params ? route.params.searchTerm : ""
  );
  const [mapRegion, setMapRegion] = useState({
    latitude: 103.855,
    longitude: 1.3007,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getLocation() {
      const location = await getCurrentLocation();
      setMapRegion(location);

      if (searchTerm === "") {
        const carparks = await searchCarpark(location);
        const filteredCarparks = carparks.filter((carpark) => {
          // Calculate the distance between the user's location and the carpark
          const distance = Math.sqrt(
            Math.pow(carpark.x_coord - location.latitude, 2) +
              Math.pow(carpark.y_coord - location.longitude, 2)
          );

          // Return true if the carpark is within 1km of the user's location
          return distance < 0.01;
        });

        setFilteredCarparks(filteredCarparks);
        setSelectedCarpark(null);

        if (filteredCarparks.length === 0) {
          setErrorMessage("No carparks found nearby.");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      }else{
        handleSearchCarpark();
      }
    }

    getLocation();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  async function handleSearchCarpark() {
    let carparks = await searchCarpark(searchTerm);
    const filteredCarparks =
      carparks &&
      carparks.filter((carpark) => carpark.x_coord && carpark.y_coord);
    setFilteredCarparks(filteredCarparks);
    setSelectedCarpark(null);
    if (filteredCarparks.length === 0) {
      setErrorMessage("No carparks found. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  }

  const handleCarparkSelect = (carpark) => {
    setSelectedCarpark(carpark);
  };

  return (
    <View style={styles.container}>
      {mapRegion && (
        <Map
          region={mapRegion}
          carparks={filteredCarparks}
          onCarparkSelect={handleCarparkSelect}
        />
      )}
      <View style={styles.searchBar}>
        <SearchBar
          onSearchTermChange={handleSearch}
          searchTerm={searchTerm}
          onSearch={handleSearchCarpark}
        />
      </View>
      {errorMessage !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    position: "absolute",
    width: "100%",
    top: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  errorBox: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 100,
    left: 10,
    right: 10,
  },
  errorText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DisplayCarpark;
