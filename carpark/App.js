import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Accounts/Login'
import CreateAccount from './screens/Accounts/CreateAccount';
import Home from './screens/DisplayCarparks/Home';
import ForgetPassword from './screens/Password/ForgetPassword';
import ReportFault from './screens/ReportFault';
import DisplayCarpark from './screens/DisplayCarparks/DCarpark';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='CreateAccount' component={CreateAccount}/>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
        <Stack.Screen name='ReportFault' component={ReportFault} />
        <Stack.Screen name='DisplayCarpark' component={DisplayCarpark} options={{
          presentation: 'modal'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
