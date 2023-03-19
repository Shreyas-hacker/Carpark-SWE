import { Dimensions, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";

let componentWidth = 0;
const width = Dimensions.get('window').width;

function ForgetPassword({ navigation }) {

    function measureView(event){
        componentWidth = event.nativeEvent.layout.width;
    }
    function goBack(){
        navigation.navigate("Login");
    }

    return (
        <View>
            <View style={styles.topContent}>
                <IconButton onPress={goBack} icon="arrow-back" size={28} color="black"/>
                <Text style={styles.title} onLayout={(event)=>{
                    measureView(event);
                }}>ForgetPassword</Text>
            </View>
        </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({
    topContent: {
        flexDirection:'row',
        marginVertical: 40,
        alignItems: 'center'
    },
    title:{
        marginLeft: (width - componentWidth)/6
    }
});
