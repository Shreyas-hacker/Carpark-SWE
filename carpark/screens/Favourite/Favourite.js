import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView
  } from "react-native";
  import { React, useEffect, useState } from "react";
  
  function Favourite({ navigation,route }) {
      return(
        <ScrollView style={{flex: 1}}>
        <View style={styles.headercontainer}>
            <Text style={styles.headertext}>
                Here are your favourite carparks!
            </Text>
        </View>
        <View style={styles.bodycontainer}>
            <Text style={{fontSize: 50}}>favourite carpark1 </Text>
            <Text style={{fontSize: 50}}>favourite carpark2 </Text>
            <Text style={{fontSize: 50}}>favourite carpark3 </Text>
            <Text style={{fontSize: 50}}>favourite carpark4 </Text>
            <Text style={{fontSize: 50}}>favourite carpark5 </Text>
            <Text style={{fontSize: 50}}>favourite carpark6 </Text>
        </View>
        </ScrollView>
      );
    }
      
  
  
  const deviceHeight = Dimensions.get("window").height;
  
  const styles = StyleSheet.create({
    headercontainer: {
        backgroundColor: "palegreen",
        flex: 1,
        height: 150,
    },
    headertext: {
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 40,
        textAlign: "center"
    },
    bodycontainer: {
        backgroundColor: "gray",
        flex: 1,
    }
  });
  
  export default Favourite;
  
  
  