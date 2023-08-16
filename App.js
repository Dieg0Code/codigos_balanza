import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import ScreenPrincipal from './src/screens/ScreenPrincipal';
import AddProductScreen from './src/screens/AddProductScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#E74C3C',
            borderTopColor: 'transparent',
            height: 60,
            paddingBottom: 10,
            borderRadius: 20,
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          headerStyle: {
            backgroundColor: '#E74C3C', // Fondo naranja original
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center', // Centra el título en el encabezado
          },
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: '#fff',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Productos') {
              iconName = focused ? 'view-list' : 'view-list-outline';
            } else if (route.name === 'Agregar Producto') {
              iconName = focused ? 'plus' : 'plus-outline';
            }

            const scaleValue = new Animated.Value(0);

            if (focused) {
              Animated.spring(scaleValue, {
                toValue: 1,
                friction: 6,
                tension: 3,
                useNativeDriver: true,
              }).start();
            } else {
              scaleValue.setValue(0);
            }

            const scale = scaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.3],
            });

            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              </Animated.View>
            );
          },
        })}
      >
        <Tab.Screen name="Productos" component={ScreenPrincipal} />
        <Tab.Screen name="Agregar Producto" component={AddProductScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}