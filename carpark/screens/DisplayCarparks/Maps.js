import { useEffect, useState, createRef, useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { convertLatLong, searchCarparkLots } from "./SearchCarpark";
import CarparkInfoCard from "./CarparkInfoCard";

function Map({ carparks, region }) {
  const [coordinateArray, setCoordinateArray] = useState([]);
  const [isCoordinateArraySet, setIsCoordinateArraySet] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [carparkLots, setCarparkLots] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    const getCoordinates = async () => {
      const coordinates = await Promise.all(
        carparks.map(async (carpark) => {
          const { x_coord, y_coord } = carpark;
          const { latitude, longitude } = await convertLatLong(
            x_coord,
            y_coord
          );
          return { latitude, longitude };
        })
      );
      setCoordinateArray(coordinates);
      setIsCoordinateArraySet(true);
    };
    getCoordinates();
  }, [carparks]);

  const handleMarkerPress = (carpark) => {
    setSelectedCarpark(carpark._id);
    if (selectedCarpark) {
      const fetchCarparkLots = async () => {
        const { carpark_data } = await searchCarparkLots(selectedCarpark);
        const availableLots =
          carpark_data[0]?.carpark_info[0]?.lots_available ?? "N/A";
        setCarparkLots({ [selectedCarpark]: availableLots });
      };
      fetchCarparkLots();
    }
  };

  useEffect(() => {
    if (coordinateArray.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(coordinateArray, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [coordinateArray]);

  return (
    <>
      {isCoordinateArraySet && (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation={true}
          ref={mapRef}
        >
          {carparks &&
            carparks.map((carpark, index) => {
              return (
                <Marker
                  key={carpark._id}
                  identifier={carpark._id}
                  coordinate={coordinateArray[index]}
                  title={carpark.address}
                  description={`Free parking time: ${carpark.free_parking}`}
                  onPress={() => handleMarkerPress(carpark)}
                />
              );
            })}
        </MapView>
      )}
      {selectedCarpark && (
        <View style={styles.cardContainer}>
          <CarparkInfoCard
            carpark={{
              ...carparks.find((carpark) => carpark._id === selectedCarpark),
              ...carparkLots[selectedCarpark],
            }}
          />
        </View>
      )}
      {!isCoordinateArraySet && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    cardContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 10,
      backgroundColor: "#fff",
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export default Map;
