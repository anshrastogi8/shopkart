/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from 'react-native';
import TabNavigation from './components/TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Account from './components/Account';
import Checkout from './components/Checkout';
import ProductDetails from './components/ProductDetails'
import OrderConfirmation from './components/OrderConfirmation'
import SubCategory from './components/SubCategory'
import Payment from './components/Payment'
import { CartProvider } from "./components/contexts/CartContext";
import Login from './components/Login'
import SignUp from './components/SignUp'
import SubCategoryProduct from './components/SubCategoryProduct'

const Stack = createStackNavigator()

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
              headerStyle: { backgroundColor: '#0e2a3dff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Account" options={{headerTitleStyle:{color:"#fff",fontSize:26,fontWeight:"700"}}} component={Account} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name='Checkout' options={{title:"Shipping Details"}}  component={Checkout} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmation}
        options={{headerLeft:()=> null,gestureEnabled:false}}
        />
        <Stack.Screen name="SubCategory" component={SubCategory} />
        <Stack.Screen name ="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} options={{title:"Register"}}  />
        <Stack.Screen name="ProducyBySubCategory" component={SubCategoryProduct} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}




export default App;
