import { View, StyleSheet, Text, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { React, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";

const blueColor = "#CBF0FF";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
let componentWidth = 0;

function ReportFault({ navigation,route }) {
  const [FaultTypeOpen, setFaultTypeOpen] = useState(false);
  const [SeverityOpen, setSeverityOpen] = useState(false);

  const [Fault, setFault] = useState([]);
  const [FaultTypes, setFaultType] = useState([
  { label: "Light", value: "1" },
  { label: "Gantry Machine", value: "2" },
  { label: "Barrier", value: "3" },
  { label: "Others", value: "4" },
  ]);

  const [Severity, setSeverity] = useState([]);
  const [SeverityLevel, setSeverityLevel] = useState([
  { label: "High", value: "3" },
  { label: "Medium", value: "2" },
  { label: "Low", value: "1" },
  ]);

  const [filled, setfilled] = useState(false);
  const [carpark, setCarpark] = useState("");

  const [description, setDescription] = useState("");
  const [result,setResult] = useState(null);

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
    if (setFaultTypeOpen !== false && setSeverityOpen !== false && description !== "") {
      setfilled(true);
      if(route.params !== undefined){
        setResult(route.params.result);
      }else{
        setResult(null);
      }
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
            zIndex: 100,
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
            marginTop={10}
            backgroundColor={blueColor}
            justifyContent="center"
            onOpen={() => {setSeverityOpen(false), setFaultTypeOpen(true)}}
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
            onOpen={() => {setSeverityOpen(true), setFaultTypeOpen(false)}}
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

        {result && <Image style={styles.preview} source={{ uri: result }} />}
        <Text style={styles.text}>Description</Text>

        
        <View style={styles.inputContainer}>
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

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: blueColor,
  },
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
    marginHorizontal: (deviceWidth-componentWidth)/9
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
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
  
});

export default ReportFault;


