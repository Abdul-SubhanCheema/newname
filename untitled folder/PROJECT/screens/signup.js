import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    // Check minimum length
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    const hasUpperCase = /[A-Z]/.test(text);
    const hasLowerCase = /[a-z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setPasswordError(
        "Password must include upper case, lower case, number, and special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !password ) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }
    if (passwordError || emailError) {
      Alert.alert('Validation Error', 'Please correct the errors before submitting');
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.16:5001/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Success", response.data.message);
        
      } else {
        Alert.alert("Error", response.data.message || "Unexpected error");
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "Something went wrong"
        );
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response from the server. Please try again later."
        );
      } else {
        Alert.alert(
          "Error",
          "Error in setting up the request. Please try again later."
        );
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signup Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      
      />
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
       
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Password"
        value={password}
        onChangeText={validatePassword}
        secureTextEntry
        
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7C5CC",
  },
  text: {
    fontSize: hp(4),
    fontWeight: "bold",
  },
  input: {
    fontSize: hp(2),
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: wp(90),
    marginTop: hp(3),
    padding: wp(2),
  },
  button: {
    marginTop: hp(3),
    width: wp(30),
    backgroundColor: "#CC313D",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: hp(1.5),
  },
  buttonText: {
    color: "white",
    fontSize: hp(2),
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: hp(2),
  },
  loginText: {
    fontSize: hp(2),
  },
  loginLink: {
    fontSize: hp(2),
    color: "#CC313D",
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "#CC313D",
  },
  errorText: {
    color: "#CC313D",
    marginBottom: 10,
  },
});

export default SignupScreen;
