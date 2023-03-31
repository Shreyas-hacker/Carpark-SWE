import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, TextInput, StyleSheet, Text, View, Alert } from "react-native";
import IconButton from "../../components/IconButton";
import PrimaryButton from "../../components/PrimaryButton";
import { emailChecker } from "../../util/helper";

let componentWidth = 0;
const width = Dimensions.get('window').width;

function ChangePassword(){
    function measureView(event){
        componentWidth = event.nativeEvent.layout.width;
    }
    function goBack(){
        navigation.goBack();
    }

    const [filled, setFilled] = useState(false);
    const [email, setEmail] = useState("");

    function emailHandler(enteredEmail){
        setEmail(enteredEmail);
    }

    function sendEmail(){
        if(!emailChecker(email)){
            Alert.alert(
                "Unsuccessful",
                "Error: Email Address entered does not follow the valid format",
                [{ text: "Okay", style: "destructive" }]
            );
        }else{
            console.log("Valid email")
        }
    }
    useEffect(()=>{
        if(email!==""){
            setFilled(true);
        }
    },[email])


    return (
        <>
        <StatusBar/>
        <View style={styles.page}>
            <View style={styles.topContent}>
                <IconButton onPress={goBack} icon="arrow-back" size={28} color="black"/>
                <Text style={styles.title} onLayout={(event)=>{
                    measureView(event);
                }}>Change Password</Text>
            </View>
            <View style={styles.inputConfig}>
                <TextInput style={styles.inputStyles} value={email} onChangeText={emailHandler} placeholder="Enter your email address"/>
                <Text style={{color: '#57636C'}}>We will send you an email with our database to reset your password, please enter the email associated with your account above.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton text="Update Password" onSuccess={filled} onAttempt={sendEmail}/>
            </View>
        </View>
        </>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
    page:{
        backgroundColor:'white', 
        flex: 1
    },
    topContent: {
        flexDirection:'row',
        marginVertical: 40,
        alignItems: 'center'
    },
    title:{
        marginLeft: (width - componentWidth)/5
    },
    inputConfig: {
        marginHorizontal: "5%",
        flexDirection: 'column',
    },
    inputStyles:{
        borderRadius: 6,
        fontSize: 14,
        padding: 12,
        borderColor: '#DBE2E7',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        marginBottom: 20
    },
    buttonContainer:{
        marginVertical:30
    }
});