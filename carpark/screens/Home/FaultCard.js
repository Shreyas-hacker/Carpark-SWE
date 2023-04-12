import { title } from "process";
import { View,Text,StyleSheet } from "react-native";


function FaultCard({fault}){
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Carpark</Text>
                <Text style={styles.text}>Fault Type: <Text style={styles.boldText}>Lighting</Text></Text>
                <Text style={styles.text}>Description: {" "}<Text style={styles.boldText} numberOfLines={2}>Lighting</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        aligntitems: "center",
        marginTop: 20,
    },
    card:{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shawdoeOffset: {width: 0, height: 2},
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxWidth: 400,
        width: "80%",
    },
    title:{
        fontSize: 24,
        fontWeight: "OpenSans_700Bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#444444",
    },
    text:{
        fontSize: 16,
        marginBottom: 5,
        color: "#444444",
    }
})

export default FaultCard;