import { View, StyleSheet, Text, Dimensions, Pressable, TextInput, ScrollView, Alert, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import { fetchAccounts } from "../../util/http";

function Login({navigation}){
    const [filled, setfilled] = useState(false); // state to manage if all fields in the form has been filled
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [accountInfo, setAccountInfo] = useState([]);


    useEffect(()=>{
        if(username!=='' && password !== ''){
            setfilled(true);
        }
    },[username,password])

    useEffect(()=>{
        async function getAccounts(){
            const accounts = await fetchAccounts();
            setAccountInfo(accounts);
        }
        
        getAccounts();
    },[]);

    function passwordHandler(enteredPassword){
        setPassword(enteredPassword);
    }

    function usernameHandler(enteredUsername){
        setUsername(enteredUsername);
    }

    function changeIcon(){
        setShow(!show)
    }
    function loginAttempt(){
        var searchedAccount = false;

        for(var i=0; i<accountInfo.length;i++){
            if(accountInfo[i].password === password && accountInfo[i].username === username){
                searchedAccount = true;
                break;
            }
        }
        if(!searchedAccount){
            Alert.alert(
                "Unsuccessful",
                "Error: There is no user record corresponding to this identifier. The user may have been deleted OR password is invalid",
                [{ text: "Okay", style: "destructive" }]
            );
        }else{
            navigation.navigate("Home");
        }
    }

    return(
        <ScrollView style={styles.form} keyboardShouldPersistTaps='handled'>
            <View>
                <View style={styles.bigdescription}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.description}>Finding Carparks in a jiffy!</Text>
                </View>
                <View style={styles.inputContainer}>
                    {/* This is the input component, wasnt working as a component so i broke it down further in this file */}
                    <TextInput style={styles.inputText} onChangeText={usernameHandler} placeholder='Username' value={username}/>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.inputText} onChangeText={passwordHandler} placeholder='Password' value={password} secureTextEntry={show}/>
                        <TouchableOpacity>
                            <IconButton icon={show ? 'eye-off' : 'eye'} color={'grey'} size={20} onPress={changeIcon} extrastyle={styles.iconButton}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>Don't have an account?</Text>
                        <Pressable onPress={()=>{navigation.navigate("CreateAccount")}}>
                            <Text style={styles.text}>Create account</Text>
                        </Pressable>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onSuccess={filled} onAttempt={loginAttempt} text="Login"/>
                    </View>
                </View>
                <View style={styles.forgetpassword}>
                    <Pressable onPress={()=>{navigation.navigate("ForgetPassword")}}>
                        <Text style={styles.text}>Forget Password?</Text>
                    </Pressable>
                </View>
                <View style={styles.socialmedia}>
                    <Text style={styles.text}>Use a Social Platform to Login</Text>
                    <View style={styles.socialMediaButton}>
                        <Button title="Google"/>
                        <Button title="Facebook"/>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        marginTop: deviceHeight < 380 ? 60 : 150,
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
        width: "95%",
        backgroundColor: 'white',
        color: 'grey',
        padding: 15,
        borderRadius: 12,
        fontSize: 15,
        marginHorizontal: 10,
        marginVertical: 8
    },
    iconButton:{
        position: 'absolute',
        alignSelf: 'center',
        right: 0,
        marginTop: 23
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
    forgetpassword:{
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30
    },
    socialmedia:{
        alignItems: 'center'
    },
    socialMediaButton:{
        marginTop: 20,
        flexDirection: 'row'
    }
});