import time
from absl import app, logging
import numpy as np
import tensorflow as tf
from yolov3_tf2.models import (
    YoloV3, YoloV3Tiny
)
from yolov3_tf2.dataset import transform_images, load_tfrecord_dataset
from yolov3_tf2.utils import draw_outputs
from flask import Flask, request, Response, jsonify, send_from_directory, abort

# customize your API through the following parameters
classes_path = './data/labels/coco.names'
weights_path = './weights/yolov3.tf'
tiny = False                    # set to True if using a Yolov3 Tiny model
size = 416                      # size images are resized to for model
output_path = './detections/'   # path to output folder where images with detections are saved
num_classes = 80                # number of classes in model

# load in weights and classes
physical_devices = tf.config.experimental.list_physical_devices('GPU')
if len(physical_devices) > 0:
    tf.config.experimental.set_memory_growth(physical_devices[0], True)

if tiny:
    yolo = YoloV3Tiny(classes=num_classes)
else:
    yolo = YoloV3(classes=num_classes)

yolo.load_weights(weights_path).expect_partial()
print('weights loaded')

class_names = [c.strip() for c in open(classes_path).readlines()]
print('classes loaded')

# Initialize Flask application
app = Flask(__name__)


# API that returns JSON with classes found in images
@app.route('/detections', methods=['POST'])
def get_detections():
    raw_images = []
    image = request.files['photo']
    
    image_name = image.filename
    img_raw = tf.image.decode_image(image.read(), channels=3)
    raw_images.append(img_raw)
    
    # create list for final response
    response = []

    # Transform image to match predefined size
    raw_img = raw_images[0]
    num = 0
    img = tf.expand_dims(raw_img, 0)
    img = transform_images(img, size)

    # Detect objects on image
    t1 = time.time()
    boxes, scores, classes, nums = yolo.predict(img)
    t2 = time.time()
    print('time: {}'.format(t2 - t1))

    # JSON creation loop
    boxes, objectness, classes, nums = boxes[0], scores[0], classes[0], nums[0]
    wh = np.flip(img.shape[0:2])[0]
    # For each object detected
    for i in range(nums):
        # Top left corner
        x1y1 = tuple((np.array(boxes[i][0:2]) * wh).astype(np.int32))
        # Bottom right corner
        x2y2 = tuple((np.array(boxes[i][2:4]) * wh).astype(np.int32))
        # Label creation
        class_name = class_names[int(classes[i])]
        confidence = " {0:.2f}".format(np.array(objectness[i])*100)
        
        object = {
            "width": int(x2y2[0] - x1y1[0]),
            "height": int(x2y2[1] - x1y1[1]),
            "top": int(x1y1[1]),
            "left": int(x1y1[0]),
            "objectLabel": str(class_name + confidence)
        }
        response.append(object)
   
    try:
        return jsonify({"response":response}), 200
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=5000)