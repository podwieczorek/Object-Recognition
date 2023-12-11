import React, { useEffect, useState, useRef} from 'react';
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
    const intervalRef = useRef(null);

    useEffect(() => {
        const startAutomaticCapture = () => {
            intervalRef.current = setInterval(() => {
                takePictureAndSend();
            }, 200); // Capture, send a picture, draw bounding boxes every 200 ms
        };
        if (isFocused) {
            startAutomaticCapture();
        } 
    }, [isFocused]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            // Start automatic capture when the component mounts
            // it gives warnings but only this way it works
            if (isFocused){startAutomaticCapture();}
        })();
    }, [isFocused]);

    const takePictureAndSend = async () => {
        try {
            if (cameraRef.current && isFocused) {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.1 });
                console.log(photo);
                if (photo) {
                    // send photo to server and return recognised objects (array of bounding boxes)
                    const boxes = await recognizeObjects(photo);
                    // set new bounding boxes only when new are received
                    if (boxes.length !== 0) {
                        setBoundingBoxes(boxes);
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
        return null;
    };

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            {isFocused && (
                <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
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
