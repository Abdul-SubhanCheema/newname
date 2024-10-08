import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7C5CC',
  },
  text: {
    fontSize: hp(4),
    fontWeight: 'bold',
  },
  input: {
    fontSize: hp(2),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: wp(90),
    marginTop: hp(3),
    padding: wp(2),
  },
  button: {
    marginTop: hp(3),
    width: wp(30),
    backgroundColor: '#CC313D',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  buttonText: {
    color: 'white',
    fontSize: hp(2),
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  loginText: {
    fontSize: hp(2),
  },
  loginLink: {
    fontSize: hp(2),
    color: '#CC313D', 
    fontWeight: 'bold',
  },
});

export default HomeScreen;
