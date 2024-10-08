import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminHomeScreen from "./adminhome";
import ProfileScreen from "./profile";
import CustomDrawerContent from "./customerdrawer";
import AddBooking from "./Addbooking";
import AdminallBooking from "./adminallbooking";

const Drawer = createDrawerNavigator();

const AdminDrawerNavigator = ({navigation}) => {
  const handlelogout=()=>{
    navigation.navigate("Login")
  }
  return (
    <Drawer.Navigator
      initialRouteName="Admin Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen name="Admin Home" component={AdminHomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Booking" component={AddBooking} />
      <Drawer.Screen name="All Halls details" component={AdminallBooking} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;
