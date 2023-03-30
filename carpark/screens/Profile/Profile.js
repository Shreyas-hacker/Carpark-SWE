import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { Text,View,StyleSheet, Dimensions } from "react-native";
import PrimaryButton from '../../components/PrimaryButton';
import { AuthContext } from "../../store/context/user-context";

let componentWidth = 0;
const width = Dimensions.get('window').width;

function Profile(){
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const API_KEY = 'AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk';
    const [displayName,setDisplayName] = useState('');
    const [email,setEmail] = useState('');

    function measureView(event){
        componentWidth = event.nativeEvent.layout.width;
    }

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
                    <Text style={styles.textStyle} onLayout={(event)=>{
                        measureView(event);
                    }}>Hi,{displayName}!</Text>
                    <Text style={styles.emailStyle} onLayout={(event)=>{
                        measureView(event);
                    }}>[{email}]</Text>
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom:10,
        marginLeft: (width-componentWidth)/5,
    },
    emailStyle:{
        fontSize: 18,
        fontWeight: "bold",
        marginBottom:10,
        marginLeft: (width-componentWidth)/17,
    }
})
export default Profile;