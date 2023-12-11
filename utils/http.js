import axios from 'axios';

const BACKEND_URL = 'http://35.240.100.106:5000/detections'

export async function recognizeObjects(photo) {
    let boundingBoxes = [];

    try {
        const formData = createPhotoFormData(photo);
        const response = await axios.post(BACKEND_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            boundingBoxes = getBoundingBoxesFromResponseData(response.data.response);
        } 
        else {
            console.error('Failed. HTTP status code:', response.status);
        }
    }
    catch (error) {
        console.error('Error:', error.message);
    }

    return boundingBoxes;
}

const createPhotoFormData = (photo) => {
    const formData = new FormData();
    formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
    });
    return formData;
}

const getBoundingBoxesFromResponseData = (responseData) => {
    let boundingBoxes = []
    for (const objectData of responseData){
        const boundingBox = {
            height: objectData.height,
            width: objectData.width,
            top: objectData.top,
            left: objectData.left,
            objectLabel: objectData.objectLabel
        }
        boundingBoxes.push(boundingBox);
    }
    return boundingBoxes;
}
