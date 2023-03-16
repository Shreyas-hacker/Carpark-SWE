import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";

function Login(){
    const [filled, setfilled] = useState(false); // state to manage if all fields in the form has been filled
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    function passwordHandler(enteredPassword){
        setPassword(enteredPassword);
    }

    function usernameHandler(enteredUsername){
        setUsername(enteredUsername);
    }

    useEffect(()=>{
        if(username!=='' && password!==''){
            setfilled(true);
        }
    },[username,password])


    return(
            <View style={styles.form}>
                <View style={styles.bigdescription}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.description}>Finding Carparks in a jiffy!</Text>
                </View>
                <View>
                    <Input />
                    <Input />
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>Don't have an account?</Text>
                        <Pressable onPress={()=>{console.log('hello')}}>
                            <Text style={styles.text}>Create account</Text>
                        </Pressable>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onSuccess={filled}>Login</PrimaryButton>
                    </View>
                </View>
            </View>
    )
}

export default Login;

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    form:{
        backgroundColor: 'black',
        flex:1,
    },
    bigdescription:{
        marginTop: deviceHeight < 380 ? 60 : 170,
        marginLeft: 25
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
    },
    text:{
        color: 'white'
    },
    description:{
        color: 'white',
        marginTop: 20,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: deviceHeight < 380 ? 60 : 170,
        marginHorizontal: 20
    },
    buttonContainer:{
    }
});