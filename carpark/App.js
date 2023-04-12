import { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppLoading } from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

import Login from "./screens/Accounts/Login";
import CreateAccount from "./screens/Accounts/CreateAccount";
import CreateProfile from "./screens/Profile/CreateProfile";
import Home from "./screens/DisplayCarparks/Home";
import ForgetPassword from "./screens/Accounts/ForgetPassword";
import ReportFault from "./screens/ReportFault/ReportFault";
import Camera from "./screens/ReportFault/MediaFunction";
import DisplayCarpark from "./screens/DisplayCarparks/DisplayCarparks";
import ChangePassword from "./screens/Accounts/ChangePassword";
import EditProfile from "./screens/Profile/EditProfile";
import Favourite from "./screens/Favourites/Favourite";
import ReportsMade from "./screens/Profile/ReportsMade";

import MyTabs from "./screens/Tabs";
import AuthContextProvider, { AuthContext } from "./store/context/user-context";


import { useFonts, OpenSans_800ExtraBold, OpenSans_300Light_Italic,OpenSans_700Bold,OpenSans_400Regular, } from '@expo-google-fonts/open-sans';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>  
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ReportFault" component={ReportFault} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen
        name="DisplayCarpark"
        component={DisplayCarpark}
        options={{
          presentation:"modal",
        }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ReportsMade" component={ReportsMade} />
      <Stack.Screen name="Favourite" component={Favourite} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && (
          <AuthenticatedStack />
      )}
    </NavigationContainer>
  );
}
export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_700Bold,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
