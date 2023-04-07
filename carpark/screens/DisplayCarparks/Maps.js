import { useEffect, useState } from "react";
import { StyleSheet,View,ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {convertLatLong} from './SearchCarpark';

function Map({ carparks, region }){
  const [coordinateArray, setCoordinateArray] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    const getCoordinates = async () => {
      setIsLoading(true);
      const coordinates = await Promise.all(
        carparks.map(async (carpark) => {
          const {latitude, longitude} = await convertLatLong(carpark.x_coord, carpark.y_coord);
          return {latitude, longitude};
        })
      );
      setCoordinateArray(coordinates);
      setIsLoading(false);
    }
    getCoordinates();
  },[carparks])

  return (
    !isLoading ? <MapView style={styles.map} region={region} showsUserLocation={true}>
      {carparks &&
        carparks.map((carpark,index) => {
          return (
            <Marker
              key={index}
              coordinate={coordinateArray[index]}
              title={carpark.address}
              description={carpark.free_parking}
            />
          );
        }
        )}
    </MapView> : (<View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>)
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
