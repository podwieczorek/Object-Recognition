import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from "react-native";

function AboutUsScreen() {
    return (
        <View style={styles.container}>
            <Text>About us:</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default AboutUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})