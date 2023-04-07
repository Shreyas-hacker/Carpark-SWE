import { Text,StyleSheet,View,Dimensions } from "react-native";
import { useState } from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconButton from "../../components/IconButton";

function ReportsMade({navigation}){
    const [reportsDone, setReportsDone] = useState();

    function goBack(){
        navigation.goBack();
    }
    return(
        reportsDone ? (<Text>Reports Made!</Text>):(
            <>
            <View style={styles.topContent}>
                <IconButton onPress={goBack} icon="arrow-back" size={28} color="black"/>
            </View>
            <View style={styles.imageContainer}>
                <MaterialIcons name="report-off" color="black" size={100} style={{alignSelf: 'center'}}/>
                <Text style={{alignSelf:'center'}}>No reports made!</Text>
            </View>
            </>
        )
    )
}

const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    topContent:{
        flexDirection:'row',
        marginTop: 40,
        alignItems: 'center'
    },
    imageContainer:{
        marginTop: height/3,
    },
})

export default ReportsMade;