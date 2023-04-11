import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import LoadingScreen from "../../components/LoadingScreen";
import LongButton from "../../components/LongButton";
import PrimaryButton from "../../components/PrimaryButton";
import { AuthContext } from "../../store/context/user-context";
import ProfilePicture from "../../assets/ProfilePicture.png";
import { StatusBar } from "expo-status-bar";

function Profile({ navigation }) {
  const authCtx = useContext(AuthContext);
  const API_KEY = "AIzaSyCX5cIGMG23hoatqCPLZnSQJX_6klMLbRk";
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);

    useEffect(()=>{
        const token = authCtx.token;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
        async function getDisplayName(){
            const response = await axios.post(url,{idToken:token}).then((response)=>{
                if(!authCtx.display_name){
                    setDisplayName(response.data.users[0].displayName);
                }else{
                    setDisplayName(authCtx.display_name);
                }
                setEmail(authCtx.email)
            }).catch((error)=>{
                console.log(error.message)
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    getDisplayName();
  });

  function LogOut() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: () => {
          authCtx.logout();
        },
      },
    ]);
  }
  return (
    <>
      <StatusBar />
      {displayName && email ? (
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <View style={styles.profileContainer}>
            <Image
              source={ProfilePicture}
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
            />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.textStyle}>{displayName}</Text>
              <Text style={styles.emailStyle}>{email}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <LongButton
              text="Edit Profile"
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            />
            <LongButton
              text="Change Password"
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            />
            <LongButton
              text="View Reports Made"
              onPress={() => {
                navigation.navigate("ReportsMade");
              }}
            />
            <LongButton
              text="Favourite"
              onPress={() => {
                navigation.navigate("Favourite");
              }}
            />
            <PrimaryButton
              text={"Log Out"}
              onSuccess={true}
              onAttempt={LogOut}
            />
          </View>
        </View>
      ) : (
        <LoadingScreen navigation={navigation} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    marginTop: 100,
    marginLeft: 5,
    padding: 20,
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 50,
  },
  emailStyle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 50,
  },
  buttonContainer: {
    backgroundColor: "#F0F5F6",
    flex: 1,
  },
});
export default Profile;
