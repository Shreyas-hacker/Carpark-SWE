import { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native";
import { AuthContext } from "../../store/context/user-context";
import { updateAccount } from "../../util/AuthManager";
import PrimaryButton from "../../components/PrimaryButton";


let componentWidth = 0;
const width = Dimensions.get('window').width;

function CreateProfile({navigation}){
    const [fullName,setFullName] = useState('')
    const [age, setAge] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [filled, setFilled] = useState(false);
    const authCtx = useContext(AuthContext);
    
    useEffect(()=>{
        if(fullName !=='' && age !=='' && phoneNumber !==''){
            setFilled(true);
        } 
    },[fullName,age,phoneNumber]);

    //changing state function
    function fullNameHandler(enteredName){
        setFullName(enteredName)
    }

    function ageHandler(enteredAge){
        setAge(enteredAge);
    }

    function phoneNumberHandler(enteredPhoneNumber){
        setPhoneNumber(enteredPhoneNumber);
    }

    function measureView(event){
        componentWidth = event.nativeEvent.layout.width
    }

    //create profile fuction
    async function createProfileAttempt(){
        if(parseInt(age)==0 || parseInt(age)<0 || parseInt(age) > 99 || isNaN(parseInt(age))){
            Alert.alert(
                "Invalid Age",
                "Error: Age should be between 1 to 99",
                [{text: 'Okay',style:'destructive'}]
        )
        }else{
            await updateAccount(authCtx.token,fullName);
            authCtx.handleDisplayName(fullName);
            authCtx.setAuth();
        }
        console.log('Profile created');
    }
    return (
        <ScrollView style={styles.page} keyboardShouldPersistTaps='handled'>
            <View>
                <View style={styles.topContent}>
                    <Text style={styles.title} onLayout={(event)=>{
                        measureView(event);
                    }}>Create your Profile</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputText} onChangeText={fullNameHandler} placeholder='Display Name here..' value={fullName}/>
                    <TextInput style={styles.inputText} onChangeText={ageHandler} placeholder='Enter your age here'value={age} keyboardType="decimal-pad" maxLength={2}/>
                    <TextInput style={styles.inputText} onChangeText={phoneNumberHandler} placeholder='Enter your phone number here'value={phoneNumber} keyboardType="decimal-pad" maxLength={8}/>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onSuccess={filled} onAttempt={createProfileAttempt} text="Create Profile"/>
                </View>
            </View>
        </ScrollView>
    )
}

export default CreateProfile;

const styles = StyleSheet.create({
    page:{
        backgroundColor: 'white',
        flex: 1
    },
    topContent:{
        flexDirection: 'row',
        marginTop: 40,
        alignContent: 'center'
    },
    title:{
        marginLeft: (width-componentWidth)/5,
        marginTop: 40,
        fontSize: 24
    },
    inputContainer:{
        marginTop:40
    },
    inputText:{
        width: '95%',
        backgroundColor: 'white',
        borderColor: '#DBE2E7',
        borderWidth: 2,
        color: 'grey',
        padding: 15,
        borderRadius: 12,
        fontSize: 15,
        marginHorizontal: 10,
        marginBottom: 40
    },
    buttonContainer:{

    }

});