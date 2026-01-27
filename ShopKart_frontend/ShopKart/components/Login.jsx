import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getToken, saveAuthDetails } from './utils/AuthStorage';
import { BASE_URL } from './utils/ApiConfig';
import Loader from './Loader';
import { commonHeader, header } from './utils/HeadersConfig';
import { useCart } from './contexts/CartContext';


 export const getViewCart = async (dispatch) => {
    try {
      const token = await getToken();
      const header = commonHeader(token);
      const res = await axios.get(BASE_URL + '/cart/view', header);

      if (res.status === 200) {        
        dispatch({type:"SET_CART",payload:res.data.items})
      }
    } catch (err) {
      console.log('Error adding to cart:', err.response?.data || err.message);
    }
  };

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const { cart,dispatch } = useCart();

  const loginUser = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        BASE_URL + '/auth/login',
        {
          email,
          password,
        },
        header,
      );
      if (result.status === 200) {
        await saveAuthDetails(result.data.token);
        await getViewCart(dispatch);
        navigation.navigate('TabNavigation');
        setLoading(false);
      }
    } catch (error) {
      if(error.response?.status === 403){
        Alert.alert("Invalid username or password")
      }
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          fontSize: 30,
          fontWeight: '700',
        }}
      >
        SHOPKART
      </Text>
      <View style={styles.card}>
        <Text style={styles.title}>Log in ✨</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please enter your details.
        </Text>

        <Text style={styles.label}> Email</Text>
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

        <Text style={[styles.label, { marginTop: '16' }]}>Password</Text>
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
            style={[styles.inputText, { textAlignVertical: 'center' }]}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>

        <Pressable style={{ paddingHorizontal: 4, marginTop: 4 }}>
          <Text
            style={{
              color: '#0E2A3D',
              fontWeight: '700',
              textAlign: 'right',
              fontSize: 15,
            }}
          >
            Forgot password ?
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={loginUser}>
        <Text style={styles.btnText}>Log in</Text>
      </Pressable>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginTop: 20,
          alignItems: 'center',
        }}
      >
        <View style={styles.line} />
        <View>
          <Text>Or log in with</Text>
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

      <Text style={{ textAlign: 'center', marginTop: 60 }}>
        Don't have an account ?{' '}
        <Text
          style={{ color: 'blue' }}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign up
        </Text>
      </Text>
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    color: '#6B7280',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    marginBottom: 4,
    paddingHorizontal: 1,
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
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    backgroundColor: '#13151aff',
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
