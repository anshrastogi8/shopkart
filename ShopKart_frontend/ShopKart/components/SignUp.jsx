import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { saveAuthDetails } from './utils/AuthStorage';
import {BASE_URL} from './utils/ApiConfig'
import { header } from './utils/HeadersConfig'

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const registerUser = async () => {
    try {
      const result = await axios.post(BASE_URL+'/auth/signup', {
        fullName,
        email,
        password,
      },header);
      if (result.status === 200) {
        setErrors({});
        await saveAuthDetails(result.data.token);
        navigation.navigate('TabNavigation')
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data);
        setErrors({ api: error.response.data });
      }
    }
  };

  function handleValidation() {
    let error = {};

    if (!fullName || fullName.trim() === '') {
      error.name = 'Name is required';
    } else if (!/^[A-Z][a-zA-Z-' ]+$/.test(fullName)) {
      error.name = 'Invalid name format';
    }

    if (!email || email.trim() === '') {
      error.email = 'Email is required';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      error.email = 'Invalid email format';
    }

    if (!password || password.trim() === '') {
      error.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
        password,
      )
    ) {
      error.password =
        ' Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      error.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      error.confirmPassword = 'Passwords do not match';
    }

    setErrors(error);

    if (Object.keys(error).length === 0) {
      registerUser();
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Welcome! Please enter you details</Text>
        <View style={{ margin: 10, padding: 10 }}>
          <Text style={styles.label}> Name</Text>
          <View style={styles.input}>
            <Ionicons
              name="person-outline"
              size={18}
              color="#6b6d71ff"
              style={{ marginHorizontal: 10 }}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#6b6d71ff"
              style={styles.inputText}
              onChangeText={text => setFullName(text)}
              value={fullName}
            />
          </View>

          {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

          <Text style={[styles.label]}> Email</Text>
          <View style={styles.input}>
            <Ionicons
              name="mail-outline"
              size={18}
              color="#6b6d71ff"
              style={{ marginHorizontal: 10 }}
            />
            <TextInput
              placeholder="your@example.com"
              placeholderTextColor="#6b6d71ff"
              style={styles.inputText}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>

          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

          <Text style={[styles.label]}>Password</Text>
          <View style={styles.input}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color="#6b6d71ff"
              style={{ marginHorizontal: 10 }}
            />
            <TextInput
              placeholder="******"
              placeholderTextColor="#6b6d71ff"
              secureTextEntry
              onChangeText={text => setPassword(text)}
              style={[styles.inputText]}
              value={password}
            />
          </View>
          {errors.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={18} color="#6b6d71" style={{ marginHorizontal: 10 }} />
            <TextInput
              placeholder="Re-enter Password"
              placeholderTextColor="#6b6d71"
              secureTextEntry
              style={styles.inputText}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        </View>

        {errors.api && (
          <Text style={{ color: 'red', marginBottom: 10, marginLeft: 25 }}>
            {errors.api}
          </Text>
        )}

        <Pressable style={styles.btn} onPress={handleValidation}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <View style={styles.line} />
          <View>
            <Text>Or Sign up with</Text>
          </View>
          <View style={styles.line} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            marginTop: 20,
            marginBottom:10
          }}
        >
          <Pressable style={styles.icon}>
            <Ionicons name="logo-apple" size={26} />
          </Pressable>

          <Pressable style={styles.icon}>
            <Ionicons name="logo-google" size={26} color="#008744" />
          </Pressable>

          <Pressable style={styles.icon}>
            <Ionicons name="logo-facebook" size={26} color="#1877F2" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 20,
    color: '#111827',
  },
  subtitle: {
    marginTop: 5,
    color: '#6B7280',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7ea5f4ff',
    padding: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputText: {
    color: '#111827',
  },
  btn: {
    backgroundColor: '#0E2A3D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    margin: 16,
    marginTop:0
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
  },
});
