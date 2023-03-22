import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

function Maps() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}/>
    </View>
  );
}

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
