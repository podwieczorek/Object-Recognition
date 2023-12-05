import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';

function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [boundingBox, setBoundingBox] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePictureAndSend = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            sendPicture(photo);
            drawBoundingBox();
        }
    };

    const sendPicture = async (photo) => {

        // try {
        //     const formData = new FormData();
        //     formData.append('photo', {
        //         uri: photo.uri,
        //         type: 'image/jpeg',
        //         name: 'photo.jpg',
        //     });

        //     const response = await fetch('YOUR_API_ENDPOINT', {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });

        //     if (response.ok) {
        //         const returned_json = await response.json();

        //         setBoundingBox({ top, left, width, height });
        //     } else {
        //         console.error('Failed. HTTP status code:', response.status);
        //     }
        // } catch (error) {
        //     console.error('Error: ', error);
        // }
    };

    const drawBoundingBox = () => {
        if (boundingBox) {
            const { top, left, width, height } = boundingBox;

            return (
                <View style={{ position: 'absolute', top, left }}>
                    <View
                        style={{
                            width,
                            height,
                            borderColor: '#5e0acc',
                            borderWidth: 2,
                        }}
                    />
                    <Text style={{ color: '#5e0acc', position: 'absolute', bottom: height, left: 0, padding: 2, backgroundColor: 'transparent' }}>
                        object
                    </Text>
                </View>
            );
        }

        return null;
    };

    const startAutomaticCapture = () => {
        setInterval(() => {
            takePictureAndSend();
        }, 200); // Capture, send a picture, draw bounding boxes every 200 ms
    };

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} onCameraReady={startAutomaticCapture}>
                {drawBoundingBox()}
            </Camera>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});