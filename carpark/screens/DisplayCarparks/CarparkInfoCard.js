import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CarparkInfoCard = ({ carpark }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{carpark.address}</Text>
      <Text style={styles.subtitle}>
        Lots available: {carpark.free_parking}
      </Text>
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
    padding: 16,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
});

export default CarparkInfoCard;
