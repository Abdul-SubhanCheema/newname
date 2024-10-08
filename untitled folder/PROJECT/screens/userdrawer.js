import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
import UserCustomDrawerContent from "./usercustomerdrawer";
import AllBooking from "./AllBooking";
import PastBooking from "./pastbookings";
const Drawer = createDrawerNavigator();

const UserDrawerNavigator = ({navigation}) => {
  const handlelogout=()=>{
    navigation.navigate("Login")
  }
  return (
    <Drawer.Navigator
      initialRouteName="Admin Home"
      drawerContent={(props) => <UserCustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#F7C5CC",
        },
        drawerType: 'slide',
        headerStyle: {
          backgroundColor: '#CC313D', 
        },
        headerTintColor: 'black',
        drawerActiveTintColor: '#CC313D',
        drawerLabelStyle: {
          fontSize: 16, 
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Available Hall" component={AllBooking} />
      <Drawer.Screen name="Past Bookings" component={PastBooking} />
      
    </Drawer.Navigator>
  );
};

export default UserDrawerNavigator;
