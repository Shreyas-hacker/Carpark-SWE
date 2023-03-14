import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

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
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onSuccess={filled}>Create</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    form:{
        flex:1,
    },
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    buttonContainer:{
        marginTop: 300,
    }
});