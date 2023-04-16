import { useContext, useEffect, useState } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../../store/context/user-context";
import { updateAccount } from "../../util/AuthManager";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

let componentWidth = 0;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function EditProfile({ navigation, route }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filled, setFilled] = useState(false);
  const [cameraPermission, askCameraPermission] = useCameraPermissions();
  const [image, setImage] = useState(route.params.image);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (fullName !== "" && phoneNumber !== "") {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [fullName, phoneNumber]);

  //changing state function
  async function verifyPermissions() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await askCameraPermission();
      return permissionResponse.granted;
    }
    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay", style: "destructive" }]
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const imageTaken = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(imageTaken.assets[0].uri);
  }
  function fullNameHandler(enteredName) {
    setFullName(enteredName);
  }

  function phoneNumberHandler(enteredPhoneNumber) {
    setPhoneNumber(enteredPhoneNumber);
  }

  function measureView(event) {
    componentWidth = event.nativeEvent.layout.width;
  }

  function goBack() {
    navigation.navigate("Tab");
  }

  //create profile fuction
  async function updateProfileAttempt() {
    if (fullName === authCtx.display_name) {
      setFullName("");
      Alert.alert(
        "Same Display name",
        "Please enter a new display name that is different from your current display name",
        [{ text: "OK", style: "destructive" }]
      );
    } else if (fullName !== "" && phoneNumber !== "") {
      const token = await updateAccount(authCtx.token, fullName, image);
      authCtx.handleDisplayName(fullName);
      authCtx.handlePhotoURL(image);
      Alert.alert("Successful", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Profile");
          },
        },
      ]);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <View style={styles.topContent}>
          <IconButton
            onPress={goBack}
            icon="arrow-back"
            size={28}
            color="black"
          />
          <Text
            style={styles.title}
            onLayout={(event) => {
              measureView(event);
            }}
          >
            Edit Profile
          </Text>
        </View>
        <View style={styles.imageButton}>
        {image && image !== "" ? (
          <>
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: "contain",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <TouchableOpacity style={{
            width: 150,
            height: 50
          }} onPress={takeImageHandler}>
            <Text style={{marginTop: 10,textAlign:'center',borderColor: 'black',borderWidth: 3,fontSize: 18,borderRadius: 16}}>Change photo</Text>
          </TouchableOpacity>
          </>
        ) : (
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
              onPress={takeImageHandler}
            >
              <Icon name="camera" size={40} color="#000" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={fullNameHandler}
            placeholder="New Display Name here.."
            value={fullName}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={phoneNumberHandler}
            placeholder="New Phone Number here.."
            value={phoneNumber}
            keyboardType="decimal-pad"
            maxLength={8}
          />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onSuccess={filled}
            onAttempt={updateProfileAttempt}
            text="Update Profile"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  topContent: {
    flexDirection: "row",
    marginTop: 45,
    alignContent: "center",
    width: "100%",
    flexDirection: "row",
    top: height / 50,
    marginRight: width / 3.1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    marginBottom: 50,
  },
  title: {
    marginLeft: (width - componentWidth) / 5,
    marginTop: 10,
    fontSize: 22,
    fontFamily: "OpenSans_700Bold",
  },
  imageButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 60,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputText: {
    width: "95%",
    backgroundColor: "white",
    borderColor: "#A7B2BA",
    borderWidth: 2,
    color: "grey",
    padding: 15,
    borderRadius: 12,
    fontSize: 13,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  buttonContainer: {},
});
