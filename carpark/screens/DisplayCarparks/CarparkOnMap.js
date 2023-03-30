import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const CarparkMap = ({ carparks, region }) => {
  const filteredCarparks =
    carparks &&
    carparks.filter((carpark) => carpark.latitude && carpark.longitude);

  return (
    <MapView style={styles.map} region={region} showsUserLocation={true}>
      {filteredCarparks &&
        filteredCarparks.map((carpark) => {
          return (
            <Marker
              key={carpark["_id"]}
              coordinate={{
                latitude: carpark.latitude,
                longitude: carpark.longitude,
              }}
              title={carpark["car_park_no"]}
              description={`Lots Available: ${carpark["car_park_decks"]}`}
            />
          );
        })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default CarparkMap;
