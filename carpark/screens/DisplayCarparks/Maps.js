import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ carparks, region }) => {
  const filteredCarparks = carparks
    .filter((carpark) => carpark.latitude && carpark.longitude);

  return (
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
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
