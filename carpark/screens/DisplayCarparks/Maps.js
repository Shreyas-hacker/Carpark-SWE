import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {convertLatLong} from './SearchCarpark';

function Map({ carparks, region }){

  async function getCoordinates(carpark){
    let coordinates = await convertLatLong(parseFloat(carpark.x_coord),parseFloat(carpark.y_coord));
    coordinates.then((coordinate)=>{
      return coordinate.json();
    })
  }

  return (
    <MapView style={styles.map} region={region} showsUserLocation={true}>
      {carparks &&
        carparks.map((carpark) => (
          <Marker key={carpark._id} coordinate={console.log(getCoordinates(carpark))} title={carpark.address}/>
        ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
