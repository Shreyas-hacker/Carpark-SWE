import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar";
import PrimaryButton from "../../components/PrimaryButton";
import Map from "./Maps";
import { getCurrentLocation } from "./LocationService";
import { searchCarpark, searchCarparkLots } from "./SearchCarpark";
import CarparkInfoCard from "./CarparkInfoCard";

const DisplayCarpark = () => {
  const [filteredCarparks, setFilteredCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 103.855,
    longitude: 1.3007,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  useEffect(() => {
    async function getLocation() {
      const location = await getCurrentLocation();
      setMapRegion(location);
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
      {selectedCarpark && (
        <View style={styles.cardContainer}>
          <CarparkInfoCard carpark={selectedCarpark} />
        </View>
      )}
      <View style={styles.searchBar}>
        <SearchBar onSearchTermChange={handleSearch} searchTerm={searchTerm} />
      </View>
      {/* <View style={styles.button}>
        
        <PrimaryButton
          onSuccess={true}
          text="Search"
          onAttempt={handleSearchCarpark}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // button: {
  //   position: "absolute",
  //   width: "100%",
  //   bottom: 50,
  // },
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
});

export default DisplayCarpark;
