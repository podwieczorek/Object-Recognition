import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from "react-native";

function CameraScreen() {
    return (
        <View style={styles.container}>
            <Text>Camera screen</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})