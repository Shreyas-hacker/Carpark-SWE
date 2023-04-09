import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const RecentlyViewed = ({ navigation, data }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Recently viewed/favorited carparks:
      </Text>
      {data.slice(0, 3).map((carpark) => (
        <TouchableOpacity
          key={carpark.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() =>
            navigation.navigate("CarparkDetails", { id: carpark.id })
          }
        >
          <MaterialIcons name="history" size={20} color="#777" />
          <Text style={{ marginLeft: 10 }}>{carpark.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RecentlyViewed;
