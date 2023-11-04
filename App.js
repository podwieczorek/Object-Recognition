import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

// for drawer navigation bar
// TODO install cocoa pods to run < npx pod-install ios >
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function App() {

  const [isCameraScreenVisible, setCameraScreen] = useState(false)

  function goToCameraScreenHandler(){
    setCameraScreen(true);
  }

  let currentScreen = <HomeScreen onClickButton={goToCameraScreenHandler}/>;
  
  if (isCameraScreenVisible) {
    currentScreen = <CameraScreen />;
  }

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
          component={HomeScreen}
          options={{
            drawerLabel: 'Home Screen',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Object recognition"
          component={CameraScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
