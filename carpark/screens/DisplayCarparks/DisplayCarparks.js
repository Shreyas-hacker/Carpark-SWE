import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "../../components/SearchBar";
import Map from "./Maps";
import { getCurrentLocation, getPostalAddress } from "./LocationService";
import { searchCarpark, convertLatLong } from "./SearchCarpark";
import CarparkInfoCard from "./CarparkInfoCard";
import { StatusBar } from "expo-status-bar";

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
        const postalAdress = await getPostalAddress(location);
        const district = postalAdress[0].district;
        const street = postalAdress[0].street.toUpperCase();
        const carparks = await searchCarpark(district);
        const filteredCarparks = carparks.filter((carpark) => {
          return carpark.address.includes(street);
        });
        setFilteredCarparks(filteredCarparks);
        setSelectedCarpark(null);

        if (filteredCarparks.length === 0) {
          setErrorMessage("No carparks found nearby.");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      } else {
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
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {mapRegion && (
          <Map
            region={mapRegion}
            carparks={filteredCarparks}
            onCarparkSelect={handleCarparkSelect}
            searchTerm={searchTerm}
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
    </>
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
