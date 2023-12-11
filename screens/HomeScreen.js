import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Image} from "react-native";

import CustomButton from "../components/CustomButton";

function HomeScreen({onClickButton}) {
    return (
        <View style={styles.container}>
            
            <Text style={styles.upperText}>Object Recoginition Application</Text>
            
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/object.png')}
                    style={styles.image}
                />
            </View>
            
            <CustomButton
                title="GET STARTED"
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
    imageContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 50,
    },
    image: {
        width: 250,
        height: 250,
        margin: 20,
    },
})