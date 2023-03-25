import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ carparks, region }) => {
  const filteredCarparks = carparks && carparks.filter(
    (carpark) => carpark.latitude && carpark.longitude
  );

  async function convertLatLong(easting,northing){
    try{
      const response = await axios({
        method: "get",
        url:'https://developers.onemap.sg/commonapi/convert/3414to4326',
        params:{
          'X':easting,
          'Y':northing
        }
      }
      );
      return response;
    } catch(error){
      console.log(error);
    }
  }

  return (
    <MapView style={styles.map} region={region} showsUserLocation={true}>
      {filteredCarparks &&
        filteredCarparks.map((carpark) => {
          <Marker
            key={carpark["_id"]}
            coordinate={{
              latitude: 1.448205177850381,
              longitude: 103.80357168153289
            }}
            title={carpark["car_park_no"]}
            description={`Lots Available: ${carpark["car_park_decks"]}`}
          />
        }
        )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
