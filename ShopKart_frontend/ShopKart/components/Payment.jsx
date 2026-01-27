import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { useCart } from './contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from './utils/ApiConfig';
import { getToken } from './utils/AuthStorage';
import { commonHeader } from './utils/HeadersConfig';

const PAYMETHODS = [
  { key: 'COD', label: 'Cash on Delivery', subtitle: 'Pay when it arrives' },
  { key: 'UPI', label: 'UPI', subtitle: 'GPay, Paytm, PhonePe, BHIM' },
  {
    key: 'Card',
    label: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, RuPay',
  },
];

export default function Payment({ route }) {
  const { cart, totalPrice, dispatch } = useCart();
  const { addressId, address, addressPresent } = route.params;

  const handlePayment =  () => {
     placeOrder();
  };

  const [method, setMethod] = useState('COD');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const navigation = useNavigation();

  const handleCardDetils = ({ name, text }) => {
    setCardDetails(prev => ({ ...prev, [name]: text }));
  };

  // const subTotal = cart.reduce(
  //   (sum, item) => sum + item.unitPrice * item.quantity,
  //   0,
  // );

  const subTotal = totalPrice

  const shipping = subTotal >= 500 ? 0 : 49;
  const tax = subTotal * 0.18;
  const total = subTotal + shipping + tax;

  const placeOrderData = {
    addressId: addressId,
    address: address,
    addressPresent: addressPresent,
    totalAmount: total,
    taxAmount: tax,
    shippingAmount: shipping,
    paymentMethod: method,
  };

  const placeOrder = async () => {
    try {
      const token = await getToken();
      const header = commonHeader(token);
      const result = await axios.post(
        BASE_URL + '/order/place',
        placeOrderData,
        header
      );
      if (result.status == 200) {
        dispatch({ type: 'CLEAR_CART' }); 
        navigation.navigate('OrderConfirmation', result.data);
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Payment Type</Text>

      <ScrollView style={styles.paymentContainer}>
        {PAYMETHODS.map((item, index) => {
          const selectedPayment = method === item.key;
          return (
            <View>
              <Pressable
                key={item.key}
                style={[
                  styles.paymentOptionCard,
                  selectedPayment && styles.selectedPayment,
                ]}
                onPress={() => setMethod(item.key)}
              >
                <View>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    {item.label}
                  </Text>
                  <Text
                    style={{ fontSize: 13, color: '#786c6cff', marginTop: 4 }}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </Pressable>

              {selectedPayment && item.key === 'UPI' && (
                <View style={styles.paymentExpand}>
                  <Text style={styles.label}>UPI ID</Text>
                  <TextInput
                    placeholder="name@bank"
                    autoCorrect={false}
                    style={styles.input}
                    value={upiId}
                    placeholderTextColor="#797d84ff"
                    onChangeText={text => setUpiId(text)}
                  />
                </View>
              )}

              {selectedPayment && item.key === 'Card' && (
                <View style={styles.paymentExpand}>
                  <Text style={styles.label}>Name on Card</Text>
                  <TextInput
                    placeholder="Name"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={text =>
                      handleCardDetils({ name: 'name', text })
                    }
                    placeholderTextColor="#797d84ff"
                  />

                  <Text style={[styles.label, { marginTop: 8 }]}>
                    Card Number
                  </Text>
                  <TextInput
                    placeholder="Card Number"
                    autoCorrect={false}
                    onChangeText={text =>
                      handleCardDetils({ name: 'number', text })
                    }
                    style={styles.input}
                    placeholderTextColor="#797d84ff"
                  />

                  <View style={{ marginTop: 8, flexDirection: 'row', gap: 16 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.label, { marginTop: 8 }]}>
                        Expiry
                      </Text>
                      <TextInput
                        placeholder="Card Expiry"
                        keyboardType="numeric"
                        onChangeText={text =>
                          handleCardDetils({ name: 'expiry', text })
                        }
                        autoCorrect={false}
                        style={styles.input}
                        placeholderTextColor="#797d84ff"
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={[styles.label, { marginTop: 8 }]}>CVV</Text>
                      <TextInput
                        placeholder="Card CVV"
                        autoCorrect={false}
                        secureTextEntry
                        onChangeText={text =>
                          handleCardDetils({ name: 'cvv', text })
                        }
                        style={styles.input}
                        placeholderTextColor="#797d84ff"
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.summaryTotal}>
        <View style={styles.summaryRow}>
          <Text style={{ color: '#555' }}>Subtotal</Text>
          <Text>₹ {subTotal}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={{ color: '#555' }}>Shipping</Text>
          <Text>{shipping === 0 ? 'Free' : `₹ ${shipping}`}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={{ color: '#555' }}>Tax (18%)</Text>
          <Text>₹ {tax}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₹ {total}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handlePayment}>
        <Text style={styles.btnText}>Pay & Place Order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 12,
  },
  heading: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentContainer: {
    marginTop: 12,
  },
  paymentOptionCard: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginHorizontal: 2,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderWidth: 2,
    elevation: 4,
  },
  selectedPayment: {
    borderColor: '#2E7D32',
  },
  paymentExpand: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginTop: 8,
    borderColor: '#EFEFEF',
  },
  label: {
    fontSize: 14,
    paddingHorizontal: 4,
    fontWeight: '600',
    color: '#2e3746ff',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    fontSize: 14,
  },
  button: {
    marginTop: 14,
    backgroundColor: '#2E7D32',
    marginBottom: 12,
    borderRadius: 12,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    padding: 10,
    color: '#ffffff',
  },
  summaryTotal: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E6E6E6',
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
