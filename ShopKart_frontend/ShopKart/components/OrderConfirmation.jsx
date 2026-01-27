import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCart } from './contexts/CartContext';

export default function OrderConfirmation({ route, navigation }) {
  const { id, address, totalAmount } = route.params;
  const { firstName, lastName, phone, flat, area,state, city, pincode,country } = address;
  const [orderId, setOrderId] = useState();

  const { cart, dispatch } = useCart();

  useEffect(() => {
    navigation.setOptions({ title: 'Order Details' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="check-circle" size={80} color="#16a34a" />
      <Text style={styles.heading}>Order Placed Successfully!</Text>
      <Text style={[styles.subText, { fontWeight: 'bold', fontSize: 18 }]}>
        OrderId #{id}.
      </Text>
      <Text style={styles.subText}><Text style={{fontWeight: 'bold',fontSize: 18}}>Billing Name: </Text>{firstName} {lastName}</Text>
      <Text style={styles.subText}><Text style={{fontWeight: 'bold',fontSize: 18}}>Contact Number: </Text>{phone}</Text>
      <Text style={styles.subText}><Text style={{fontWeight: 'bold',fontSize: 18}}>Shipping to: </Text>{flat}, {area}</Text>
      <Text style={styles.subText}>{city}, {state} - {pincode} - {country}</Text>
      <Text style={styles.total}>Amount Paid: ₹{totalAmount} </Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('TabNavigation');
          dispatch({ type: 'CLEAR_CART' });
        }}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
