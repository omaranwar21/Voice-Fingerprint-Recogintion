import pyaudio
import speech_recognition as sr
import pyttsx3 

#r is the recognizer to the variable that will perform the recognition process.
r = sr.Recognizer()


def speech_to_text(command):
    engine= pyttsx3.init()
    engine.say(command)
    engine.runAndWait()


 # microphone to take input
# with sr.Microphone() as source:
# to take input from an audio file 
with sr.AudioFile("C:/Users/EXTRA/DSP_Task3/processing/neveen/neveen1.wav") as source2:
    r.adjust_for_ambient_noise(source2, duration=0.002)
    audio2 = r.listen(source2)
    try:
        MyText= r.recognize_google(audio2)
        MyText= MyText.lower()
        print("text entered: "+ MyText)
        speech_to_text(MyText)
    except Exception as e:
        print("sorry, an error happened " + str(e))

#if this function to be used with microphone :
# with sr.Microphone() as source2:
#     r.adjust_for_ambient_noise(source2, duration=0.002)
    # print("say something")
#     audio2 = r.listen(source2)
#     print("please wait, audio is being processed")
#     MyText = r.recognize_google(audio2)
#     TyText = MyText.lower()
#     print("text entered: " + MyText)
#     speech_to_text(MyText)


# source used : https://www.simplilearn.com/tutorials/python-tutorial/speech-recognition-in-python
 