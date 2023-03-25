import React, { useState, useEffect} from "react";
import axios from "axios";
import { View, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import SearchBar from "./SearchBar";
import PrimaryButton from "../../components/PrimaryButton";
import Map from "./Maps";
import * as Location from 'expo-location';

const DisplayCarpark = () => {
  const [filteredCarparks, setFilteredCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async() =>{
    if (Platform.OS==='android'){
        const checkGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (!checkGranted) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Access Required",
                    message: "This app needs to access your location",
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                error = "Location permission not granted";
            }
        }
    }else{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            console.log('Permission to access was denied');
            return false;
        }
    }
    const isAndroid = Platform.OS ==='android';
    let location = await Location.getCurrentPositionAsync({ accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest, enableHighAccuracy: true});
    setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
  }

  useEffect(()=>{
    userLocation();
  })

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
      {mapRegion && <Map region={mapRegion} />}
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
