import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Button, Image} from "react-native";

function HomeScreen({onClickButton}) {
    return (
        <View style={styles.container}>
            <Text style={styles.upperText}>Object Recoginition</Text>
            <View>
                <Image
                    source={require('../assets/images/object.png')}
                    style={styles.image}
                />
            </View>
            
            <Button
                title="GET STARTED"
                color="#5e0acc"
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
        backgroundColor: '#f0e1ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperText: {
        color: '#5e0acc',
        margin: 10,
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    cameraButton: {

    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginTop: 20,

    },
    image: {
        width: 250,
        height: 250,
        margin: 20,
    },
})