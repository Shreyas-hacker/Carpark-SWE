import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DisplayCarpark = () => {
  const [carparks, setCarparks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  async function fetchCarparks(){
    try{
      const response = await axios.get(
        'https://api.data.gov.sg/v1/transport/carpark-availability'
      );
      var carparkData = response.data.items[0].carpark_data
      setCarparks(carparkData);
    } catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchCarparks(),60000);
    return ()=> clearInterval(interval);
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredCarparks = carparks.filter((carpark) =>
    carpark.carpark_number.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((carpark)=> carpark.latitude && carpark.longtitude);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by car park name"
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {filteredCarparks.map((carpark) => (
          <Marker
            key={carpark.carpark_number}
            coordinate={{
              latitude: parseFloat(carpark.latitude),
              longitude: parseFloat(carpark.longitude),
            }}
            title={carpark.carpark_number}
            description={`Lots Available: ${carpark.carpark_info[0].lots_available}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
