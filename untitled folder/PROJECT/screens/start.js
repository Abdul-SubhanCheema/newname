import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Signup');
    }, 5000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Tesla_logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC313D',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default StartScreen;
