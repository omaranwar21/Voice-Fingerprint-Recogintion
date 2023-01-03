# Voice Recogination Web App
## How to start the app
### **Run Backend**
1. Open a new Terminal and write:
```
$ cd ./backend
$ pip install -r requirements.txt             (first time only)
$ flask run --reload
```
2. Follow this to install FFmpeg (first time only): https://www.geeksforgeeks.org/how-to-install-ffmpeg-on-windows/
### **Run Frontend**
1. Open a new Terminal and write:
```
$ cd ./client
$ npm install                                 (first time only)
$ npm start
```
## Team members

|  Name  | Section | Bench Number|
|  ---------------  |  ---------------  |   ---------------  |
| Aya Sameh  | 1  |  16  |
| Ehab Kamal   | 1  |  19  |
| Zeyad Amr  | 1  |  37  |
| Omar Ahmed  | 2  |  2  |

## Description

Our voice recognition application applys MFCC feature extractor to extract features from the audio file, then comapres it with the recorded data feature to recognize the speaker.
- we used SVM classifier, in this model, the data is mapped in a hyperplan in multidimensional feature space so the points can be categorized, even if its not linearly separable.
- Note that: it could have better preformance & accuracy if we used deep learning neural networks, but we was asked to not use deep learning in our project.


**This app allows user to recognize:**
- which person is talking (fingerprints).
- whether the user is from a certain group of people or not.
- Whether the password is correct or wrong. 

## Overview about the usage method:
- the user clicks on the microphone icon, records an audio, and the reuslts apper;
- then the app goes through 3 stages;
- in the first one, it recognizes the password.
- then, it recognizes whether the person is a member of the group or not.
- the last one, if the member is confirmed to be a member of the group, it recognizes which member he is.
- so; if the password is incorrect, the access is denied whether the person is from the group or not.
- if the user is a member of the group, and the password is wrong,  the access is also denied.

 ## Dependencies
 - Python 3.9 
 - flask framework.
 - js framework.
 
  #### some of the used libraries
 - React
 - librosa
 - scipy
 - numpy
 - pandas
 - matplotlib.pyplot
 - sklearn
 - pickle
 
   ## Preview
   
- #### Home page


![React App and 2 more pages - Personal - Microsoft​ Edge 1_3_2023 3_49_48 PM](https://user-images.githubusercontent.com/93640020/210370643-b837c11e-50d1-4cf1-ae33-ee23593dbda9.png)

- #### About the graphs

- the lower left graph plots the recorded audio point to see whether it's closer to inGroup or Out of the group data
- the lower right one is a graph of a dominant feature in the audio files, if the speaker is a member of the group, it lights his curve. 
- the upper right graph plots 8 dominant features in the audio records of the group members to compare between them.

- #### some samples

- **Access denied**

![Screenshot (379) (1)](https://user-images.githubusercontent.com/93640020/210382563-caca757e-d884-4cb8-8f18-6fb65ab39991.png)


- **Ehab**

![Screenshot (378) (1)](https://user-images.githubusercontent.com/93640020/210382131-c0dacee0-d7fd-45bf-be33-dbe1d0e24635.png)

- **Zeyad**

![Screenshot (381)](https://user-images.githubusercontent.com/93640020/210382473-392c3ddd-8c1c-4343-859b-4381ff2eb587.png)

- **Anwar** 

![Screenshot (381) (1)](https://user-images.githubusercontent.com/93640020/210382666-64b2c747-a461-4d42-b8b7-4efe098f618e.png)

- **Aya** 

![Screenshot (380) (1)](https://user-images.githubusercontent.com/93640020/210382716-f981c1be-ff54-4fc2-a14d-3729c7f4da93.png)

