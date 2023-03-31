import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { React, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";

const width = Dimensions.get("window").width;
let componentWidth = 0;
const blueColor = "#CBF0FF";

function ReportFault({ navigation }) {
    const [filled, setfilled] = useState(false);
    const [carpark, setCarpark] = useState("");
    const [description, setDescription] = useState("");
    const [Fault, setFault] = useState([]);
    const [FaultTypes, setFaultType] = useState([
    { label: "Light", value: "1" },
    { label: "Gantry Machine", value: "2" },
    { label: "Barrier", value: "3" },
    { label: "Others", value: "4" },
    ]);
    const [FaultTypeOpen, setFaultTypeOpen] = useState(false);
    const [Severity, setSeverity] = useState([]);
    const [SeverityLevel, setSeverityLevel] = useState([
    { label: "High", value: "3" },
    { label: "Medium", value: "2" },
    { label: "Low", value: "1" },
    ]);
    const [SeverityOpen, setSeverityOpen] = useState(false);

    //states
    function descriptionHandler(enteredDescription) {
      setDescription(enteredDescription);
    }
    function measureView(event) {
      componentWidth = event.nativeEvent.layout.width;
    }
    function goBack() {
      navigation.navigate("Tab");
    }

    function submit() {
      navigation.navigate("Tab");
    }

    useEffect(() => {
      if (Fault !== "" && Severity !== "") {
        setfilled(true);
      }
    }, [carpark, description]);

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          <View style={styles.topContent}>
            <IconButton
              onPress={goBack}
              icon="arrow-back"
              size={28}
              color="black"
            />
            <Text
              style={styles.reportTitle}
              onLayout={(event) => {
                measureView(event);
              }}
            >
              Report Fault!
            </Text>
          </View>

          <View style={styles.carparkTitle}>
            <Text style={styles.carparkTitle}>Carpark BG03</Text>
          </View>

          <View
            style={{
              marginTop: 10,
              backgroundColor: blueColor,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 15,
              zIndex: FaultTypeOpen ? 1 : 0,
            }}
          >
            <DropDownPicker
              open={FaultTypeOpen}
              value={Fault}
              items={FaultTypes}
              setOpen={setFaultTypeOpen}
              setValue={setFault}
              setItems={setFaultType}
              dropDownDirection="BOTTOM"
              placeholder="Select Fault Types"
              theme="DARK"
              multiple={false}
              mode="BADGE"
            />
          </View>

          <View
            style={{
              marginTop: 10,
              backgroundColor: blueColor,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 15,
              zIndex: SeverityOpen ? 1 : 0,
            }}
          >
            <DropDownPicker
              open={SeverityOpen}
              value={Severity}
              items={SeverityLevel}
              setOpen={setSeverityOpen}
              setValue={setSeverity}
              setItems={setSeverityLevel}
              dropDownDirection="BOTTOM"
              placeholder="Select Fault Severity"
              theme="DARK"
              multiple={false}
              mode="BADGE"
            />
          </View>

          <View style={styles.buttonContainer}>
              <IconButton 
                onPress={()=>{navigation.navigate("Camera")}} 
                icon="camera" 
                size={28} 
                color="black"
            />
          </View>

          <View style={styles.inputContainer}>
            {/* This is the input component, wasnt working as a component so i broke it down further in thi file */}
            <TextInput
              style={styles.inputText}
              onChangeText={descriptionHandler}
              placeholder="Enter description here..."
              value={description}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              text="Submit"
              onSuccess={filled}
              onAttempt={submit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
          );
        }
    


const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  form: {
    backgroundColor: blueColor,
    flex:1
  },
  topContent: {
    flexDirection: "row",
    marginVertical: 40,
    marginHorizontal: 23,
  },
  reportTitle: {
    fontSize: 20,
    marginHorizontal: (width-componentWidth)/9
  },
  carparkTitle: {
    fontSize: 30,
    fontWeight: "regular",
    color: "black",
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  inputText: {
    backgroundColor: "white",
    color: "black",
    textAlignVertical: "top",
    textAlign: "left",
    paddingTop: 5,
    padding: 10,
    paddingBottom: 5,
    borderRadius: 12,
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    lineHeight: 25,
    minHeight: 100,
  },
  text: {
    color: "white",
  },
  description: {
    color: "white",
    marginTop: 10,
    paddingTop: 15,
    padding: 20,
    fontSize: 15,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 15,
    alignSelf: "center",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
    },

  fixedRatio:{
    flex: 1,
    aspectRatio: 1
    }
});

export default ReportFault;

