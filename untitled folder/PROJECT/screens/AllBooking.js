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

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const handleBookHall = async () => {
    // Show prompt to enter username
    setIsPromptVisible(true);
  };
  const handleCheckUsername = async (hallName, hallDescription) => {
    if (!username) {
      Alert.alert("Validation Error", "Please enter your username.");
      return;
    }

    try {
      // Check if username exists by sending a request to the backend
      const response = await fetch("http://192.168.100.16:5001/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert("Sucess",  "Username found.");
        // User exists, proceed with booking
        let name=data.message;
    
         bookHallForUser(name,hallName,hallDescription);
      } else {
        // Username does not exist
        Alert.alert("Error", data.message || "Username not found.");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      Alert.alert("Error", "Failed to check username. Please try again.");
    }
  };


  const bookHallForUser = async (username,hallName,hallDescription) => {
    try {
      const response = await fetch("http://192.168.100.16:5001/book-hall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          hallName,
          hallDescription,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Success", "Hall booked successfully for " + username);
      } else {
        Alert.alert("Error", data.message || "Unexpected error");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      Alert.alert("Error", "Failed to book hall. Please try again.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://192.168.100.16:5001/bookings");
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
      <TouchableOpacity style={styles.button} onPress={handleBookHall}>
        <Text style={styles.buttonText}>Book Hall</Text>
      </TouchableOpacity>
      {isPromptVisible && (
        <View style={styles.container1}>
          <TextInput
            style={styles.input1}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity style={styles.button1} onPress={()=>handleCheckUsername(item.hallName,item.hallDescription)}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
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
  container1: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 8,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input1: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button1: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default BookingsPage;
