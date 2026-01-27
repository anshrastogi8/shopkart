import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { PRODUCTS } from './SampleData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './contexts/CartContext';
import { getToken } from './utils/AuthStorage';

const cardWidth = Dimensions.get('window').width;
const cd = (cardWidth - 36) / 2;

function RenderProduct({ item }) {
  const navigation = useNavigation();
  const { state, dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: item,
        selectedSize: item.sizes?.[0],
        selectedColor: item.colors?.[0],
        quantity: 1,
      },
    });
  };

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <Pressable
          style={styles.heartIcon}
        >
          <FontAwesome name="heart-o" color="black" size={20} />
        </Pressable>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>

      <View style={styles.priceRatingRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.price}>₹ {item.price}</Text>
          {item.was && <Text style={styles.oldPrice}>₹ {item.was}</Text>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="star" size={14} color="#facc15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.soldText}>({item.sold})</Text>
        </View>
      </View>

{/***
  <Pressable style={styles.cartBtn} 
      //onPress={addToCartAPI}>
      onPress={() => addToCartAPI(variantId[0].id)}>
        <Text style={styles.cartBtnText}>Add to Cart</Text>
      </Pressable>
   */}    
    </Pressable>
  );
}

export default function Product({ productData }) {

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text
        style={{
          fontSize: 23,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
          color: '#111',
        }}
      >
      
      </Text>
      <FlatList
        data={productData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <RenderProduct item={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: cd,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  card: {
    aspectRatio: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
    marginHorizontal: 4,
  },
  soldText: {
    fontSize: 12,
    color: '#555',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 12,
    color: '#dc2626',
    textDecorationLine: 'line-through',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
  },
  cartBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    alignItems: 'center',
  },
  cartBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
