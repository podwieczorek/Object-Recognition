import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Image } from "react-native";

function AboutUsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/programmer.png')}
                    style={styles.image}
                />
            </View>
            <Text style={styles.bigText}>
            Welcome to Object Recognition Application, where cutting-edge technology meets a passion for innovation. We are a dedicated team of developers on a mission to 
            redefine the way we interact with the world through image recognition.
            {'\n\n'} 
            With a user-friendly interface and real-time recognition capabilities, Recognition Application is designed to be your go-to companion for exploring the world around you.
            Our commitment to continuous improvement means that you can expect regular updates, ensuring that you always have access to the latest advancements 
            in image recognition technology.
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default AboutUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigText: {
        color: '#5e0acc',
        margin: 15,
        fontSize: 17,
        textAlign: 'justify',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 0,
    },
    image: {
        width: 200,
        height: 200,
        margin: 20,
    },
})