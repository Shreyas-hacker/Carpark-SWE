import { Text,StyleSheet,View,Dimensions } from "react-native";
import { useState,useContext,useEffect } from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconButton from "../../components/IconButton";
import { AuthContext } from "../../store/context/user-context";
import fetchReports from "../../util/realtime/realTimeStorage";

function ReportsMade({navigation}){
    const [reportsDone, setReportsDone] = useState(false);
    const [reports, setReports] = useState([]);
    const authCtx = useContext(AuthContext);
    
    useEffect(()=>{
        async function getReports(){
            try{
                var email = authCtx.email;
                const response = await fetchReports();
                console.log(response);
                if (response && response.data && response.data.length > 0) {
                    const filteredReports = response.data.filter((report) => report.user_id === email);
                    setReportsDone(true);
                    setReports(filteredReports);
                }else{
                    setReportsDone(false);
                }
            }catch(error){
                console.log(error.message);
            }
        }
        getReports();
    },[])

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