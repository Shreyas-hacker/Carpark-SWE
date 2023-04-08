import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const CarparkInfoCard = ({ carpark }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{carpark.address}</Text>
      <Text style={styles.subtitle}>
        Free parking time: {carpark.free_parking}
      </Text>
      <Text style={styles.subtitle}>Total Slots:</Text>
      <Text style={styles.subtitle}>Avaliable Slots:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
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
