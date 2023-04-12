import { Text,StyleSheet,View,Dimensions, FlatList } from "react-native";
import { useState,useContext,useEffect } from "react";

import ReportCard from "./ReportCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconButton from "../../components/IconButton";
import { AuthContext } from "../../store/context/user-context";
import {fetchReports} from "../../util/realtime/realTimeStorage";
import LoadingScreen from "../../components/LoadingScreen";

function ReportsMade({navigation}){
    const [reportsDone, setReportsDone] = useState(false);
    const [reports, setReports] = useState([]);
    const authCtx = useContext(AuthContext);
    
    useEffect(()=>{
        async function getReports(){
            try{
                var email = authCtx.email;
                const response = await fetchReports(email);
                setReports(response);
                setReportsDone(true);
            }catch(error){
                console.log(error);
            }
        }
        getReports();
    },[])

    function goBack(){
        navigation.goBack();
    }
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <IconButton
            onPress={goBack}
            icon="arrow-back"
            size={28}
            color="black"
          />
        </View>
        <Text style={styles.title}>Reports Made</Text>
        {!reportsDone ? (<LoadingScreen/> ) : (reports.length > 0 ? (
          <FlatList
            data={reports}
            renderItem={({ item }) => <ReportCard report={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.imageContainer}>
            <MaterialIcons
              name="report-off"
              color="black"
              size={100}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ alignSelf: "center" }}>No reports made!</Text>
          </View>
        ))}
      </View>
    );
}

const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F0F5F6'
    },
    topContent:{
        flexDirection:'row',
        marginTop: 40,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer:{
        marginTop: height/3,
    },
})

export default ReportsMade;