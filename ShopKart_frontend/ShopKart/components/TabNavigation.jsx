import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import Cart from './Cart';
import Home from './Home';
import Menu from './Menu';
import Shop from './Shop';
import { TextInput, View, Pressable } from 'react-native';
import { useCart } from './contexts/CartContext';
import { getToken } from './utils/AuthStorage';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { cart, dispatch } = useCart();
  const cartCount = cart?.length;
      
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 500,
        },
        tabBarStyle: { backgroundColor: '#0e2a3dff' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'home' : 'home-outline';
            return (
              <MaterialCommunityIcons name={iconName} color={color} size={28} />
            );
          },
          headerStyle: { backgroundColor: '#0e2a3dff' },
          headerTitle: () => <CustomHome />,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'view-grid' : 'view-grid-outline';
            return (
              <MaterialCommunityIcons name={iconName} color={color} size={28} />
            );
          },
          headerStyle: { backgroundColor: '#0a1e2b' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { color: '#fff', fontSize: 26, fontWeight: '700' },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'cart' : 'cart-outline';
            return (
              <MaterialCommunityIcons name={iconName} color={color} size={28} />
            );
          },
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          headerStyle: { backgroundColor: '#0e2a3dff' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { color: '#fff', fontSize: 26, fontWeight: '700' },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'menu' : 'menu';
            return (
              <MaterialCommunityIcons name={iconName} color={color} size={28} />
            );
          },
          headerStyle: { backgroundColor: '#0e2a3dff' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { color: '#fff', fontSize: 26, fontWeight: '700' },
        }}
      />
    </Tab.Navigator>
  );
}

function CustomHome() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{width:"85%",margin:4}}>
        <TextInput
          placeholder="Search here... "
          placeholderTextColor="#fae9c6"
          style={{
            height: 44,
            borderWidth: 2,
            borderColor: '#ffffff',
            fontSize: 18,
            borderRadius: 4,
            paddingHorizontal: 12,
            paddingVertical:6,
            width: '100%',
          }}
        />
      </View>x
      <View style={{marginHorizontal:8}}>
        <Pressable onPress={() => navigation.navigate('Account')}>
          <MaterialCommunityIcons name="account" color="#fff" size={44} />
        </Pressable>
      </View>
    </View>
  );
}
