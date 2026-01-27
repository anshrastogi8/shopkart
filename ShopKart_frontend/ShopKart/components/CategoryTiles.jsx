import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { categgoryTiles } from './SampleData';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from './Loader';
import { BASE_URL } from './utils/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryTiles() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth / 2 - 16;
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(0);

  const CATEGORY_KEY = 'category';
  const CATEGORY_IMAGE_KEY = 'categoryimage';
  const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

  const getCategory = async () => {
    setLoading(true);
    try {
      const categoryData = await AsyncStorage.getItem(CATEGORY_KEY);
      const imageLen = await AsyncStorage.getItem(CATEGORY_IMAGE_KEY);
      const timestamp = await AsyncStorage.getItem(
        `${CACHE_EXPIRATION_TIME}_timestamp`,
      );
      const parsedTimestamp = Number(timestamp);

      if (
        categoryData &&
        imageLen &&
        timestamp &&
        Date.now() - parsedTimestamp < CACHE_EXPIRATION_TIME
      ) {
        setCategoryData(JSON.parse(categoryData));
        setImagesLoading(JSON.parse(imagesLoading));
      } else {
        const result = await axios.get(BASE_URL + '/category/getAll');

        if (result.status === 200) {
          setCategoryData(result.data);
          setImagesLoading(result.data.length);
          await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(result.data));
          await AsyncStorage.setItem(
            CATEGORY_IMAGE_KEY,
            JSON.stringify(result.data.length),
          );
          await AsyncStorage.setItem(
            `${CACHE_EXPIRATION_TIME}_timestamp`,
            Date.now().toString(),
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop By Category</Text>
      <View style={styles.grid}>
        {categoryData &&
          categoryData.map((data, index) => (
            <TouchableHighlight
              key={index}
              style={[styles.card, { width: cardWidth }]}
              onPress={() =>
                navigation.navigate('SubCategory', {
                  category: data.categoryName,
                  categoryId: data.id,
                })
              }
            >
              <View>
                <Image
                  source={{ uri: data.categoryImage }}
                  style={styles.image}
                  onLoadEnd={() =>
                    setImagesLoading(prev => Math.max(prev - 1, 0))
                  }
                />
                <View style={styles.overlay} />
                <Text style={styles.label}>{data.categoryName}</Text>
              </View>
            </TouchableHighlight>
          ))}
      </View>
      {(loading || imagesLoading) > 0 && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f8f4ec',
  },
  heading: {
    fontSize: 23,
    textAlign: 'center',
    color: '#111',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    aspectRatio: 4 / 3,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(66, 63, 63, 0.2)',
  },
  label: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 18,
  },
});
