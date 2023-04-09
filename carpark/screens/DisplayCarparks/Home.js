import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/context/user-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadingScreen from "../../components/LoadingScreen";
import CarparkBackground from "../../assets/CarparkBackground.jpg";
import { searchCarpark } from "./SearchCarpark";
import useLoadFonts from '../../util/fonts/loadfont';

function HomeScreen({ navigation }) {
  const API_KEY = "AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk";
  const authCtx = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useLoadFonts();

  useEffect(() => {
    const token = authCtx.token;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
    async function getDisplayName() {
      const response = await axios
        .post(url, { idToken: token })
        .then((response) => {
          if (!authCtx.display_name) {
            setDisplayName(response.data.users[0].displayName);
          } else {
            setDisplayName(authCtx.display_name);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    getDisplayName();
  });

  return displayName ? (
    <View style={styles.container}>
      <ImageBackground
        source={CarparkBackground}
        style={styles.backgroundimage}
      ></ImageBackground>
      <View style={styles.rowShown}>
        <View style={styles.header}>
          <Text style={[styles.headerText]}>Hello!</Text>
          <Text style={[styles.displayNameText]}>{displayName}</Text>
        </View>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("DisplayCarpark")}
        >
          <MaterialIcons name="map" color="black" size={24} />
          <Text style={[styles.buttonText]}>Map</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for carpark"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onSubmitEditing={() => {
            searchCarpark(searchText, setSearchResults);
            navigation.navigate({
              name: "DisplayCarpark",
              params: {
                searchTerm: searchText,
                filteredCarparks: searchResults,
              },
              merge: true,
            });
          }}
        />
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate("Favourite")}
        >
          <MaterialIcons name="favorite" color="deeppink" size={24} />
          <Text style={[styles.buttonText]}>Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <LoadingScreen />
  );
}

export default HomeScreen;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundimage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: height / 4,
    opacity: 0.4,
  },
  rowShown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    marginTop: height / 10,
  },
  header: {
    marginLeft: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    fontFamily: "OpenSans-BoldItalic"
  },
  displayNameText: {
    fontSize: 20,
    color: "black",
  },
  button1: {
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 28,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: width / 2,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  searchBar: {
    marginTop: height / 4 - 20,
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 20,
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
    height: 50,
    fontSize: 20,
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
});
