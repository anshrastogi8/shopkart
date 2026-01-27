import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PRODUCTS } from './SampleData';
import Product from './Product';
import axios from 'axios'
import { BASE_URL } from './utils/ApiConfig';

export default function SubCategoryProduct({route}){
     const { subCategoryProduct,subcategoryId } = route.params;     
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);

  const getSubCategoryProducts = () => {
      axios
        .get(BASE_URL+`/product/${subcategoryId}`)
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log(error?.response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

  useEffect(() => {
    getSubCategoryProducts();
  }, []);

     const navigation = useNavigation();
       useEffect(() => {
         navigation.setOptions({ title: subCategoryProduct });
       }, [navigation]);

    return(<Product productData={products} />)
}