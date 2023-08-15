import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenPrincipal from './src/screens/ScreenPrincipal';
import AddProductScreen from './src/screens/AddProductScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#FF6B3D', // Fondo naranja original
            borderTopColor: 'transparent',
            height: 60,
            paddingBottom: 10,
            borderRadius: 20,
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 20,
            justifyContent: 'center', // Centra los íconos en el botón de pestaña
            alignItems: 'center',
          },
          headerStyle: {
            backgroundColor: '#FF6B3D', // Fondo naranja original
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center', // Centra el título en el encabezado
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Productos"
          component={ScreenPrincipal}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'view-list' : 'view-list-outline'}
                size={30}
                color={focused ? '#FFD700' : '#fff'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Agregar Producto"
          component={AddProductScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'plus' : 'plus-outline'}
                size={30}
                color={focused ? '#FFD700' : '#fff'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}