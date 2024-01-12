import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './src/components/Navigation';
import Products from './src/components/Products';
import ProductDetails from './src/components/ProductDetails';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Navigation">
        <Stack.Screen name="TODOS-" component={Navigation} options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'lightgrey'
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            // marginTop: StatusBar.currentHeight || 20,
          },
        }} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


