import React from "react";
import { Text, StyleSheet, View} from "react-native";

function Home(){
    return(
    <View style={styles.container}>
     <Text>Home Page!</Text>
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