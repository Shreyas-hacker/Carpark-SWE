import { useContext, useEffect, useState } from "react";
import { Alert, Dimensions,StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Text } from "react-native";
import { AuthContext } from "../../store/context/user-context";
import { updateAccount } from "../../util/AuthManager";
import PrimaryButton from "../../components/PrimaryButton";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import ProfilePicture from "../../assets/ProfilePicture.png";


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
        <>
        <StatusBar />
        <TouchableWithoutFeedback onPress={() =>
            Keyboard.dismiss()
          }>
            <View>
                <View style={styles.topContent}>
                    <Text style={styles.title} onLayout={(event)=>{
                        measureView(event);
                    }}>Create your Profile</Text>
                </View>
                <Image
                    source={ProfilePicture}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100 / 2,
                        alignSelf: "center",
                    }}
                    />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputText} onChangeText={fullNameHandler} placeholder='Display Name here..' value={fullName}/>
                    <TextInput style={styles.inputText} onChangeText={ageHandler} placeholder='Enter your age here'value={age} keyboardType="decimal-pad" maxLength={2}/>
                    <TextInput style={styles.inputText} onChangeText={phoneNumberHandler} placeholder='Enter your phone number here'value={phoneNumber} keyboardType="decimal-pad" maxLength={8}/>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onSuccess={filled} onAttempt={createProfileAttempt} text="Create Profile"/>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </>
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
        marginBottom: 20,
        alignContent: 'center',
    },
    title:{
        marginLeft: (width-componentWidth)/6,
        marginTop: 40,
        fontSize: 24,
        fontFamily: 'OpenSans_700Bold'
    },
    inputContainer:{
        marginTop : 30
    },
    inputText:{
        width: '95%',
        backgroundColor: 'white',
        borderColor: '#DBE2E7',
        borderWidth: 2,
        color: 'grey',
        padding: 15,
        borderRadius: 12,
        fontSize: 13,
        marginHorizontal: 10,
        marginBottom: 20
    },
    buttonContainer:{

    }

});