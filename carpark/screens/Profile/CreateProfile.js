import { useContext, useEffect, useState } from "react";
import {
  Text,
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../../store/context/user-context";
import { updateAccount } from "../../util/AuthManager";
import PrimaryButton from "../../components/PrimaryButton";
import { StatusBar } from "expo-status-bar";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
let componentWidth = 0;
const width = Dimensions.get("window").width;

function CreateProfile({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filled, setFilled] = useState(false);
  const [image, setImage] = useState("");
  const [cameraPermission, askCameraPermission] = useCameraPermissions();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (fullName !== "" && age !== "" && phoneNumber !== "") {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [fullName, age, phoneNumber]);

  //changing state function
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

  function ageHandler(enteredAge) {
    setAge(enteredAge);
  }

  function phoneNumberHandler(enteredPhoneNumber) {
    setPhoneNumber(enteredPhoneNumber);
  }

  function measureView(event) {
    componentWidth = event.nativeEvent.layout.width;
  }

  //create profile fuction
  async function createProfileAttempt() {
    if (
      parseInt(age) == 0 ||
      parseInt(age) < 0 ||
      parseInt(age) > 99 ||
      isNaN(parseInt(age))
    ) {
      Alert.alert("Invalid Age", "Error: Age should be between 1 to 99", [
        { text: "Okay", style: "destructive" },
      ]);
    } else {
      await updateAccount(authCtx.token, fullName, image);
      authCtx.handleDisplayName(fullName);
      authCtx.handlePhotoURL(image);
      authCtx.setAuth();
    }
    console.log("Profile created");
  }
  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={styles.topContent}>
            <Text
              style={styles.title}
              onLayout={(event) => {
                measureView(event);
              }}
            >
              Create your Profile
            </Text>
          </View>
          <View style={styles.imageButton}>
            {image && image !== "" ? (
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
              placeholder="Display Name here.."
              value={fullName}
              maxLength={15}
            />
            <TextInput
              style={styles.inputText}
              onChangeText={ageHandler}
              placeholder="Enter your age here"
              value={age}
              keyboardType="decimal-pad"
              maxLength={2}
            />
            <TextInput
              style={styles.inputText}
              onChangeText={phoneNumberHandler}
              placeholder="Enter your phone number here"
              value={phoneNumber}
              keyboardType="decimal-pad"
              maxLength={8}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onSuccess={filled}
              onAttempt={createProfileAttempt}
              text="Create Profile"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default CreateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  topContent: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 20,
    alignContent: "center",
  },
  title: {
    marginLeft: (width - componentWidth) / 6,
    marginTop: 40,
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
  },
  imageButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputText: {
    width: "95%",
    backgroundColor: "white",
    borderColor: "#DBE2E7",
    borderWidth: 2,
    color: "grey",
    padding: 15,
    borderRadius: 12,
    fontSize: 13,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {},
});
