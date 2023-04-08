import { useEffect, useState, createRef, useRef } from "react";
import { StyleSheet,View,ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {convertLatLong} from './SearchCarpark';

function Map({ carparks, region }){
  const [coordinateArray, setCoordinateArray] = useState([]);
  const [isCoordinateArraySet, setIsCoordinateArraySet] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const getCoordinates = async () => {
      const coordinates = await Promise.all(
        carparks.map(async (carpark) => {
          const {x_coord,y_coord} = carpark;
          const {latitude, longitude} = await convertLatLong(x_coord,y_coord);
          return {latitude, longitude};
        })
      );
      setCoordinateArray(coordinates);
      setIsCoordinateArraySet(true);
    }
    getCoordinates();
  },[carparks])

  useEffect(() => {
    if (coordinateArray.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        coordinateArray,
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [coordinateArray]);

  return (
    isCoordinateArraySet ? <MapView provider={MapView.PROVIDER_GOOGLE} style={styles.map} region={region} showsUserLocation={true} ref={mapRef}>
      {carparks &&
        carparks.map((carpark,index) => {
          return (
            <Marker
              key={carpark._id}
              identifier={carpark._id}
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
