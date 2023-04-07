import { View, StyleSheet, Text, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from "react-native";
import { React, useEffect, useState, useRef } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";

const bgcolor = "#B0E9FF";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
let componentWidth = 0;

function ReportFault({ navigation,route }) {
  const [FaultTypeOpen, setFaultTypeOpen] = useState(false);
  const [SeverityOpen, setSeverityOpen] = useState(false);
  const [Fault, setFault] = useState([]);
  const [filled, setfilled] = useState(false);
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
  const [carpark, setCarpark] = useState("");
  const [description, setDescription] = useState("");
  const [result,setResult] = useState(null);


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
    <TouchableWithoutFeedback onPress={() => 
      Keyboard.dismiss() || setFaultTypeOpen(false)|| setSeverityOpen(false)
      }>
      <View style={styles.form}>
        <View style={styles.topContent}>
          <IconButton
            onPress={goBack}
            icon="arrow-back"
            size={28}
            color="black"
          />
          <Text style={styles.reportTitle}
            onLayout={(event) => {
              measureView(event);
            }}
          >
            Report Fault!
          </Text>
        </View>

        <View style={styles.carparkTitle}>
          <Text style={styles.carparkTitle}>
            Carpark BG03</Text>
        </View>

        <View style={styles.helpFault}>
          <Text style={styles.helpFault}>
            How can we help?</Text>
        </View>
        
        <View style={{marginTop: 10,
                      backgroundColor: bgcolor,
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 1,
                      paddingHorizontal: 15,
                      zIndex: 1000}}>
          
            <DropDownPicker
              open={FaultTypeOpen}
              value={Fault}
              items={FaultTypes}
              setOpen={setFaultTypeOpen}
              setValue={setFault}
              setItems={setFaultType}

              dropDownDirection="BOTTOM"
              placeholder="Select Fault Type"
              theme="DARK"
              multiple={false}
              listMode="SCROLLVIEW"
              marginTop={10}
              backgroundColor={bgcolor}
              justifyContent="center"
              onOpen={() => {setSeverityOpen(false), setFaultTypeOpen(true)}}
              controller={(instance) => dropDownRef.current = instance}
            />
        </View>

        <View style={{marginTop: 10,
                      backgroundColor: bgcolor,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 15,
                      zIndex: 999}}>
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

        {result && <Image style={styles.preview} source={{ uri: result }} />}
        <Text style={styles.text}></Text>
        
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

        <View style={styles.cameraContainer}>
            <IconButton 
              onPress={()=>{navigation.navigate("Camera")}} 
              icon="camera" 
              size={35} 
              color="black"
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
  form: {
    backgroundColor: bgcolor,
    flex: 1,
  },
  topContent: {
    marginVertical: 25,
    marginTop: 50,
  },
  reportTitle: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: (deviceWidth-componentWidth)/4.5,
  },
  carparkTitle: {
    fontSize: 30,
    fontWeight: "300",
    color: "black",
    marginLeft: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "200",
    color: "black",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  helpFault: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: "regular",
    color: "black",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  reportDescription: {
    fontSize: 15,
    fontWeight: "regular",
    color: "black",
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 30,
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
  description: {
    color: "white",
    marginTop: 10,
    paddingTop: 15,
    padding: 20,
    fontSize: 15,
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    marginTop: deviceHeight/5,
  },
  cameraContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
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


