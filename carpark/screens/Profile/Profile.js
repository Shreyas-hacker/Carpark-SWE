import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { Pressable } from "react-native";
import { Text,View,StyleSheet, Dimensions, Button } from "react-native";
import LongButton from "../../components/LongButton";
import PrimaryButton from '../../components/PrimaryButton';
import { AuthContext } from "../../store/context/user-context";

function Profile(){
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const API_KEY = 'AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk';
    const [displayName,setDisplayName] = useState('');
    const [email,setEmail] = useState('');

    useEffect(()=>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
        async function getDisplayName(){
            const response = await axios.post(url,{idToken:token}).then((response)=>{
                setDisplayName(response.data.users[0].displayName)
                setEmail(response.data.users[0].email)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        getDisplayName();
    })
    return (
        <View style={{backgroundColor: 'white',flex:1}}>
            <View style={styles.profileContainer}>
                <View>
                    <Text style={styles.textStyle}>Hi,{displayName}!</Text>
                    <Text style={styles.emailStyle}>[{email}]</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <LongButton text="Edit Profile"/>
                <LongButton text="Change Password"/>
                <PrimaryButton text={"Logout"} onSuccess={true} onAttempt={authCtx.logout}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer:{
        width: '100%',
        marginTop: 100,
        marginLeft:40,
        padding: 20,
    },
    textStyle:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom:10,
        marginLeft: 50,
    },
    emailStyle:{
        fontSize: 12,
        fontWeight: "bold",
        marginBottom:10,
        marginLeft: 50
    },
    buttonContainer:{
        backgroundColor: "#F0F5F6",
        flex: 1,
    },
})
export default Profile;