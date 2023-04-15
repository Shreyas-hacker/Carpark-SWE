import * as Location from "expo-location";
import { Platform, PermissionsAndroid } from "react-native";

export async function getCurrentLocation() {
  try {
    let granted = true;
    if (Platform.OS === "android") {
      const checkGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!checkGranted) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This app needs to access your location",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error("Location permission not granted");
        }
      }
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access was denied");
        return false;
      }
    }
    const isAndroid = Platform.OS === "android";
    let location = await Location.getCurrentPositionAsync({
      accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest,
      enableHighAccuracy: true,
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.006866,
      longitudeDelta: 0.004757,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getPostalAddress(location){
  try{
    let address = await Location.reverseGeocodeAsync(location);
    return address;
  }catch(error){
    console.log(error);
    return false;
  }
}
