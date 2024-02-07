import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { signUp } from 'aws-amplify/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    console.log('data received:', data);
    if (!data.username || !data.password || !data.confirmPassword || !data.email || !data.storeName) {
      console.error('Please fill in all the required fields');
      return;
    }

    if (data.password !== data.confirmPassword) {
      console.error('Password and Confirm Password do not match');
      return;
    }

    console.log('start');
    try {
      console.log('try');
      console.log(data.username)
      const username=data.username;
      const password=data.password;
      const email=data.email;
      const user = await signUp({
        username,
        password,
      options: {
        userAttributes: {
          email,
          
        },
      }
      });
      
      console.log('Sign-up success', user);
      navigation.navigate('ConfirmSignUp', { username: data.username });
    } catch (error) {
      console.log('error block');
      console.error('Sign-up error', error);
    }
  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity style={styles.arrowLeftContainer} onPress={() => navigation.goBack()}>
            <Ionic size={24} style={{ right: 5 }} color={COLORS.primary} name="chevron-back-outline" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={require('../assets/images/signup.png')} />
        </View>
      </SafeAreaView>
      <Animated.View style={styles.formContainer} entering={FadeInDown.duration(1000).springify()}>
        <View style={styles.form}>
          <Text style={styles.formText}>Username</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={styles.formInput} {...field} onChangeText={field.onChange} value={field.value} />}
            name="username"
            defaultValue=""
          />
          {errors.username && <Text style={{ color: 'red' }}>This field is required</Text>}

          <Text style={styles.formText}>Email Address</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={styles.formInput} {...field} onChangeText={field.onChange} value={field.value}/>}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text style={{ color: 'red' }}>This field is required</Text>}

          <Text style={styles.formText}>Password</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={[styles.formInput, styles.passwordInput]} onChangeText={field.onChange} value={field.value} secureTextEntry {...field} />}
            name="password"
            defaultValue=""
          />
          {errors.password && <Text style={{ color: 'red' }}>This field is required</Text>}

          <Text style={styles.formText}>Confirm Password</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={[styles.formInput, styles.passwordInput]} onChangeText={field.onChange} value={field.value} secureTextEntry {...field} />}
            name="confirmPassword"
            defaultValue=""
          />
          {errors.confirmPassword && <Text style={{ color: 'red' }}>This field is required</Text>}

          <Text style={styles.formText}>Store Name</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={styles.formInput} {...field} onChangeText={field.onChange} value={field.value} />}
            name="storeName"
            defaultValue=""
          />
          {errors.storeName && <Text style={{ color: 'red' }}>This field is required</Text>}
        </View>
        <View style={styles.signupButtonContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <Text style={styles.orText}>Or</Text>
        </View>
        <View style={styles.logosContainer}>
          <TouchableOpacity style={styles.socialIcons}><Image style={styles.icon} source={require("../assets/icons/google.png")} /></TouchableOpacity>
          <TouchableOpacity style={styles.socialIcons}><Image style={styles.icon} source={require("../assets/icons/apple.png")} /></TouchableOpacity>
          <TouchableOpacity style={styles.socialIcons}><Image style={styles.icon} source={require("../assets/icons/facebook.png")} /></TouchableOpacity>
        </View>
        <View style={styles.noAccountContainer}>
          <Text style={{ color: 'black', fontFamily: 'Poppins-Regular', fontSize: 13 }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#ffc200', marginLeft: 5, fontWeight: '500', fontFamily: 'Poppins-Medium', fontSize: 13 }}>Login</Text></TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#044244',
  },

  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  arrowLeftContainer: {
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFD700',
  },
  imageStyle: {
    height: 130, width: 130
  },
  formContainer: {
    flex: 2.5,
    backgroundColor: 'white',
    padding: 8,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  form: {
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  formText: {
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 13.5,

  },
  formInput: {
    height: 45,
    backgroundColor: 'rgba(180, 180, 180,0.4)',
    borderRadius: 10,
    marginBottom: 12,
    paddingLeft: 10,
    bottom: 3,
    color: 'black'
  },
  passwordInput: {
    marginBottom: 5,
  },

  signupButtonContainer: {
    flex: 0,
    alignItems: 'center'
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#FFD700',
    width: '85%',
    marginHorizontal: 20,
    borderRadius: 13,

  },
  signupText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    top: 2,
    color: '#044244',
  },
  orContainer: {
    flex: 0,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  orText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  logosContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 14,
  },
  socialIcons: {
    padding: 6,
    backgroundColor: 'rgba(180, 180, 180,0.3)',
    borderRadius: 10,
  },
  icon: {
    height: 36,
    width: 36
  },
  noAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 2,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 4,
  },
});
