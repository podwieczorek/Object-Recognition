# NVIDIA GPU utilisation for YOLOv3 object detection on Windows 11 in 2023

Quick environment setup for GPU utilisation for YOLOv3

Hardware Setup:
- (PC):  HP Pavilion Gaming Laptop 15
- (CPU): Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz   2.40 GHz
- (RAM): 8.00 GB
- (GPU): NVIDIA GeForce GTX 1650

## Update NVIDIA Drivers

Using NVIDIA GeforceExperience or

https://www.nvidia.com/Download/index.aspx?lang=en

(After updating restart computer)

### (Optionally) Install Visual Studio Community 2022 as C++ compilation environment

https://visualstudio.microsoft.com/pl/

## Install NVIDIA CUDA Development Toolkit

https://developer.nvidia.com/cuda-downloads

## Install NVIDIA cuDNN
Make sure to match with CUDA version!!! (for November 2023: 12.3)

https://developer.nvidia.com/rdp/cudnn-download

After downloading zip file extract all contents (without the topmost directory "cudnn....") to C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/vX.X

## Install Anaconda
https://www.anaconda.com/download

## Install older Python and Tensorflow for Anaconda
Open Anaconda terminal

Issue commands:
```
conda install tensorflow-gpu=2.1 python=3.7
conda create -n <INSERT NAME> tensorflow-gpu=2.1 python=3.7
conda activate <INSERT NAME>
```

Installation might even take up to 4 hours!

## Install cv2 in anaconda environment
```
pip install opencv-python
```

Now GPU should be reachable from Tensorflow code

### Additional resources
During problem-solving an attempt to compile cv2 with CUDA support globally has been made.
If any error exists so far following this tutorial might help:

https://www.youtube.com/watch?v=YsmhKar8oOc

If any error exists so far try issuing this command in Powershell:
```
PS C:\some-path> setx CUDA_VISIBLE_DEVICES 1
```