import { View, StyleSheet, Text, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import {Picker} from "@react-native-picker/picker"
import PrimaryButton from "../components/PrimaryButton";


function ReportFault(){
    const [filled, setfilled] = useState(false);
    const [carpark, setCarpark] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFaultType, setFaultType] = useState('');

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
        <ScrollView>
            <View style={styles.bigdescription}>
                <Text style={styles.title}>Report Fault</Text>
            </View>

            <View style={styles.inputContainer}>
                    {/* This is the input component, wasnt working as a component so i broke it down further in thi file */}
                    <TextInput style={styles.inputText} onChangeText={carparkHandler} placeholder='-CarparkName-' value={carpark}/>
            </View>

            <View>
            <Picker
                selectedFaultType={selectedFaultType}
                onValueChange={(itemValue, itemIndex) =>
                setFaultType(itemValue)}>
                <Picker.Item label="Broken Light" value="BrokenLight" />
                <Picker.Item label="Broken Gantry" value="BrokenGantry" />
                <Picker.Item label="Broken Door" value="BrokenDoor" />
            </Picker>
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

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
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
        color: 'white',
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

export default ReportFault;