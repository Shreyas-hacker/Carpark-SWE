import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import useLoadFonts from '../../util/loadfont';
import { FontStyle } from "../../util/fontstyles";

const CarparkInfoCard = ({ carpark,carparkLots }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const toggleCard = () => {
    Animated.timing(slideAnimation, {
      toValue: slideAnimation._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
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
        <View style={styles.slideBar} onTouchEnd={toggleCard} />
        <Text style={[styles.title, FontStyle.bold]}>{carpark.address}</Text>
        <Text style={[styles.subtitle_lots, FontStyle.regular]}>Total Slots: {carparkLots[1]}</Text>
        <Text style={[styles.subtitle_lots, FontStyle.regular]}>Avaliable Slots: {carparkLots[0]}</Text>
        <Text style={[styles.subtitle, FontStyle.italic]}>
          Free Parking Time: {carpark.free_parking}
        </Text>
        <Text style={[styles.subtitle, FontStyle.regular]}>
          Parking Duration: {carpark.short_term_parking}
        </Text>
        <Text style={[styles.subtitle, FontStyle.regular]}>
          Carpark Type: {carpark.car_park_type}
        </Text>
        <Text style={[styles.subtitle, FontStyle.italic]}>
          Gantry Height:{" "}
          {carpark.gantry_height !== "0.00"
            ? carpark.gantry_height + " Metres"
            : "No Limit"}{" "}
        </Text>
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
    height: 10,
    width: "30%",
    backgroundColor: "gray",
    marginBottom: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
    marginLeft: 20,
  },
  subtitle_lots: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 20,
    marginLeft: 20,
  },
});

export default CarparkInfoCard;
