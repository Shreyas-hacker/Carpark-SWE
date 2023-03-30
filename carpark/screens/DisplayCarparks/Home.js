import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/context/user-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function HomeScreen({ navigation }) {
  const API_KEY = "AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk";
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [displayName, setDisplayName] = useState("");
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
    <View style={styles.container}>
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
          style={styles.button}
          onPress={() => navigation.navigate("DisplayCarpark")}
        >
          <MaterialIcons name="map" color="#ffffff" size={24} />
          <Text style={styles.buttonText}>Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ReportFault")}
        >
          <MaterialIcons name="report-problem" color="#ffffff" size={24} />
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate()}
        >
          <MaterialIcons name="favorite" color="#ffffff" size={24} />
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 28,
    paddingVertical: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  displayNameText: {
    fontSize: 24,
    color: "#333333",
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
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3f51b5",
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
  },
});
