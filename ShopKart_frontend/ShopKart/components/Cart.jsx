import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCart } from './contexts/CartContext';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonHeader } from './utils/HeadersConfig';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/ApiConfig';
import { getToken, getUser } from './utils/AuthStorage';

export default function () {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, dispatch } = useCart();

  const user = async () => {
    try {
      const us = await getUser();
      return us;
    } catch (error) {}
  };

  const getCart = async () => {
    try {
      const token = await getToken();
      const header = commonHeader(token);
      const res = await axios.get(BASE_URL + '/cart/view', header);

      if (res.status === 200) {
        setCartItems(res.data.items);
        setTotalPrice(res.data.totalPrice || 0);
      }
    } catch (error) {
      if(error.response.status === 403){
        navigation.navigate('Login')
      }
      console.log('Error adding to cart:', error.response?.data || error.message);
    }
  };

  const updateQuantity = async (cartItemId, newQty) => {
    if (newQty < 0) return;
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item,
      ),
    );

    try {
      const token = await getToken();
      const header = commonHeader(token);
      const res = await axios.post(
        BASE_URL + '/cart/updateQuantity',
        { cartItemId, quantity: newQty },
        header,
      );
      if (res.status === 200) {
        setCartItems(res.data.items);
        setTotalPrice(res.data.totalPrice);
      }
    } catch (err) {
      console.log(
        'Error updating quantity:',
        err.response?.data || err.message,
      );
    }
  };

  const removeFromCart = async cartItemId => {
    try {
      const token = await getToken();
      const header = commonHeader(token);
      const res = await axios.delete(
        BASE_URL + `/cart/delete/${cartItemId}`,
        header,
      );
      if (res.status === 200) {
        setCartItems(res.data.items);
        setTotalPrice(res.data.totalPrice || 0);
      }
    } catch (err) {
      console.log(
        'Error updating quantity:',
        err.response?.data || err.message,
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCart();
    }, []),
  );

  const setItems = () => {
    dispatch({ type: 'SET_CART', payload: cartItems });
  };

  useEffect(() => {
    setItems();
  }, [cartItems]);

  // const removeFromCart = key => {
  //   dispatch({ type: 'REMOVE_FROM_CART', payload: key });
  // };

  // const updateQuantity = (key, newQty) => {
  //   dispatch({
  //     type: 'UPDATE_CART_QUANTITY',
  //     payload: { key, quantity: newQty },
  //   });
  // };

  // const totalPrice = cart.reduce(
  //   (sum, item) => sum + item.product.price * item.quantity,
  //   0,
  // );

  const handleCheckout = async () => {
    setItems();
    navigation.navigate('Checkout');
  };
  const CartItem = ({ item }) => {
    return (
      <View style={styles.cartContainer}>
        <Image source={{ uri: item.productImage }} style={styles.image} />

        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.productTitle}
          </Text>
          <Text style={{ fontSize: 13, color: '#555', marginVertical: 2 }}>
            Size: {item.variantSize}| Color: {item.variantColor}
          </Text>
          <Text style={styles.price}>₹ {item.unitPrice}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
            >
              <MaterialCommunityIcons name="minus" size={20} color="#fff" />
            </Pressable>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <Pressable
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => removeFromCart(item.cartItemId)}
          style={{ padding: 6 }}
        >
          <MaterialCommunityIcons name="delete" size={26} color="#dc2626" />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {cartItems?.length === 0 || cartItems === undefined ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, color: '#777' }}>
            Your cart is empty.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.cartItemId.toString()}
            renderItem={CartItem}
            contentContainerStyle={{ marginBottom: 10, paddingBottom: 100 }}
          />
          <View style={styles.checkoutContainer}>
            <Text style={styles.totalText}>
              Total: ₹ {totalPrice?.toFixed(2)}
            </Text>
            <Pressable
              style={styles.checkoutBtn}
              onPress={() => {
                handleCheckout();
              }}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#763636ff',
    backgroundColor: '#fff',
    // margin:5
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  qtyBtn: {
    backgroundColor: '#111827',
    padding: 2,
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  checkoutBtn: {
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
