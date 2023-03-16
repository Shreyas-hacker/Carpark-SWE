import { StyleSheet, View, Text, TextInput } from "react-native";

function Input({ label, textInputConfig }) {
    let inputStyles = [styles.text];

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 8
    },
    label:{
        fontSize:12,
        marginBottom: 4,
    },
    text:{
        padding: 6,
        borderRadius: 12,
        fontSize: 18,
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: "top"
    }

});
