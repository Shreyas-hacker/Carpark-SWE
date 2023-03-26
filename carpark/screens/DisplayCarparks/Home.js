import React from "react";
import { Text, StyleSheet, View} from "react-native";

function Home({navigation}){
    return(
        <Text>Home Screen!</Text>
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