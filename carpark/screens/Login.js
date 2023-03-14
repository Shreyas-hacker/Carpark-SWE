import { View, Text, StyleSheet } from "react-native";

import PrimaryButton from "../components/PrimaryButton";

function Login(){
    const success = true; // can change to false if want to see change in color of button

    return(
        <View style={styles.form}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onSuccess={success}>Create</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    form:{
        flex:1,
    },
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    buttonContainer:{
        marginTop: 300,
    }
});