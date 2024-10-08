import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
  const handleLogin = async () => {
    if (!password) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    if (passwordError) {
      Alert.alert(
        "Validation Error",
        "Please correct the errors before submitting"
      );
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.16:5001/login", {
        username,
        password,
      });

      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
        const redirectUrl = response.data.redirectUrl;
        navigation.navigate(redirectUrl);
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Does'nt have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.loginLink}>Sign up</Text>
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

export default LoginScreen;
