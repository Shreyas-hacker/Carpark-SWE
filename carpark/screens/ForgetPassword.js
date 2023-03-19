import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";

function ForgetPassword({ navigation }) {

    function goBack(){
        navigation.navigate("Login");
    }
    return (
        <View>
            <Text>ForgetPassword page!</Text>
            <IconButton onPress={goBack} icon="arrow-back" size={24} color="black"/>
        </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({});
