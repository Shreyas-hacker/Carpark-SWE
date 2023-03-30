import { StyleSheet,Text,Pressable,View } from "react-native";


function LongButton({text,onPress}) {
    return <View style={styles.buttonOuterContainer}>
        <Pressable style={styles.buttonInnerContainer} onPress={onPress}>
            <Text>{text}</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 8,
        borderColor: '#DBE2E7',
        borderWidth:2,
        overflow: 'hidden',
        width: "90%",
        alignSelf:'center',
        marginVertical: 10,
    },
    buttonInnerContainer:{
        backgroundColor:'#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 30
    },
});

export default LongButton;