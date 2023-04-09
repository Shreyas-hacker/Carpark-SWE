import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import useLoadFonts from "../../util/fonts/loadfont";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FontStyle } from "../../util/fonts/fontstyles";
import LoadingScreen from "../../components/LoadingScreen";

const CarparkInfoCard = ({ carpark, carparkLots, loaded }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [arrowDirection, setArrowDirection] = useState("up");

  const toggleCard = () => {
    Animated.timing(slideAnimation, {
      toValue: slideAnimation._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setArrowDirection(arrowDirection === "up" ? "down" : "up");
  };

  useLoadFonts();

  const slidePosition = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height / 5, 0],
  });

  return (
    <>
      <Animated.View
        style={[
          styles.card,
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{ translateY: slidePosition }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.slideBar,
            {
              transform: [
                { rotate: arrowDirection === "up" ? "180deg" : "0deg" },
              ],
            },
          ]}
          onPress={toggleCard}
        >
          <View style={styles.arrow} />
        </TouchableOpacity>
        {!loaded ? (
          <>
            <Text style={[styles.title]}>
              {carpark.address}
            </Text>
            <Text style={[styles.subtitle_lots]}>
              Total Slots: {carparkLots[1]}
            </Text>
            <Text style={[styles.subtitle_lots]}>
              Avaliable Slots: {carparkLots[0]}
            </Text>
            <Text style={[styles.subtitle]}>
              Free Parking Time: {carpark.free_parking}
            </Text>
            <Text style={[styles.subtitle]}>
              Parking Duration: {carpark.short_term_parking}
            </Text>
            <Text style={[styles.subtitle]}>
              Carpark Type: {carpark.car_park_type}
            </Text>
            <Text style={[styles.subtitle]}>
              Gantry Height:{" "}
              {carpark.gantry_height !== "0.00"
                ? carpark.gantry_height + " Metres"
                : "No Limit"}{" "}
            </Text>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("ReportFault")}
            >
              <MaterialIcons name="report-problem" color="red" size={24} />
              <Text style={[styles.buttonText]}>Report</Text>
            </TouchableOpacity>
          </>
        ) : (
          <LoadingScreen />
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingTop: 16,
    paddingBottom: Dimensions.get("window").height / 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  slideBar: {
    height: 30,
    width: 80,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  arrow: {
    marginBottom: 5,
    height: 15,
    width: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#717171",
    borderRightWidth: 3,
    borderRightColor: "#717171",
    transform: [{ rotate: "45deg" }],
  },
  title: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
    color: "#484848",
  },
  subtitle_lots: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 4,
    color: "#484848",
  },
  subtitle: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 4,
    color: "#7c7c7c",
  },
  button2: {
    backgroundColor: "gold",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CarparkInfoCard;
