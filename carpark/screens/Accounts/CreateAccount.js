import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import { emailChecker, passwordCheck } from "../../util/helper";
import { createUser } from "../../util/AuthManager";
import { AuthContext } from "../../store/context/user-context";

function CreateAccount({ navigation }) {
  const [filled, setfilled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [show, setShow] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (username !== "" && password !== "" && confirmPassword !== "") {
      setfilled(true);
    } else {
      setfilled(false);
    }
  }, [username, password, confirmPassword]);

  function passwordHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  function usernameHandler(enteredUsername) {
    setUsername(enteredUsername);
  }

  function confirmPasswordHandler(enteredRetype) {
    setConfirmPasword(enteredRetype);
  }

  function changeIcon() {
    setShow(!show);
  }
  async function createAttempt() {
    if (!emailChecker(username)) {
      Alert.alert(
        "Unsuccessful",
        "Error: The email address is badly formatted",
        [{ text: "Okay", style: "destructive" }]
      );
    } else if (password !== confirmPassword) {
      Alert.alert(
        "Unsuccessful",
        "Error: the password does not match the confirmed password",
        [{ text: "Okay", style: "destructive" }]
      );
    } else if (password.length < 8) {
      Alert.alert(
        "Unsuccessful",
        "Password should be a minimum of 8 characters",
        [{ text: "Okay", style: "destructive" }]
      );
    } else if (!passwordCheck(password)) {
      Alert.alert(
        "Retype password",
        "Password should be a minimum of 8 characters and has to contain upper and lower letters, numbers & symbols.",
        [{ text: "Okay", style: "destructive" }]
      );
    } else {
      try {
        const token = await createUser(username, password);
        authCtx.authenticate(token);
        authCtx.handleEmail(username);
        navigation.navigate("CreateProfile");
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Unsuccessful",
          "Email is already in use by another account",
          [{ text: "Okay", style: "destructive" }]
        );
      }
    }
  }

  return (
    <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
      <View>
        <View style={styles.bigdescription}>
          <Text style={styles.title}>Get Started</Text>
          <Text style={styles.description}>
            Love your carpark to be in tip top condition? No better time to sign
            up than now!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={usernameHandler}
            placeholder="Email"
            value={username}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.inputText}
              onChangeText={passwordHandler}
              placeholder="Password"
              value={password}
              secureTextEntry={show}
            />
            <TouchableOpacity>
              <IconButton
                icon={show ? "eye-off" : "eye"}
                color={"grey"}
                size={20}
                onPress={changeIcon}
                extrastyle={styles.iconButton}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.inputText}
              onChangeText={confirmPasswordHandler}
              placeholder="Confirm Password"
              value={confirmPassword}
              secureTextEntry={show}
            />
            <TouchableOpacity>
              <IconButton
                icon={show ? "eye-off" : "eye"}
                color={"grey"}
                size={20}
                onPress={changeIcon}
                extrastyle={styles.iconButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onSuccess={filled}
              onAttempt={createAttempt}
              text="Create"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default CreateAccount;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#052736",
    flex: 1,
    paddingHorizontal: 20, // Add paddingHorizontal to ensure content fits on smaller screens
  },
  bigdescription: {
    marginTop: deviceHeight < 380 ? 60 : deviceHeight * 0.25, // Use deviceHeight to dynamically adjust marginTop for smaller screens
    marginLeft: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3FE0D2",
    fontFamily: "OpenSans_700Bold",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputText: {
    width: "100%", // Change width to take up full width of parent container
    backgroundColor: "white",
    color: "grey",
    padding: 15,
    borderRadius: 12,
    fontSize: 15,
    marginVertical: 8, // Remove marginHorizontal to ensure input fields are centered
  },
  iconButton: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    marginTop: 23,
  },
  text: {
    color: "white",
    fontSize: 13,
    fontFamily: "OpenSans_300Light",
  },
  loginText: {
    color: "white",
    fontFamily: "OpenSans_700Bold",
    color: "#3FE0D2",
  },
  description: {
    color: "white",
    fontFamily: "OpenSans_300Light",
    marginTop: 10,
    fontSize: 15,
    padding: 4,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 20, // Add marginVertical to ensure button is not hidden by keyboard
  },
});
