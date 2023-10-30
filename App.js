import { StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

export default function App() {

  let currentScreen = <CameraScreen />;

  return (
    <SafeAreaView style={styles.rootScreen}>{currentScreen}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
