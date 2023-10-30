import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

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
    <SafeAreaView style={styles.rootScreen}>
      {currentScreen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
