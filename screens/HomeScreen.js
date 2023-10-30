import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from "react-native";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})