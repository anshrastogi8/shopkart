import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Account from "./Account";
import TabNavigation from "./TabNavigation";

const Stack = createStackNavigator();

export default function StackNavigation(){
    return(
        <NavigationContainer>
           <Stack.Navigator>
           <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }}/>

           </Stack.Navigator>
        </NavigationContainer>
    )
}