
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './screens/start';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import AdminDrawerNavigator from './screens/admindrawer';
import UserDrawerNavigator from './screens/userdrawer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserHome" component={UserDrawerNavigator} />
        <Stack.Screen name="AdminHome" component={AdminDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
