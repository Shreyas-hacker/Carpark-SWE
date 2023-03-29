import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, Button} from "react-native";
import { AuthContext } from "../../store/context/user-context";

function Home({navigation}){
    const API_KEY = 'AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk';
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [displayName,setDisplayName] = useState('');

    useEffect(()=>{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
        async function getDisplayName(){
            const response = await axios.post(url,{idToken:token}).then((response)=>{
                setDisplayName(response.data.users[0].displayName)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        getDisplayName();
    },[])

    return(
        <View>
            <Text style={styles.displayText}>Welcome {displayName}</Text>
            <Button onPress={()=>{
                navigation.navigate('DisplayCarpark');
            }} title='Maps' />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container:{
    flex : 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    },
    displayText:{
        marginTop: 40
    }
});