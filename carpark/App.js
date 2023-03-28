import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Accounts/Login";
import CreateAccount from "./screens/Accounts/CreateAccount";
import Home from "./screens/DisplayCarparks/Home";
import ForgetPassword from "./screens/Accounts/ForgetPassword";
import ReportFault from "./screens/ReportFault";
import DisplayCarpark from "./screens/DisplayCarparks/DCarpark";
import Kamera from "./screens/Kamera";
import { MyTabs } from "./screens/Tabs";
import { Camera } from "expo-camera";

const Stack = createNativeStackNavigator();

function AuthStack(){
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false, gestureEnabled: false }}/>
    </Stack.Navigator>
  )
}

function AuthenticatedStack(){
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ReportFault" component={ReportFault} />
      <Stack.Screen
        name="DisplayCarpark"
        component={DisplayCarpark}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation(){
  const authCtx = useContext(AuthContext);
  return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated &&<AuthenticatedStack/>}
      </NavigationContainer>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Tab"
          component={MyTabs}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ReportFault" component={ReportFault} />
        <Stack.Screen name="Camera" component={Kamera} />
        <Stack.Screen
          name="DisplayCarpark"
          component={DisplayCarpark}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
