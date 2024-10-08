import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { format } from 'date-fns';

const PastBooking = () => {
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBookings = async () => {
    if (!username) {
      Alert.alert("Validation Error", "Please enter your username.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://192.168.100.16:5001/user-bookings/${username}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert("Success", "Booking data found");
        setBookings(data.bookings || []);
      } else {
        Alert.alert(
          "Error",
          data.message || "No bookings found for this username."
        );
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", "Failed to fetch bookings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookingItem = ({ item }) => {
    const formattedDate = format(new Date(item.time), "dd/MM/yyyy");
  
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.hallName}>Hall Name: {item.hallName}</Text>
        <Text style={styles.hallDescription}>Description: {item.hallDescription}</Text>
        <Text style={styles.hallDescription}>Booking Date: {formattedDate}</Text>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Username to View Bookings</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleCheckBookings}>
        <Text style={styles.buttonText}>Check Bookings</Text>
      </TouchableOpacity>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7C5CC",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#CC313D",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#CC313D",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
  },
  hallName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
  },
  hallDescription: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
});

export default PastBooking;
