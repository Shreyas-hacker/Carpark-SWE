import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/context/user-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadingScreen from "../../components/LoadingScreen";
import CarparkBackground from "../../assets/CarparkBackground.jpg";

function HomeScreen({ navigation }) {
  const API_KEY = "AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk";
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [displayName, setDisplayName] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
    async function getDisplayName() {
      try {
        const response = await axios.post(url, { idToken: token });
        setDisplayName(response.data.users[0].displayName);
      } catch (error) {
        console.log(error.message);
        setDisplayName("Anonymous");
      }
    }
    getDisplayName();
  }, []);

  return (
    displayName ? (<View style={styles.container}>
      <ImageBackground
      source={CarparkBackground}
      style={styles.backgroundimage}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.displayNameText}>{displayName}</Text>
      </View>
      <View style={styles.searchBar}>
        <MaterialIcons
          name="search"
          color="#999999"
          size={24}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for car parks"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("DisplayCarpark")}
        >
          <MaterialIcons name="map" color="orange" size={24} />
          <Text style={styles.buttonText}>Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("ReportFault")}
        >
          <MaterialIcons name="report-problem" color="red" size={24} />
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate()}
        >
          <MaterialIcons name="favorite" color="deeppink" size={24} />
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>) : (<LoadingScreen navigation={navigation}/>)
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "black",//note here
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: "cover",
  },
  header: {
    backgroundColor: "#000000c0",//note here
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 50,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
  },
  displayNameText: {
    fontSize: 30,
    color: "white",
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 20,
  },
  button1: {
    backgroundColor: "palegreen",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button2: {
    backgroundColor: "gold",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button3: {
    backgroundColor: "pink",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
