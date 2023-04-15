import { View,Text,StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ReportCard({report}){
    const colors = ["#FFFFFF", "#FFC107", "#FF0000"];
    const severity = ["Lighting", "Gantry Machine", "Barrier", "Others"];
  
    const backgroundColor = colors[report.severity-1];
    const faultType = severity[report.fault];

    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor }]}>
          <Text style={styles.title}>{report.carpark}</Text>
          <Text style={styles.text}>
            Address: <Text style={styles.boldText}>{report.address}</Text>
          </Text>
          <Text style={styles.text}>
            Fault Type: <Text style={styles.boldText}>{faultType}</Text>
          </Text>
          <Text style={styles.text}>
            Description:{" "}
            <Text style={styles.boldText}>{report.description}</Text>
          </Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      elevation: 5,
      maxWidth: 400,
      width: "90%",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
      color: "#444444",
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
      color: "#444444",
    },
    boldText: {
      fontWeight: "bold",
    },
  });

export default ReportCard;