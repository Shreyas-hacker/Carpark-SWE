import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import IconButton from "../../components/IconButton";
import { uploadImage } from "../../util/realtime/storeImage";
import { storeReport } from "../../util/realtime/realTimeStorage";
import { AuthContext } from "../../store/context/user-context";
import { useContext } from "react";

function ConfirmationPage({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;

  const fault_dict = {
    1: "Light",
    2: "Gantry Machine",
    3: "Barrier",
    4: "Others",
  };

  const severity_dict = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  function goBack() {
    navigation.navigate("ReportFault", {
      carpark: route.params.carpark,
      address: route.params.address,
    });
  }

  async function submit() {
    print(route.params.photoPreview);
    var photoURL = "";
    if (route.params.photoPreview) {
      photoURL = await uploadImage(
        route.params.photoPreview.uri,
        route.params.carpark
      );
    }
    const data = {
      user_id: email,
      carpark_no: route.params.carpark,
      address: route.params.address,
      fault_type: route.params.fault,
      severity: route.params.severity,
      description: route.params.description,
      photo: photoURL,
      dateOfCreation: new Date().toISOString().slice(0, 10),
    };
    storeReport(data);

    Alert.alert("Fault Reported", "Thank you for your feedback!", [
      { text: "OK", onPress: () => navigation.navigate("Tab") },
    ]);
  }

  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: width/6, marginBottom: height/50 }}>
        <IconButton
          onPress={goBack}
          icon="arrow-back"
          size={26}
          color={"white"}
        />
        <Text style={styles.title}>Confirmation Page</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.reportDone}>
        <Text style={styles.reportTitle}>
          Report for Carpark {route.params.carpark}
        </Text>
        <Text style={styles.reportTitle}>Address:</Text>
        <Text style={styles.reportText}>{route.params.address}</Text>
        <Text style={styles.reportTitle}>Fault:</Text>
        <Text style={styles.reportText}>{fault_dict[route.params.fault]}</Text>
        <Text style={styles.reportTitle}>Severity:</Text>
        <Text style={styles.reportText}>
          {severity_dict[route.params.severity]}
        </Text>
        <Text style={styles.reportTitle}>Description:</Text>
        <Text style={[styles.reportText]}>{route.params.description}</Text>
        <Text style={styles.reportTitle}>Image taken:</Text>
        {route.params.photoPreview ? (
          <Image style={styles.preview} source={route.params.photoPreview} />
        ) : (
          <Text style={styles.reportText}>No image taken</Text>
        )}
      </View>
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity style={styles.confirmationButton} onPress={submit}>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              color: "white",
              fontSize: 18,
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#052736",
  },
  title: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    color: "#fff",
  },
  line: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    marginTop: 20,
    marginHorizontal: 20,
  },
  reportDone: {
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  reportTitle: {
    fontSize: 19,
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#85FBFF",
  },
  reportText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
    color: "#fff",
  },
  confirmationButton: {
    backgroundColor: "#2295C2",
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 15,
  },
  preview: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
  },
});

export default ConfirmationPage;
