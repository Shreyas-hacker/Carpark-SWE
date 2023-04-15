import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function App({ navigation,route }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: true,
      flashMode: Camera.Constants.FlashMode.auto,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  let retakePicture = async () => {
    setPhoto(undefined);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        navigation.navigate("ReportFault", { photoPreview: photo, carpark: route.params.carpark,address: route.params.address });
      });
    };

    return (
      <>
      <StatusBar style="light"/>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />

        {hasMediaLibraryPermission ? (
          <Button title="Retake Photo" onPress={retakePicture} />
        ) : undefined}
        {hasMediaLibraryPermission ? (
          <Button title="Submit Photo" onPress={savePhoto} />
        ) : undefined}
      </SafeAreaView>
      </>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.bottomBar}>
        <View
          style={{
            alignSelf: "center",
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={takePic}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              paddingHorizontal: 10,
              marginLeft: deviceWidth / 5,
              marginBottom: 10,
              backgroundColor: "#ffffff",
            }}
          />
        </View>

        <Button
          title="Cancel"
          style={styles.backButton}
          color={"#fff"}
          onPress={() => {
            navigation.navigate("ReportFault",{carpark: route.params.carpark});
          }}
        ></Button>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#052736",
    fontFamily: "OpenSans_400Regular",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "black",
    opacity: 0.8,
  },
});
