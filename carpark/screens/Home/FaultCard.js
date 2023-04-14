import { View, Text, StyleSheet, Button,Image } from "react-native";
import { useState } from "react";
import { Overlay } from 'react-native-elements';

function FaultCard({ fault }) {
  const [visible,setVisible] = useState(false);

  function toggleOverlay(){
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{fault.carpark}</Text>
        <Text style={styles.text}>
          Description:{" "}
          <Text style={styles.boldText} numberOfLines={2}>
            {fault.description}
          </Text>
        </Text>
        <Button title="View" onPress={toggleOverlay}/>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Image style={styles.preview} source={{ uri: fault.photo}}></Image>
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
    maxWidth: 400,
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#444444",
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#444444",
    fontFamily: "OpenSans_400Regular",
  },
  preview:{
    width: 300,
    height: 300,
  }
});

export default FaultCard;
