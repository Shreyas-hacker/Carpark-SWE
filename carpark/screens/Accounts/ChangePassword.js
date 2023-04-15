import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, TextInput, StyleSheet, Text, View, Alert, Keyboard, TouchableWithoutFeedback,} from "react-native";
import IconButton from "../../components/IconButton";
import PrimaryButton from "../../components/PrimaryButton";
import { resetPassword } from "../../util/AuthManager";
import { emailChecker } from "../../util/helper";

let componentWidth = 0;
const width = Dimensions.get("window").width;

function ChangePassword({ navigation }) {
  const [filled, setFilled] = useState(false);
  const [email, setEmail] = useState("");
  let changed = true;

  function measureView(event) {
    componentWidth = event.nativeEvent.layout.width;
  }
  function goBack() {
    navigation.goBack();
  }
  function emailHandler(enteredEmail) {
    setEmail(enteredEmail);
  }
  async function sendEmail() {
    if (!emailChecker(email)) {
      Alert.alert(
        "Unsuccessful",
        "Error: Email Address entered does not follow the valid format",
        [{ text: "Okay", style: "destructive" }]
      );
    } else {
      try {
        await resetPassword(email);
      } catch (error) {
        changed = false;
        Alert.alert(
          "Unsuccessful",
          "Error: There is no user record corresponding to this identifier. The user may have been deleted OR password is invalid",
          [{ text: "Okay", style: "destructive" }]
        );
      }
      if (changed === true) {
        Alert.alert(
          "Email sent",
          "Email has been sent to your email address, please check your spam box to see if it is there.",
          [{ text: "Okay", style: "destructive" }]
        );
        navigation.navigate("Profile");
      }
    }
  }
  useEffect(() => {
    if (email !== "") {
      setFilled(true);
    }
  }, [email]);

  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.page}>
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
              Change Password
            </Text>
          </View>
          <View style={styles.inputConfig}>
            <TextInput
              style={styles.inputStyles}
              value={email}
              onChangeText={emailHandler}
              placeholder="Enter your email address"
            />
            <Text
              style={{
                color: "#57636C",
                fontFamily: "OpenSans_600SemiBold",
                color: "#0D668D",
              }}
            >
              We will send you an email with our database to reset your
              password, please enter the email associated with your account
              above.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              text="Update Password"
              onSuccess={filled}
              onAttempt={sendEmail}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Add paddingBottom to prevent content from being hidden by the keyboard
  },
  topContent: {
    flexDirection: "row",
    marginVertical: 20, // Decrease marginVertical to fit better on smaller screens
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    flex: 1, // Add flex: 1 to make sure title takes up remaining space
    marginLeft: 10, // Decrease marginLeft to fit better on smaller screens
    fontFamily: "OpenSans_700Bold",
    fontSize: 22,
  },
  inputConfig: {
    marginVertical: 20, // Decrease marginVertical to fit better on smaller screens
  },
  inputStyles: {
    borderRadius: 6,
    fontSize: 16, // Increase fontSize to improve legibility
    padding: 12,
    borderColor: "#DBE2E7",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    marginBottom: 20,
    fontFamily: "OpenSans_400Regular",
  },
  buttonContainer: {
    marginBottom: 20, // Add marginBottom to prevent button from being hidden by the keyboard
  },
  infoText: {
    marginTop: 10, // Add marginTop to separate from input field
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16, // Increase fontSize to improve legibility
    color: "#0D668D",
  },
});