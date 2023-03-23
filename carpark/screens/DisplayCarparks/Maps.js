import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ carparks, region }) => {
  const filteredCarparks = carparks.filter(
    (carpark) => carpark.latitude && carpark.longitude
  );

  return (
    <MapView style={styles.map} region={region} showsUserLocation={true}>
      {filteredCarparks.length === 0 &&
        filteredCarparks.map((carpark) => (
          <Marker
            key={carpark["_id"]}
            coordinate={{
              latitude: parseFloat(carpark["x_coord"]),
              longitude: parseFloat(carpark["y_coord"]),
            }}
            title={carpark["car_park_no"]}
            description={`Lots Available: ${carpark["car_park_decks"]}`}
          />
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
