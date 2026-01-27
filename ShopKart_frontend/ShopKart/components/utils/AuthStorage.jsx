
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "TOKEN";
const USER_KEY = "USER"

export const saveAuthDetails = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.log("Error saving tokens:", e);
  }
};

export const getToken = async()=>{
    try{
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    }catch(e){
        console.error("Error fetching auth data", e);
    }
}

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.log("Error clearing tokens:", e);
  }
};