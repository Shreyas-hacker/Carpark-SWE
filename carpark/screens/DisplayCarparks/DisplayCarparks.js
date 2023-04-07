import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
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
      <SearchBar onSearchTermChange={handleSearch} searchTerm={searchTerm} />
      <PrimaryButton onSuccess={true} text="Search" onAttempt={handleSearch} />
      {mapRegion && <Map region={mapRegion} carparks={filteredCarparks} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default DisplayCarpark;
