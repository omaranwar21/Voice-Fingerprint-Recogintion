from pydub import AudioSegment



def convert_to_wav(file):
    sound = AudioSegment.from_mp3(file)
    sound.export("file.wav", format="wav")


    

# sound = AudioSegment.from_mp3("/path/to/file.mp3")
# sound.export("/output/path/file.wav", format="wav")