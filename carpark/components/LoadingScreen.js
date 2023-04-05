import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function LoadingScreen({navigation}){
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Tab')
        },3000)
    })
    return(
        <View style={[styles.container,styles.horizontal]}>
            <ActivityIndicator size="large" color="black"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
    },
    horizontal:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    }
})

export default LoadingScreen;