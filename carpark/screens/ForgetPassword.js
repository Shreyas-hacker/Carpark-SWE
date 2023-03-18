import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";

function ForgetPassword({ navigation }) {

    function goBack(){
        naviagation.navigate("Login");
    }
    return (
        <View>
            <Text>ForgetPassword page!</Text>
            <IconButton onPress={goBack} icon="back" size="24" color="black"/>
        </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({});
