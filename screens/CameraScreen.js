import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';

function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} />
        </View>
    );
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});