import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { Text,View,StyleSheet } from "react-native";
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
        <View>
            <View style={styles.profileContainer}>
                <View>
                    <Text style={styles.textStyle}>{displayName}</Text>
                    <Text style={styles.textStyle}>[{email}]</Text>
                </View>
            </View>
            <PrimaryButton text={"Logout"} onSuccess={true} onAttempt={authCtx.logout}/>
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
        paddingHorizontal: 90,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom:10,
    }
})
export default Profile;