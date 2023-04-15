import { TouchableOpacity, Alert } from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCameraAsync, useCameraPermissions,PermissionStatus } from 'expo-image-picker';
import {AuthContext} from '../store/context/user-context';

function AddPhoto({navigation}){
    const [cameraPermission, askCameraPermission] = useCameraPermissions();
    const [image, setImage] = useState("");

    async function verifyPermissions(){
        if(cameraPermission.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await askCameraPermission();
            return permissionResponse.granted;
        }
        if(cameraPermission.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay', style: 'destructive' }]
            );
            return false;
        }
        return true;
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }
        const imageTaken = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setImage(imageTaken.uri);
    }

    if(image){
        navigation.navigate('EditProfile', {image: image})
    }

    return (
        <>
        {image && image !== "" ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /> :
            <TouchableOpacity
            style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
            }}
            onPress={takeImageHandler}
        >
            <Icon name="camera" size={40} color="#000" />
            </TouchableOpacity>
        }
        </>
    )
}

export default AddPhoto;