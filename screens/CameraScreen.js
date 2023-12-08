import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import BoundingBox from '../components/BoundingBox';
import axios from 'axios';

function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const isFocused = useIsFocused();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePictureAndSend = async () => {
        try {
            if (cameraRef.current && isFocused) {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.5
                });
                console.log('Captured Photo:', photo);
                if (photo) {
                    //await sendPicture(photo);
                } else {
                    console.error('Failed to capture a photo.');
                }
            }
        } catch (error) {
            console.error('Error while taking and sending a picture:', error);
        }
    };

    const sendPicture = async (photo) => {
        try {
            const formData = new FormData();
            formData.append('photo', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            console.log(formData);

            const response = await axios.post('http://34.168.74.2:5000/detections', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                const returnedData = response.data;
                console.log(returnedData);
                console.log(returnedData.response);
                setResponse(returnedData);
                // Now you can access the response data
            } else {
                console.error('Failed. HTTP status code:', response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const drawBoundingBox = () => {
        if (response) {
            return (
                <BoundingBox
                    width={response.width}
                    height={response.height}
                    top={response.top}
                    left={response.left}
                    objectLabel={response.objectLabel}
                />
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
            {isFocused && ( // Only render the Camera when the screen is focused, without it the camera screen is visible only the first time
                <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} onCameraReady={startAutomaticCapture}>
                    {drawBoundingBox()}
                </Camera>
            )}
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
