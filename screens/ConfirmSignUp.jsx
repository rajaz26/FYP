import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { confirmSignUp,resendSignUpCode } from 'aws-amplify/auth';

const ConfirmSignUp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [confirmationCode, setConfirmationCode] = useState('');
  const { username } = route.params; // Retrieve username from navigation params
  console.log(username);
  console.log(confirmationCode);
  const { control, handleSubmit, watch, setError, clearErrors } = useForm();

  const onConfirmPressed = async (username,code) => {
    console.log("username",username);
    console.log("code:",confirmationCode)
    try {
      await confirmSignUp({username,confirmationCode}
        );
      console.log('User confirmed successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error confirming sign up', error);
      Alert.alert('Error', error.message);
    }
  };

  const onResendPress = async (username) => {
    console.log("resend :",username)
    try {
      await resendSignUpCode({username});
      Alert.alert('Success', 'Code was resent to your email');
    } catch (error) {
      console.error('Error resending confirmation code', error);
      Alert.alert('Error', error.message);
    }
  };


  const onSignInPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity style={styles.arrowLeftContainer} onPress={() => navigation.goBack()}>
            <Ionic size={24} style={{ right: 5 }} color={COLORS.primary} name="chevron-back-outline" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.title}>Confirm your email</Text>
        <Text style={styles.subtitle}>Please enter the confirmation code sent to your email.</Text>
        {/* <Controller
          control={control}
          rules={{ required: 'Confirmation code is required' }}
          render={({ field }) => ( */}
            <TextInput
              style={styles.input}
              placeholder="Confirmation Code"
              onChangeText={setConfirmationCode} // Update code state as the user types
              value={confirmationCode}
            />
{/*             
          )}
          name="code"
          defaultValue=""
        /> */}
        <TouchableOpacity style={styles.button} onPress={() => onConfirmPressed(username,confirmationCode)}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => onResendPress(username)}>
          <Text style={styles.buttonText}>Resend code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.tertiaryButton]} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Back to Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#044244',
  },
  arrowLeftContainer: {
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFD700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
});
