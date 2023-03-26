import * as Location from 'expo-location';
import { Platform, PermissionsAndroid } from "react-native";

export async function userLocation(){
    if (Platform.OS==='android'){
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
    }else{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            console.log('Permission to access was denied');
            return false;
        }
    }
    const isAndroid = Platform.OS ==='android';
    let location = await Location.getCurrentPositionAsync({ accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest, enableHighAccuracy: true});
    setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
}