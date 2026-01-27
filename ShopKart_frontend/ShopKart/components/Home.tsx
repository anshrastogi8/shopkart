import CategoryTiles from "./CategoryTiles";
import ImageCarousel from "./ImageCarousel";
import PromoDuo from "./PromoDuo";
import Product from "./Product";
import { slides } from './SampleData';
import { FlatList, ScrollView } from "react-native";
import { PRODUCTS } from './SampleData';
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { BASE_URL } from "./utils/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BEST_SELLER_KEY = "bestSeller";
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export default function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
      const getBestSellers = async() => {
        setLoading(true);
        try{
            
          const bestSellerData = await AsyncStorage.getItem(BEST_SELLER_KEY);
          const timestamp = await AsyncStorage.getItem(`${CACHE_EXPIRATION_TIME}_timestamp`);
          const parsedTimestamp = Number(timestamp); 

           if (bestSellerData && timestamp && (Date.now() - parsedTimestamp < CACHE_EXPIRATION_TIME)) {
                setProducts(JSON.parse(bestSellerData));
            } else {
                const result = await axios.get(BASE_URL+"/product/best-sellers");
                if(result.status === 200){
                 setProducts(result.data);
                await AsyncStorage.setItem(BEST_SELLER_KEY, JSON.stringify(result.data));
                await AsyncStorage.setItem(`${CACHE_EXPIRATION_TIME}_timestamp`, Date.now().toString());
            }
            }
        }catch(error){
          console.log(error);
        }finally{
          setLoading(false)
        } 
      };
    
      useEffect(()=>{
      getBestSellers();
      },[])

    return(
        <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<>
        <ImageCarousel slides={slides} />
        <Product productData={products} />
        <PromoDuo /> 
        {loading && <Loader/>}
        </>}
        />

               

    )
}