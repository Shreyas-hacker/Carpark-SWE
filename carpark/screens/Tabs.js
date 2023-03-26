import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Accounts/Profile';
import Home from './DisplayCarparks/Home';
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#39D2C0',
        headerShown: false,
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({ color, size})=> <Ionicons name='home' color={color} size={size}/>
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon:({ color, size})=> <Ionicons name='person-circle' color={color} size={size}/>
      }}/>
    </Tab.Navigator>
  );
}