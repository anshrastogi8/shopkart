import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { clearAuthData, getAuthDetails, getToken } from './utils/AuthStorage';
import { useCart } from './contexts/CartContext';
import axios from 'axios';
import { BASE_URL } from './utils/ApiConfig';
import { commonHeader, header } from './utils/HeadersConfig';

export default function Account() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const { cart,dispatch } = useCart()

  const userInfo =async ()=>{
    try{
      const token = await getToken();
      const header = commonHeader(token);
      const result = await axios.get(BASE_URL+"/auth/me",header)

      if(result.status === 200){
        setUser(result.data)
      }
    }catch(error){
      console.log(error.response);
      
    }
  }

  const fetchUser = async () => {
    const { user } = await getAuthDetails();
    setUser(user);
  };

  useLayoutEffect(() => {
   // fetchUser();
   userInfo()
  }, [navigation]);

  const handleLogout = async () => {
    await clearAuthData();
    dispatch({ type: "CLEAR_CART" }); 
    setUser(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F7FA' }}>
      {!user ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E2E8F0',
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              marginTop: 8,
              padding: 8,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <MaterialCommunityIcons
              name="account-outline"
              color="#0E2A3D"
              size={96}
            />
          </View>
          <Pressable
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            margin: 2,
          }}
        >
          <MaterialCommunityIcons
            name="account-circle"
            color="#0E2A3D"
            size={96}
          />
          <Text style={{ paddingHorizontal: 16, fontSize: 20 }}>
            {user.fullName}
          </Text>
        </View>
      )}

      <View style={styles.orders}>
        <Pressable style={styles.orderIconContainer}>
          <Entypo name="box" size={28} color="#000000" />
          <Text style={styles.orderText}>Orders</Text>
        </Pressable>

        <Pressable style={styles.orderIconContainer}>
          <FontAwesome5 name="hands-helping" size={28} color="#000000" />
          <Text style={styles.orderText}>Help Center</Text>
        </Pressable>

        <Pressable style={styles.orderIconContainer}>
          <Entypo name="heart" size={28} color="#000000" />
          <Text style={styles.orderText}>Wishlist</Text>
        </Pressable>

        <Pressable style={styles.orderIconContainer}>
          <Ionicons name="settings-sharp" size={26} color="#000000" />
          <Text style={styles.orderText}>Settings</Text>
        </Pressable>
      </View>

      <View style={styles.terms}>
        <Pressable>
          <Text style={styles.termText}>FAQs</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.termText}>ABOUT US</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.termText}>TERMS OF USE </Text>
        </Pressable>

        <Pressable>
          <Text style={styles.termText}>PRIVACY POLICY</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.termText}>GRIEVANCE REDRESSAL</Text>
        </Pressable>
      </View>

      {user && (
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      )}

      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          marginTop: 50,
          fontSize: 14,
        }}
      >
        @2025, All Rights Reversed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  orderText: {
    fontSize: 18,
    padding: 12,
    color: '#000000',
  },
  orders: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  terms: {
    backgroundColor: '#F8FAFC',
    margin: 16,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  termText: {
    fontSize: 15,
    color: '#6B7C8C',
    fontWeight: '600',
    letterSpacing: 0.2,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loginBtn: {
    backgroundColor: '#0E2A3D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 48,
    width: 140,
    borderRadius: 12,
  },
  loginText: {
    fontSize: 20,
    padding: 4,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  orderIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  logoutBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
    marginBottom: 0,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
