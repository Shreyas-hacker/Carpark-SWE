import { Children } from "react"
import { Text, View, Pressable, StyleSheet } from "react-native"

function PrimaryButton({children, onSuccess}){
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={()=> onSuccess ? [styles.buttonInnerContainer, styles.success]: styles.buttonInnerContainer}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderWidth: 1,
        borderRadius: 28,
        overflow: 'hidden',
        width: 130,
    },
    buttonInnerContainer:{
        backgroundColor: 'grey',
        paddingVertical: 10,
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    success:{
        backgroundColor:'#39D2C0',
    }
})