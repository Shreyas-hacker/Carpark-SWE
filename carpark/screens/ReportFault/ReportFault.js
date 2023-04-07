import { View, ImageBackground, StyleSheet, Text, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from "react-native";
import { React, useEffect, useState, useRef, useCallback } from "react";
import { useFonts } from 'expo-font';
import CarparkBackground from "../../assets/CarparkBackground.jpg";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import LoadingScreen from "../../components/LoadingScreen";

const bgcolor = "#FFFFFF";
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

  const [fontsLoaded] = useFonts({
    'Nunito-Black': require('../../assets/fonts/Nunito_Sans/NunitoSans-Black.ttf'),
    'Nunito-Bold': require('../../assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf'),
    'Nunito-ExtraBold': require('../../assets/fonts/Nunito_Sans/NunitoSans-ExtraBold.ttf'),
    'Nunito-ExtraLight': require('../../assets/fonts/Nunito_Sans/NunitoSans-ExtraLight.ttf'),
    'Nunito-Light': require('../../assets/fonts/Nunito_Sans/NunitoSans-Light.ttf'),
    'Nunito-Regular': require('../../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf'),
    'Nunito-SemiBold': require('../../assets/fonts/Nunito_Sans/NunitoSans-SemiBold.ttf'),
    'OpenSans-Bold': require('../../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold': require('../../assets/fonts/Open_Sans/static/OpenSans/OpenSans-ExtraBold.ttf'),
    'OpenSans-Light': require('../../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Light.ttf'),
    'OpenSans-Regular': require('../../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../../assets/fonts/Open_Sans/static/OpenSans/OpenSans-SemiBold.ttf'),
    'OpenSans-Medium': require('../../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Medium.ttf'),
  });

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
    fontsLoaded ? <TouchableWithoutFeedback onPress={() => 
      Keyboard.dismiss() || setFaultTypeOpen(false)|| setSeverityOpen(false)
      }>
      <View style={styles.form}>
        <ImageBackground
          source={CarparkBackground}
          style={styles.backgroundimage}
        >
        </ImageBackground>
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
            Report Faults
          </Text>
          <View style={styles.carparkTitle}>
            <Text style={styles.carparkTitle}>
              Carpark BG03</Text>
          </View>
        </View>     
        <View style={styles.helpFault}>
            <Text style={styles.helpFault}>
              How can we help?</Text>
        </View>   
        <View style={{backgroundColor: bgcolor,
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
            textStyle={{
              fontSize: 15,
              fontFamily: 'OpenSans-Bold'
            }}
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

            textStyle={{
              fontSize: 15,
              fontFamily: 'OpenSans-Bold'
            }}
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
    </TouchableWithoutFeedback> : <LoadingScreen />
    );
  }

const styles = StyleSheet.create({
  form: {
    backgroundColor: bgcolor,
    flex: 1,
  },
  backgroundimage: {
    flex: 9 / 16,
    justifyContent: "center",
    width: "100%",
    opacity: 0.5,
  },
  topContent: {
    position: "absolute",
    top: deviceHeight / 15,
    marginBottom: 0,
  },
  reportTitle: {
    fontSize: 20,
    marginLeft: deviceWidth / 2.9,
    fontFamily: "OpenSans-Bold",
    marginBottom: deviceHeight / 30,
  },
  carparkTitle: {
    fontSize: 35,
    color: "black",
    marginLeft: 10,
    fontFamily: "OpenSans-ExtraBold",
  },
  helpFault: {
    marginBottom: 5,
    marginTop: 9,
    fontSize: 27,
    fontWeight: "regular",
    color: "black",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    fontFamily: "OpenSans-Medium",
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
    borderWidth: 2,
    borderRadius: 30,
    marginHorizontal: 10,
    maxHeight: 150,
    backgroundColor: "white",
    fontFamily: "OpenSans-Regular",
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
    fontFamily: "OpenSans-Regular",
  },
  description: {
    color: "white",
    marginTop: 10,
    paddingTop: 15,
    padding: 20,
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    marginTop: deviceHeight/10,
    fontFamily: "OpenSans-Regular",
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


