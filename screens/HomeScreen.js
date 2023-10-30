import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Button } from "react-native";

function HomeScreen({onClickButton}) {
    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <Button
                title="Take me to camera screen"
                color="#a065ec"
                onPress={onClickButton}
            />
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