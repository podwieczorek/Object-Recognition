import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import BoundingBox from '../components/BoundingBox';
import { recognizeObjects } from '../utils/http';

function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const isFocused = useIsFocused();
    const [boundingBoxes, setBoundingBoxes] = useState([]);
    // old bounding boxes are needed to prevent weird camera behaviour when there are no new bounding boxes
    const [oldBoundingBoxes, setOldBoundingBoxes] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePictureAndSend = async () => {
        try {
            if (cameraRef.current && isFocused) {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.3});
                if (photo) {
                    // this function sends a picture and returns an array of objects (bounding boxes)
                    const boxes = await recognizeObjects(photo);
                    setBoundingBoxes(boxes);
                    
                    if(boxes.length !== 0){
                        setOldBoundingBoxes(boxes);
                    }
                } else {
                    console.error('Failed to capture a photo.');
                }
            }
        } catch (error) {
            console.error('Error while taking and sending a picture:', error);
        }
    };

    const drawBoundingBoxes = () => {
        if (boundingBoxes.length !== 0) {
            return boundingBoxes.map((box, index) => (
                <BoundingBox
                    key={index}
                    width={box.width}
                    height={box.height}
                    top={box.top}
                    left={box.left}
                    objectLabel={box.objectLabel}
                />
            ));
        }
        else if(oldBoundingBoxes.length !== 0){
            return oldBoundingBoxes.map((box, index) => (
                <BoundingBox
                    key={index}
                    width={box.width}
                    height={box.height}
                    top={box.top}
                    left={box.left}
                    objectLabel={box.objectLabel}
                />
            ));
        }
        return null;
    };

    const startAutomaticCapture = () => {
        setInterval(() => {
            takePictureAndSend();
        }, 100); // Capture, send a picture, draw bounding boxes every 200 ms
    };

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            {isFocused &&  ( // Only render the Camera when the screen is focused, without it the camera screen is visible only the first time
                <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} onCameraReady={startAutomaticCapture}>
                    {drawBoundingBoxes()}
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
