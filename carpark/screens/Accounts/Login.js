import { View, StyleSheet, Text, Dimensions, Pressable, TextInput, ScrollView, Alert, Button, TouchableOpacity,Keyboard, TouchableWithoutFeedback } from "react-native";
import { useContext, useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import { AuthContext } from "../../store/context/user-context";
import { login } from "../../util/AuthManager";

function Login({navigation}){
    const [filled, setfilled] = useState(false); // state to manage if all fields in the form has been filled
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);

    const authCtx = useContext(AuthContext);

    useEffect(()=>{
        if(username!=='' && password !== ''){
            setfilled(true);
        }
    },[username,password])

    function passwordHandler(enteredPassword){
        setPassword(enteredPassword);
    }

    function usernameHandler(enteredUsername){
        setUsername(enteredUsername);
    }

    function changeIcon(){
        setShow(!show)
    }
    
    async function loginAttempt(){
        try{
            const token = await login(username,password);
            authCtx.handleEmail(username);
            authCtx.authenticate(token);
            authCtx.setAuth();
        }catch(error){
            console.log(error.request);
            Alert.alert(
                "Unsuccessful",
                "Error: There is no user record corresponding to this identifier. The user may have been deleted OR password is invalid",
                [{ text: "Okay", style: "destructive" }]
            );
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() =>
            Keyboard.dismiss()
          }>
            <View style={styles.form}>
                <View style={[styles.bigdescription]}>
                    <Text style={[styles.title]}>ezPark</Text>
                    <Text style={[styles.description]}>Finding Carparks in a jiffy!</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputText} onChangeText={usernameHandler} placeholder='Email' value={username}/>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.inputText} onChangeText={passwordHandler} placeholder='Password' value={password} secureTextEntry={show}/>
                        <TouchableOpacity>
                            <IconButton icon={show ? 'eye-off' : 'eye'} color={'grey'} size={20} onPress={changeIcon} extrastyle={styles.iconButton}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={[styles.text]}>New User?</Text>
                        <Pressable onPress={()=>{navigation.navigate("CreateAccount")}}>
                            <Text style={[styles.createText]}>Create account here!</Text>
                        </Pressable>
                    </View>
                    <View style={styles.container}>
                        <PrimaryButton onSuccess={filled} onAttempt={loginAttempt} text="Login"/>
                    </View>
                </View>
                <View style={styles.forgetpassword}>
                    <Pressable onPress={()=>{navigation.navigate("ForgetPassword")}}>
                        <Text style={[styles.forgetText]}>Forget Password?</Text>
                    </Pressable>
                </View>
                {/* <View style={styles.socialmedia}>
                    <Text style={styles.text}>Use a Social Platform to Login</Text>
                    <View style={styles.socialMediaButton}>
                        <Button title="Google"/>
                        <Button title="Facebook"/>
                    </View>
                </View> */}
            </View>
        </TouchableWithoutFeedback>
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
        marginTop: deviceHeight < 380 ? 60 : 200,
        marginLeft: 20,
    },
    title:{
        fontSize: 45,
        color: 'white',
        fontFamily: 'OpenSans_600SemiBold_Italic',
        color: '#3FE0D2'
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
        color: 'white',
        fontFamily: 'OpenSans_300Light',
        fontSize: 13,
    },
    createText:{
        color: 'white',
        fontFamily: 'OpenSans_700Bold',
        color: '#3FE0D2'
    },
    forgetText:{
        color: 'white',
        fontFamily: 'OpenSans_700Bold',
        color: '#3FE0D2'
    },
    description:{
        color: 'white',
        marginTop: 10,
        fontFamily: 'OpenSans_400Regular',
        fontSize: 15
    },
    container: {
        flexDirection: 'row',
        marginBottom: 50,
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 20
    },
    forgetpassword:{
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    socialmedia:{
        alignItems: 'center'
    },
    socialMediaButton:{
        marginTop: 20,
        flexDirection: 'row'
    }
});