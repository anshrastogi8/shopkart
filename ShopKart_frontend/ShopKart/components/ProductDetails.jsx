import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useCart } from './contexts/CartContext';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getToken } from './utils/AuthStorage';
import axios, { toFormData } from 'axios';
import { BASE_URL } from './utils/ApiConfig';
import { commonHeader } from './utils/HeadersConfig';
import { getViewCart } from './Login';

export default function ProductDetails({ route }) {
  const productData = route.params;
  const navigation = useNavigation();
  const initialProduct = productData?.product || {};
  const sizes = [...new Set(initialProduct.variants?.map(v => v.size))];
  const colors = [...new Set(initialProduct.variants?.map(v => v.color))];
  const [product, setProduct] = useState({
    ...initialProduct,
    sizes,
    colors,
  });
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(colors?.[0] || null);
  const { cartCount, dispatch } = useCart();

  const addToCartAPI = async () => {
    try {
      const variant = initialProduct.variants.find(
        v => v.size === selectedSize && v.color === selectedColor,
      );

      const token = await getToken();
      const header = commonHeader(token);
      const res = await axios.post(
        BASE_URL + '/cart/add',
        { variantId: variant.id, quantity: 1 },
        header,
      );

      if (res.status === 200) {
        await getViewCart(dispatch);
        Alert.alert('Added to cart!');
      }
    } catch (err) {
      if(err.response.status === 401){
       // Alert.alert(err.response?.data?.error);
        navigation.navigate('Login')
      }else{
        console.log(err.response?.data?.message);
      }
    }
  };

  // const addToCart = () => {
  //   dispatch({
  //     type: 'ADD_TO_CART',
  //     payload: { product, selectedSize, selectedColor, quantity: 1 },
  //   });
  // };

  if (!product || !product.title) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Data</Text>
      </View>
    );
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      title: product.title,
      headerTitleStyle: {
        minWidth: '50',
      },
      headerRight: () => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate('TabNavigation', { screen: 'Cart' })
            }
            style={{ marginRight: 12 }}
          >
            <View style={{ position: 'relative', marginLeft: -20 }}>
              <MaterialCommunityIcons name="cart" color="white" size={28} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    {cartCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        );
      },
    });
  }, [navigation, product, cartCount]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '40%' }}>
        <Swiper
          autoplay
          autoplayTimeout={5}
          loop
          showsPagination
          dotStyle={styles.dot}
          activeDotStyle={[styles.dot, { backgroundColor: 'black', width: 30 }]}
        >
          {product.images.map((item, index) => (
            <Image
              source={{ uri: item }}
              style={{ height: '100%', width: '100%' }}
            />
          ))}
        </Swiper>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Text style={styles.title}>{product.title}</Text>
        </View>
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name="star"
              size={20}
              color={i < Math.floor(product.rating) ? '#FFD700' : '#ddd'}
            />
          ))}
          <Text style={styles.reviewText}>
            {product.rating} ({product.reviews} reviews)
          </Text>
          <Text style={styles.soldText}>. {product.sold} sold</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>₹{product.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionContent}>{product.description}</Text>
        </View>

        <Text style={[styles.row, { fontSize: 20, fontWeight: 'bold' }]}>
          Select Size
        </Text>
        <View
          style={[
            styles.row,
            { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
          ]}
        >
          {product.sizes.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.selectOptionButton,
                selectedSize === size && styles.selectedOptionButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  selectedSize === size && styles.selectedOptionText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.row, { fontSize: 20, fontWeight: 'bold' }]}>
          Select Color
        </Text>
        <View
          style={[
            styles.row,
            { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
          ]}
        >
          {product.colors?.length > 0 &&
            product.colors.map(colors => (
              <TouchableOpacity
                key={colors}
                style={[
                  styles.selectOptionButton,
                  selectedColor === colors && styles.selectedOptionButton,
                ]}
                onPress={() => setSelectedColor(colors)}
              >
                <Text
                  style={[
                    styles.selectOptionText,
                    selectedColor === colors && styles.selectedOptionText,
                  ]}
                >
                  {colors}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cartButton} onPress={addToCartAPI}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  ratingRow: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
  soldText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#777',
  },
  row: {
    marginLeft: 10,
    marginTop: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  description: {
    fontSize: 20,
    fontWeight: '600',
  },
  descriptionContent: {
    fontSize: 14,
  },
  selectOptionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 5,
    backgroundColor: '#f9f9f9',
  },
  selectedOptionButton: {
    borderColor: '#000',
    backgroundColor: '#111',
  },
  selectOptionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 10,
  },
  cartButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cartText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  buyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  cartBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    left: 14,
    top: -8,
    height: 20,
    width: 20,
  },
});
