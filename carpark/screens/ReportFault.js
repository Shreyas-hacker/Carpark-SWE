import { View, StyleSheet, Text, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, FlatList } from "react-native";
import { React, useEffect, useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryButton from "../components/PrimaryButton";
import IconButton from "../components/IconButton"

const width = Dimensions.get('window').width;
let componentWidth = 0;

function ReportFault({navigation}){
    const blueColor = "#A9DEEE"
    const [filled, setfilled] = useState(false);
    const [carpark, setCarpark] = useState('');
    const [description, setDescription] = useState('');
    const [Fault, setFault] = useState([]);
    const [FaultTypes, setFaultType] = useState([
        {label: 'Light', value: '1'},
        {label: 'Gantry Machine', value: '2'},
        {label: 'Barrier', value: '3'},
        {label: 'Others', value: '4'}
      ]);
    const [FaultTypeOpen, setFaultTypeOpen] = useState(false);
    const [Severity, setSeverity] = useState([]);
    const [SeverityLevel, setSeverityLevel] = useState([
        {label: 'High', value: '3'},
        {label: 'Medium', value: '2'},
        {label: 'Low', value: '1'},
      ]);
    const [SeverityOpen, setSeverityOpen] = useState(false);

    //states
    function carparkHandler(enteredCarpark){
        setCarpark(enteredCarpark);
    }
    function descriptionHandler(enteredDescription){
        setDescription(enteredDescription);
    }
    function measureView(event){
        componentWidth = event.nativeEvent.layout.width;
    }
    function goBack(){
        navigation.navigate("Login");
    }
    useEffect(()=>{
        if(carpark!=='' && description !== ''){
            setfilled(true);
        }
    },[carpark,description])

    return(
        <View style={{backgroundColor: blueColor, flex: 1}}>
            <View style={styles.topContent}>
                <IconButton onPress={goBack} icon="arrow-back" size={28} color="black"/>
                <Text style={styles.reportTitle} onLayout={(event)=>{
                    measureView(event);
                }}>Report Fault!</Text>
            </View>

            <View style={styles.carparkTitle}>
                <Text style={styles.carparkTitle}>Carpark BG03</Text>
            </View>
        
            <View style={{
                marginTop: 10,
                backgroundColor: blueColor,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                zIndex: FaultTypeOpen ? 1: 0}}>
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
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}/>
            </View>

            <View style={{
                marginTop: 10,
                backgroundColor: blueColor,       
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                zIndex: SeverityOpen ? 1: 0}}>
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
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}/>
            </View>

            <View style={styles.inputContainer}>
                {/* This is the input component, wasnt working as a component so i broke it down further in thi file */}
                <TextInput style={styles.inputText} onChangeText={descriptionHandler} placeholder='Enter description here...' value={description} multiline = {true}/>
            </View>

            

            {/* <View style={{
                backgroundColor: value,
                borderBottomColor: '#000000',
                borderBottomWidth: 1,
            }}>
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => onChangeText(text)}
                value={value}
                style={{padding: 10}}
            />
            </View> */}

            <View style={styles.buttonContainer}>
                <PrimaryButton text="Report Fault" onSuccess = {filled}/>
            </View>
        </View>
    )
}

export default ReportFault;

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    form:{
        backgroundColor: 'black',
        flex:1,
    },
    topContent: {
        flexDirection:'row',
        marginVertical: 40,
        alignItems: 'center'
    },
    reportTitle:{
        marginLeft: (width - componentWidth)/6,
        fontSize: 20,
    },
    carparkTitle:{
        fontSize: 30,
        fontWeight: "regular",
        color: 'black',
        marginLeft: 10
    },
    inputContainer:{
        marginTop: 40,
    },
    inputText:{
        backgroundColor: 'white',
        color: 'black',
        textAlignVertical : 'top',
        textAlign : 'left',
        paddingTop : 15,
        padding: 20,
        borderRadius: 12,
        fontSize: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        lineHeight : 25,
        minHeight : 100,
    },
    text:{
        color: 'white'
    },
    description:{
        color: 'white',
        marginTop: 10,
        paddingTop : 15,
        padding: 20,
        fontSize: 15,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 20
    }
});
