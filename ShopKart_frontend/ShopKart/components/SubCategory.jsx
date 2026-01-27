import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { PRODUCTS } from './SampleData';
import axios from 'axios';
import Loader from './Loader';
import { BASE_URL } from './utils/ApiConfig';

export default function SubCategory({ route }) {
  const { category, categoryId } = route.params;
  const [subcategory, setSubcateory] = useState();
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(0);

  const getSubCategory = () => {
    axios
      .get(BASE_URL+`/category/getSubcategory/${categoryId}`)
      .then(response => {
        setSubcateory(response.data);
        setImagesLoading(response.data.length);
      })
      .catch(error => {
        console.log(error?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: category });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          margin: 8,
          padding: 16,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {subcategory &&
          subcategory.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate('ProducyBySubCategory', {
                    subCategoryProduct: data.subcategoryName,subcategoryId:data.id
                  })
                }
              >
                <Image
                  onLoadEnd={() =>
                    setImagesLoading(prev => Math.max(prev - 1, 0))
                  }
                  source={{ uri: data.subcategoryImage }}
                  style={styles.image}
                />
                <Text style={styles.content}>{data.subcategoryName}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      {(loading || imagesLoading) > 0 && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '30%',
  },
  image: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
});
