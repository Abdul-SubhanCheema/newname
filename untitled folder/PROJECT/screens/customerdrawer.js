import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

function CustomDrawerContent(props) {
  const handleLogout = (e) => {
    e.preventDefault();

    props.navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate("Admin Home")}
        />
        <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate("Profile")}
        />
        <DrawerItem
          label="Add Booking"
          onPress={() => props.navigation.navigate("Booking")}
        />
        <DrawerItem
          label="Hall Details"
          onPress={() => props.navigation.navigate("All Halls details")}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  logoutButton: {
    marginTop: "auto",
    padding: 16,
    backgroundColor: "#CC313D",
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CustomDrawerContent;
