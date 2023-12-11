import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import AboutUsScreen from './screens/AboutUsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3c0a6b' },
          headerTintColor: 'white',
          drawerActiveBackgroundColor: '#f0e1ff',
          drawerActiveTintColor: '#3c0a6b',
        }}
      >

        <Drawer.Screen
          name="Home"
          component={HomeScreenWithNavigation}
          options={{
            drawerLabel: 'Home Screen',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Object Recognition"
          component={CameraScreen}
          lazy={false}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" color={color} size={size} />
            ),
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="About Us"
          component={AboutUsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreenWithNavigation = ({ navigation }) => {
  const goToCameraScreenHandler = () => {
    navigation.navigate('Object Recognition');
  };

  return <HomeScreen onClickButton={goToCameraScreenHandler} />;
};
