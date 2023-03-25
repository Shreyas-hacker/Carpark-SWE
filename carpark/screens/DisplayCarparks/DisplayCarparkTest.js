import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, StyleSheet } from "react-native";
import Map from "./Maps";
import SearchBar from "./SearchBar";
import LocationService from "./LocationService";
import PrimaryButton from "../../components/PrimaryButton";

const DisplayCarpark = () => {
  const [filteredCarparks, setFilteredCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState(null);

  useEffect(() => {
    LocationService.getCurrentLocation().then((result) => {
      if (result.coords) {
        setRegion({
          latitude: result.coords.latitude, 
          longitude: result.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    });
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  async function searchCarpark() {
    try {
      const response = await axios({
        method: "get",
        url: "https://data.gov.sg/api/action/datastore_search",
        params: {
          resource_id: "139a3035-e624-4f56-b63f-89ae28d4ae4c",
          q: searchTerm,
        },
      });

      setFilteredCarparks(response["data"]["result"]["records"]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearchTermChange={handleSearch} searchTerm={searchTerm} />
      <PrimaryButton onSuccess={true} text="Search" onAttempt={searchCarpark} />
      {region && <Map carparks={filteredCarparks} region={region} />}
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
