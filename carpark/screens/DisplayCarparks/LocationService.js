import { PermissionsAndroid, Platform } from "react-native";

const LocationService = {
  async getCurrentLocation() {
    let coords = null;
    let error = null;

    if (Platform.OS === "android") {
      const checkGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!checkGranted) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This app needs to access your location",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          error = "Location permission not granted";
        }
      }
    }

    if (!error) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        });
        coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(coords);
      } catch (err) {
        error = err.message;
      }
    }

    return { coords, error };
  },
};

export default LocationService;
