import { StyleSheet, Text, TextInput, View } from "react-native";

function InputBox({ label, textInputConfig}) {
    
    return <View>
        <TextInput style={styles.inputStyles} {...textInputConfig}/>
    </View>;
}

export default InputBox;

const styles = StyleSheet.create({
    inputStyles:{
        width: "80%",
        borderRadius: 6,
        fontSize: 14,
        padding: 12,
        borderColor: '#57636C',
        borderWidth: 2
    }
});
