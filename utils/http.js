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
            // console.log("response.data: ", response.data);
            // console.log("response.data.response: ", response.data.response);
            // console.log("response.data.response[0]: ", response.data.response[0]);
            
            boundingBoxes = getBoundingBoxesFromResponseData(response.data.response[0]);
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

// TODO check if this is needed
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
        //console.log("boundingBox: ", boundingBox)
        boundingBoxes.push(boundingBox);
    }
    return boundingBoxes;
}
