import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  Animated,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/context/user-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadingScreen from "../../components/LoadingScreen";
import CarparkBackground from "../../assets/CarparkBackground.jpg";
import { searchCarpark } from "./SearchCarpark";
import ShowFaults from "../Home/ShowFaults";

function HomeScreen({ navigation }) {
  const API_KEY = "AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk";
  const authCtx = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [faultCardOpacity] = useState(new Animated.Value(0));
  const [faultCard, setFaultCard] = useState(false);
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = authCtx.token;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

    async function getDisplayName() {
      const response = await axios
        .post(url, { idToken: token })
        .then((response) => {
          if (!authCtx.display_name) {
            setDisplayName(response.data.users[0].displayName);
            authCtx.handleDisplayName(response.data.users[0].displayName);
          } else {
            setDisplayName(authCtx.display_name);
          }
          if (!authCtx.email) {
            setEmail(response.data.users[0].email);
          } else {
            setEmail(authCtx.email);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    getDisplayName();
  }, []);

  const focusListener = navigation.addListener("focus", () => {
    setFaultCard((prevState) => true);
    setDisplayName(authCtx.display_name);
  });

  const blurListener = navigation.addListener("blur", () => {
    setFaultCard((prevState) => false);
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
          <Text style={[styles.displayNameText]} numberOfLines={1}>
            {displayName}
          </Text>
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
          placeholder="Search for carparks"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onSubmitEditing={() => {
            searchCarpark(searchText, setSearchResults);
            navigation.navigate({
              name: "DisplayCarpark",
              params: {
                searchTerm: searchText,
              },
              merge: true,
            });
          }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.reportText}>Carparks to avoid:</Text>
        {loading ? (
          <LoadingScreen />
        ) : (
          <ShowFaults key={faultCard.toString()} faults={faults} />
        )}
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
    marginLeft: 25,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    fontFamily: "OpenSans_700Bold",
  },
  displayNameText: {
    fontSize: 20,
    color: "black",
    width: 120,
    fontFamily: "OpenSans_600SemiBold",
  },
  button1: {
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 28,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: width / 3 + 30,
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
    fontSize: 18,
    fontFamily: "OpenSans_400Regular",
  },
  body: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderTopColor: "#DEDCDC",
    borderTopWidth: 1,
  },
  reportText: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
