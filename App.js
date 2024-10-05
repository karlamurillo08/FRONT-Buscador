import React from 'react';
import Inicio from './src/screens/inicio';
import EditUser from "./src/screens/EditUsuario";
import SaveUser from "./src/screens/SaveUsuario";
import Usuario from './src/screens/usuario';
import Buscador from './src/screens/buscador';
import Carrito from './src/screens/carrito';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from './src/screens/CartContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (

    
      <CartProvider>      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Usuario"
            component={Usuario}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditUser"
            component={EditUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SaveUser"
            component={SaveUser}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </CartProvider>
  );
}