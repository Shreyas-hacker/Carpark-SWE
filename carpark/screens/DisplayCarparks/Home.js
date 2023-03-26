import React from "react";
import { Text, StyleSheet, View} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../Accounts/Profile';

const BottomTab = createBottomTabNavigator();

function Home({navigation}){
    return(
        <>
        <BottomTab.Navigator screenOptions={{headerStyle: {backgroundColor: 'white',headerTintColor: '#39D2C0'}}}>
            <BottomTab.Screen name="Home" component={Home} options={{}}/>
            <BottomTab.Screen name="Profile" component={Profile} options={{}}/>
        </BottomTab.Navigator>
        </>
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