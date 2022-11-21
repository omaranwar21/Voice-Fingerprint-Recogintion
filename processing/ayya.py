import pyaudio
import speech_recognition as sr
import pyttsx3 
r = sr.Recognizer()
# with sr.Microphone() as source:
#  r.adjust_for_ambient_noise(source)
#  data = r.record(source, duration=5)
#  print('output')
#  text = r.recognize_google(data,language= 'EN')
#  print(text)
def speech_text(command):
    engine= pyttsx3.init()
    engine.say(command)
    engine.runAndWait()

# microphone to take input
with sr.Microphone() as source2:
    r.adjust_for_ambient_noise(source2, duration=0.002)
    audio2 = r.listen(source2)
    mytext= r.recognize_google(audio2)
    mytext= mytext.lower()
    print("did you say  "+ mytext)
    speech_text(mytext)