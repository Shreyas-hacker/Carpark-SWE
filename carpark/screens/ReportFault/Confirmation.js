import { Text,View,StyleSheet,Image,TouchableOpacity,Alert } from 'react-native';
import IconButton from '../../components/IconButton';
import { uploadImage } from "../../util/realtime/storeImage";
import { storeReport } from "../../util/realtime/realTimeStorage";

function ConfirmationPage({navigation,route}) {
    const fault_dict  = {
        1: "Light",
        2: "Gantry Machine",
        3: "Barrier",
        4: "Others"
    }

    const severity_dict = {
        1: "Low",
        2: "Medium",
        3: "High"
    }

    function goBack(){
        navigation.navigate("ReportFault",{carpark: route.params.carpark});
    }

    async function submit(){
        var photoURL = "";
        if(route.params.photoPreview !== ""){
            photoURL = await uploadImage(route.params.photoPreview,route.params.carpark);
        }
        const data = {
            user_id: email,
            carpark_no: route.params.carpark,
            fault_type: route.params.fault,
            severity: route.params.everity,
            description: route.params.description,
            photo: route.params.photoURL,
        };
        storeReport(data);

        Alert.alert("Fault Reported", "Thank you for your feedback!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    }
    return (
        <View style={styles.container}>
            <View style={{marginVertical: 40}}>
                <IconButton onPress={goBack} icon="arrow-back" size={24} color={"black"}/>
                <Text style={styles.title}>Confirmation Page</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.reportDone}>
                <Text style={styles.reportTitle}>Report for Carpark {route.params.carpark}</Text>
                <Text style={styles.reportTitle}>Fault:</Text>
                <Text style={styles.reportText}>{fault_dict[route.params.fault]}</Text>
                <Text style={styles.reportTitle}>Severity:</Text>
                <Text style={styles.reportText}>{severity_dict[route.params.severity]}</Text>
                <Text style={styles.reportTitle}>Description:</Text>
                <Text style={[styles.reportText]}>{route.params.description}</Text>
                <Text style={styles.reportTitle}>Image taken:</Text>
                <Image style={styles.preview} source={route.params.photoPreview}/>
            </View>
            <View style={{marginBottom: 20}}>
                <TouchableOpacity style={styles.confirmationButton} onPress={submit}>
                    <Text style={{fontFamily: 'OpenSans_700Bold',color: 'white',fontSize: 18}}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        fontSize: 24,
        fontFamily: "OpenSans_700Bold",
        textAlign: "center",
    },
    line:{
        borderWidth: 1,
        borderColor: "blue",
        margin: 20,
    },
    reportDone:{
        borderWidth: 5,
        borderColor: "green",
        marginHorizontal: 20,
        paddingVertical: 20,
    },
    reportTitle:{
        fontSize: 18,
        fontFamily: "OpenSans_700Bold",
        textAlign: "center",
        marginVertical: 10,
    },
    reportText:{
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "OpenSans_400Regular",
    },
    confirmationButton:{
        backgroundColor: '#161cc7',
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
        paddingVertical: 10,
        borderRadius: 15,
    },
    preview: {
        resizeMode: 'contain',
        width: '100%',
        height: 200,
    },
});

export default ConfirmationPage;
