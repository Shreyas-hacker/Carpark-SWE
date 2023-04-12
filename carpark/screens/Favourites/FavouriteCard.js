import { Text,StyleSheet,View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


function FavouriteCard({favCarpark,removeFavourite,goMap}){
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <View style={[styles.card]}>
                <Text style={styles.title}>{favCarpark.car_park_no}</Text>
                <Text style={styles.text}>Address: {favCarpark.address}</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={removeFavourite}>
                        <MaterialIcons name="delete" size={30}/>
                    </TouchableOpacity>
                    <View style={{width:10}}/>
                    <TouchableOpacity onPress={goMap}>
                        <MaterialIcons name="map" size={30}/>
                    </TouchableOpacity>
                </View>
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
      borderColor: "#444444",
      borderWidth: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign:"left",
      color: "#444444",
      fontFamily: "OpenSans_700Bold",
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
      color: "#444444",
      fontFamily: "OpenSans_400Regular",
    },
    boldText: {
      fontWeight: "bold",
    },
    buttonRow:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop: 10,
    }
});

export default FavouriteCard;