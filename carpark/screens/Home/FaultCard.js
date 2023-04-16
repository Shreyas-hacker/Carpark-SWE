import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Icon, Overlay } from "react-native-elements";

function FaultCard({ fault }) {
  const [visible, setVisible] = useState(false);

  function toggleOverlay() {
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>{fault.carpark}</Text>
          <Text style={styles.text}>{fault.date}</Text>
        </View>
        <Text style={styles.text}>Address: {fault.address}</Text>
        <Text style={styles.text}>
          Description:{" "}
          <Text style={styles.boldText} numberOfLines={2}>
            {fault.description}
          </Text>
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Icon name="image" type="font-awesome" onPress={toggleOverlay} />
        </TouchableOpacity>
        {/* <Text style={styles.text}>
          Report Count:{" "}
          <Text style={styles.boldText} numberOfLines={2}>
            {}
          </Text>
        </Text> */}

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          {fault.photo !== "" ? (
            <Image style={styles.preview} source={{ uri: fault.photo }}></Image>
          ) : (
            <Text>No image taken</Text>
          )}
        </Overlay>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 0.2,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: 400,
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 5,
    textAlign: "left",
    color: "#444444",
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#444444",
    fontFamily: "OpenSans_700Bold",
  },
  preview: {
    width: 300,
    height: 300,
  },
});

export default FaultCard;
