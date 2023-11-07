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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a feugiat dolor. Pellentesque eget justo non odio bibendum aliquam et sed dui. 
            Donec libero sem, venenatis a euismod tincidunt. Sed scelerisque placerat velit at tincidunt. Vivamus sed nunc maximus, venenatis lacus varius, aliquam nulla.
            {'\n\n'} 
            Pellentesque consectetur ante. Sed mattis consectetur felis, sagittis pretium velit iaculis sed. Donec massa ligula, lacinia ut nibh a, faucibus aliquam nisl. 
            Aliquam scelerisque turpis sem, vel laoreet erat vehicula eget. Proin vitae faucibus sem. Mauris iaculis tellus risus, non rhoncus tortor varius quis.
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