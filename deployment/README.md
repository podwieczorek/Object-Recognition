# YOLOv3 Live Detection Server Deployment

Main code comes from: https://github.com/zzh8829/yolov3-tf2

## Download files from repository
```
git clone https://github.com/zzh8829/yolov3-tf2
```

## Change video path and enjoy
In detect_video.py file on line 18 change video path to any existing .mp4 file on your computer

```
17  flags.DEFINE_integer('size', 416, 'resize images to')
18  flags.DEFINE_string('video', '../test.mp4',
19                    'path to video file or number for webcam)')
```

Now you can run this file and watch labeled video.

Don't forget to launch Anaconda environment first!
```
conda activate <INSERT NAME>
python /path-to/detect_video.py
```