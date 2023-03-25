import { Platform } from "react-native";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'

export async function LocationService(){
    const granted = await request(
        Platform.select({
            android: PermissionsAndroid
        })
    )
}