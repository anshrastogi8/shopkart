import axios from "axios";
import { FlatList, Pressable } from "react-native";
import { BASE_URL } from './utils/ApiConfig';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";


export default function Orders(){
    
    const [order,setOrder] = useState([])
    const navigation = useNavigation()

    const getAllOrders=async()=>{
        try{
            const result = await axios.get(BASE_URL+"/order/all")

            if(result.status === 200){
                setOrder(result.data)
            }

        }catch(error){
            if(error.response.status === 403){
                navigation.navigate('Login')
            }
        }
    }

    useEffect(()=>{
        getAllOrders()
    },[])

    const renderData=()=>{
        return(
            <Pressable>
            <View>
            <Text></Text>
            </View>
            </Pressable>
        )
    }

    return(
        <FlatList
        data={order.length >0 ? order :[]}
        keyExtractor={item => item.id.toString()}
        renderItem={renderData}
        />
    )
}