import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar";
import PrimaryButton from "../../components/PrimaryButton";
import Map from "./Maps";
import { getCurrentLocation } from "./LocationService";
import { searchCarpark } from "./SearchCarpark";

const DisplayCarpark = () => {
  const [filteredCarparks, setFilteredCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    async function getLocation() {
      const location = await getCurrentLocation();
      setMapRegion(location);
    }
    getLocation();
  }, []);

  const handleSearch = async (text) => {
    setSearchTerm(text);
    const carparkRecords = await searchCarpark(text);
    setFilteredCarparks(carparkRecords);
  };

  return (
    <View style={styles.container}>
      {mapRegion && <Map region={mapRegion} carparks={filteredCarparks} />}
      <View style={styles.searchBar}>
        <SearchBar onSearchTermChange={handleSearch} searchTerm={searchTerm} />
      </View>
      <View style={styles.button}>
        <PrimaryButton onSuccess={true} text="Search" onAttempt={searchCarpark} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    position: 'absolute',
    width: '100%',
    bottom: 50,
  },
  searchBar:{
    position: 'absolute',
    width: '100%',
    top: 10,
  }
});

export default DisplayCarpark;
