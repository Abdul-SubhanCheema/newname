import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

const AdminallBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);
  const handleUnbookHall = async (hallId) => {
    try {
      const response = await fetch(`http://192.168.100.16:5001/unbook-hall/${hallId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        Alert.alert("Success", data.message);
        // Optionally, update the UI or refresh bookings after successful unbooking
        fetchBookings();
      } else {
        Alert.alert("Error", data.message || "Failed to unbook the hall.");
      }
    } catch (error) {
      console.error("Error unbooking hall:", error);
      Alert.alert("Error", "Failed to unbook the hall. Please try again.");
    }
  };
  
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://192.168.100.16:5001/allbookings");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.hallName}>{item.hallName}</Text>
      <Text style={styles.hallDescription}>{item.hallDescription}</Text>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      ) : null}
      <Text style={styles.hallDescription}>
        Status: {item.isBooked ? "Booked" : "Available"}
      </Text>
      {item.isBooked && (
        <TouchableOpacity style={styles.button} onPress={()=>handleUnbookHall(item._id)}>
          <Text style={styles.buttonText}>Unbook</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    Alert.alert("Error", error);
    return null;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7C5CC",
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
    marginTop: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#F7C5CC",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default AdminallBooking;
