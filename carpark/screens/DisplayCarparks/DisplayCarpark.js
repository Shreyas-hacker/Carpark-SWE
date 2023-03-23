import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from './SearchBar';
import PrimaryButton from '../../components/PrimaryButton';

const DisplayCarpark = () => {
  const [carparks, setCarparks] = useState([]);
  const [filteredCarparks, setFilteredCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  async function searchCarpark(){
    try{
      const response = await axios({
        method: "get",
        url:'https://data.gov.sg/api/action/datastore_search',
        params:{
          'resource_id': '139a3035-e624-4f56-b63f-89ae28d4ae4c',
          'q': searchTerm
        }
      }
      );

      setFilteredCarparks(response["data"]["result"]["records"])
    } catch(error){
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearchTermChange={handleSearch} searchTerm={searchTerm}/>
      <PrimaryButton onSuccess={true} text="Search" onAttempt={searchCarpark}/>
      <MapView style={styles.map} region={region} onRegionChange={()=>setRegion(region)} showsUserLocation={true}>
        {filteredCarparks.length === 0 &&  filteredCarparks.map((carpark) => (
          <Marker
            key={carpark['_id']}
            coordinate={{
              latitude: parseFloat(carpark['x_coord']),
              longitude: parseFloat(carpark['y_coord']),
            }}
            title={carpark['car_park_no']}
            description={`Lots Available: ${carpark['car_park_decks']}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 10,
    marginTop: 30,
    marginHorizontal: 10,
  },
  map: {
    flex: 1,
  },
});

export default DisplayCarpark;
