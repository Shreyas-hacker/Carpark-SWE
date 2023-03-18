import { View, StyleSheet, Text, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryButton from "../components/PrimaryButton";


function ReportFault(){
    const [filled, setfilled] = useState(false);
    const [carpark, setCarpark] = useState('');
    const [description, setDescription] = useState('');
    const [Fault, setFault] = useState([]);
    const [FaultTypes, setFaultType] = useState([
        {label: 'Broken Light', value: 'BrokenLight'},
        {label: 'Faulty Gantry Machine', value: 'FaultyGantryMachine'},
        {label: 'Broken Barrrier', value: 'broken Barrier'},
        {label: 'Others', value: 'Others'}
      ]);
    const [Severity, setSeverity] = useState([]);
    const [SeverityLevel, setSeverityLevel] = useState([
        {label: 'High', value: 'High'},
        {label: 'Medium', value: 'Medium'},
        {label: 'Low', value: 'Low'},
      ]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    function carparkHandler(enteredCarpark){
        setCarpark(enteredCarpark);
    }

    function descriptionHandler(enteredDescription){
        setDescription(enteredDescription);
    }

    useEffect(()=>{
        if(carpark!=='' && description !== ''){
            setfilled(true);
        }
    },[carpark,description])

    return(
        <ScrollView style={{backgroundColor:"darkturquoise"}}>
            <View style={styles.bigdescription}>
                <Text style={styles.title}>Report Fault</Text>
            </View>

            <View style={styles.inputContainer}>
                {/* This is the input component, wasnt working as a component so i broke it down further in thi file */}
                <TextInput style={styles.inputText} onChangeText={carparkHandler} placeholder='-CarparkName-' value={carpark}/>
            </View>

            <View style={styles.dropdown}>
                <DropDownPicker
                    open={open}
                    value={Fault}
                    items={FaultTypes}
                    setOpen={setOpen}
                    setValue={setFault}
                    setItems={setFaultType}
                    dropDownDirection="BOTTOM"

                    theme="DARK"
                    multiple={true}
                    mode="BADGE"
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}/>
            </View>

            <View style={styles.dropdown1}>
                <DropDownPicker
                    open={open1}
                    value={Severity}
                    items={SeverityLevel}
                    setOpen={setOpen1}
                    setValue={setSeverity}
                    setItems={setSeverityLevel}
                    dropDownDirection="BOTTOM"

                    theme="DARK"
                    multiple={false}
                    mode="BADGE"
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}/>
            </View>

            <View style={styles.inputContainer}>
                {/* This is the input component, wasnt working as a component so i broke it down further in thi file */}
                <TextInput style={styles.inputText} onChangeText={descriptionHandler} placeholder='Enter description here...' value={description}/>
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton>Report Fault</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default ReportFault;

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    dropdown:{
        marginTop: 10,
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        zIndex: open ? 1: 0
    },
    dropdown1:{
        marginTop: 10,
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        zIndex: open1 ? 1: 0
    },
    form:{
        backgroundColor: 'black',
        flex:1,
    },
    bigdescription:{
        marginTop: deviceHeight < 380 ? 60 : 170,
        marginLeft: 15
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
    },
    inputContainer:{
        marginTop: 40,
    },
    inputText:{
        backgroundColor: 'white',
        color: 'grey',
        padding: 15,
        borderRadius: 12,
        fontSize: 15,
        marginHorizontal: 10,
        marginVertical: 8
    },
    text:{
        color: 'white'
    },
    description:{
        color: 'white',
        marginTop: 10,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 20
    },
    buttonContainer:{
    }
});