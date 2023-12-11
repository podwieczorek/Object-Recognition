# Object-Recognition Project Documentation

## Object recognition server setup

### Google Cloud parameters:
- C2-standard-8 VM instance
- 32 GB primary disk
- Ubuntu 22.04 LTS
- Static global IP address

### Server setup

#### Miniconda installation
https://docs.conda.io/projects/miniconda/en/latest/index.html#quick-command-line-install

#### Source code
https://github.com/theAIGuysCode/Object-Detection-API

Replace app.py in the project with the suitable version from our repository
```
cp [path to Object-Recognition]/server/app.py [path to Object-Detection-API]/app.py
```

Follow setup instruction from source code GitHub until weights loading (do not choose yolov3-tiny)

```
export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
python load_weigths.py
python app.py
```

## Server implementation details
### API request parameters
![API request](api_request.png)
### API request example response
```
{
    "response": [
        {
            "height": 54,
            "left": 59,
            "objectLabel": "cup 99.81",
            "top": 219,
            "width": 54
        },
        {
            "height": 342,
            "left": 120,
            "objectLabel": "person 99.77",
            "top": 40,
            "width": 278
        }
    ]
}
```
### API endpoint details
```
@app.route('/detections', methods=['POST'])
def get_detections():
    raw_images = []
    image = request.files['photo']
    
    image_name = image.filename
    img_raw = tf.image.decode_image(image.read(), channels=3)
    raw_images.append(img_raw)
    
    # Create list for final response
    response = []
```
Transform image to match predefined size
```

    raw_img = raw_images[0]
    num = 0
    img = tf.expand_dims(raw_img, 0)
    img = transform_images(img, size)
```
Detect objects on image
```
    t1 = time.time()
    boxes, scores, classes, nums = yolo.predict(img)
    t2 = time.time()
    print('time: {}'.format(t2 - t1))
```
JSON creation loop
```
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
```
Return response
```   
    try:
        return jsonify({"response":response}), 200
    except FileNotFoundError:
        abort(404)
```
## App UI
## App implementation details