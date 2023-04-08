import { View, ImageBackground, StyleSheet, Text, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { React, useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import CarparkBackground from "../../assets/CarparkBackground.jpg";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import useLoadFonts from '../../util/loadfont';
import { FontStyle } from "../../util/fontstyles";

const backColor = "#FFFFFF";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
let componentWidth = 0;


function ReportFault({ navigation,route }) {
  const [faultDropOpen, setFaultDropOpen] = useState(false);
  const [severityDropOpen, setSeverityDropOpen] = useState(false);
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
  const [carpark, setCarpark] = useState("");
  const [filled, setfilled] = useState(false);
  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);

  useLoadFonts();
  
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
    if (setFaultDropOpen !== false && setSeverityDropOpen !== false && description !== "") {
      setfilled(true);
    }
  }, [carpark, description]);

  useEffect(() => {
    if(route.params !== undefined){
      setPhotoPreview(route.params.photoPreview);
    }else{
      setPhotoPreview(null);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={() => 
      Keyboard.dismiss() || setFaultDropOpen(false)|| setSeverityDropOpen(false)
      }>

      <View style={styles.form}>
        <ImageBackground
          source={CarparkBackground}
          style={styles.backgroundimage}
        >
        </ImageBackground>

        <View style={styles.topContent}>
          <IconButton onPress={goBack} icon="arrow-back" size={28} color="black"
          />
          <Text style={[styles.reportTitle, FontStyle.bold]}
            onLayout={(event) => {
              measureView(event);
            }}
          >
            Report Faults
          </Text>
        </View>

        <Text style={[styles.carparkTitle, FontStyle.extrabold]}>
          Carpark BG03
        </Text> 

        <View style={styles.helpFault}>
          <Text style={[styles.helpFault, FontStyle.medium]}>
            How can we help?
          </Text>
        </View>   
        
        <View style={{backgroundColor: backColor, alignItems: "center", justifyContent: "center", opacity: 1, paddingHorizontal: 15, zIndex: 1000}}>
          <DropDownPicker
            open={faultDropOpen}
            value={Fault}
            items={FaultTypes}
            setOpen={setFaultDropOpen}
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
            backgroundColor={backColor}
            justifyContent="center"
            onOpen={() => {setSeverityDropOpen(false), setFaultDropOpen(true)}}
            controller={(instance) => dropDownRef.current = instance}
          />
        </View>

        <View style={{marginTop: 10, backgroundColor: backColor, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, zIndex: 999}}>
          <DropDownPicker
            open={severityDropOpen}
            value={Severity}
            items={SeverityLevel}
            setOpen={setSeverityDropOpen}
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
            onOpen={() => {setSeverityDropOpen(true), setFaultDropOpen(false)}}
          />
        </View>
            
        
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
        {photoPreview && <Text style={styles.imageText}>Image Stored</Text>}
        {/* <Image style={styles.preview} source={{uri: photoPreview}}/> */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            text="Submit"
            onSuccess={filled}
            onAttempt={submit}
          />
        </View>
      </View>
      
      
    </TouchableWithoutFeedback>);
}

const styles = StyleSheet.create({
  dropdowntext: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold'
  }, 
  form: {
    backgroundColor: backColor,
    flex: 1,
  },
  backgroundimage: {
    flex: 9 / 16,
    justifyContent: "center",
    width: "100%",
    opacity: 0.5,
  },
  topContent: {
    width: '100%',
    position: "absolute",
    flexDirection: "row",
    top: deviceHeight / 15,
    marginBottom: 0,
  },
  reportTitle: {
    fontSize: 20,
    marginHorizontal: (deviceWidth - componentWidth -35) / 5,
  },
  carparkTitle: {
    fontSize: 35,
    color: "black",
    textAlign: 'center',
  },
  helpFault: {
    marginBottom: 5,
    marginTop: 9,
    fontSize: 27,
    fontWeight: "regular",
    color: "black",
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
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
    marginTop: 10,
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
    marginVertical: 10,
    width: 300,
  },
  imageText:{
    fontSize: 15,
    color: "green",
    textAlign: 'center',
    fontFamily: "OpenSans-Regular",
  }
});

export default ReportFault;


