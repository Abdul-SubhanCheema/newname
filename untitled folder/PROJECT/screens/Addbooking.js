import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BookingPage = () => {
  const [hallName, setHallName] = useState("");
  const [hallDescription, setHallDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  // Request media library permissions
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    if (!hallName || !hallDescription || !imageUri) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.100.16:5001/add-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hallName,
          hallDescription,
          imageUri,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Success", data.message);
      } else {
        Alert.alert("Error", data.message || "Unexpected error");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      Alert.alert("Error", "Failed to add booking. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hall Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hall name"
        value={hallName}
        onChangeText={setHallName}
      />

      <Text style={styles.label}>Hall Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hall description"
        value={hallDescription}
        onChangeText={setHallDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Image:</Text>
      <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
        <Text style={styles.imageButtonText}>Choose Image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7C5CC",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderColor: "black",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  imageButton: {
    backgroundColor: "#CC313D",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: hp(2),
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#CC313D",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: hp(2),
  },
});

export default BookingPage;
