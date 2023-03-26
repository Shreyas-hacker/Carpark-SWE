import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";

function Home({navigation}){
    return(
        <View>
            <Text>Home Screen!</Text>
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
});