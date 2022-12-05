#####################################-----------     Packages Used     -----------######################################
from flask import Flask, request, send_from_directory     # Flask I
from flask_cors import CORS             # Activate Flask APIs
import os.path                          # To treat with files path (save Files)
import pickle
import librosa
import numpy as np
from pydub import AudioSegment
import soundfile


AUDIO_FOLDER = '.\\files'  # Path to save the fils got from the client

app = Flask(__name__)

app.config['AUDIO_FOLDER'] = AUDIO_FOLDER

CORS(app)

ALLOWED_EXTENSIONS = {'wav', 'mp3'}   # Extension Allowed


#------------------------------------------------- extracting features -------------------------------------------------#
model = pickle.load(open("../processing/model.pkl", "rb"))


def mfcc_feature_extractor(audio, sampleRate):
    mfccsFeatures = librosa.feature.mfcc(y=audio, sr=sampleRate, n_mfcc=40)
    mfccsScaledFeatures = np.mean(mfccsFeatures.T, axis=0)

    return mfccsScaledFeatures


def contrast_feature_extractor(audio, sampleRate):
    stft = np.abs(librosa.stft(audio))
    contrast = librosa.feature.spectral_contrast(S=stft, sr=sampleRate)
    contrastScaled = np.mean(contrast.T, axis=0)

    return contrastScaled


def tonnetz_feature_extractor(audio, sampleRate):
    tonnetz = librosa.feature.tonnetz(
        y=librosa.effects.harmonic(audio), sr=sampleRate)
    tonnetzScaled = np.mean(tonnetz.T, axis=0)

    return tonnetzScaled


def centroid_feature_extractor(audio, sampleRate):
    centroid = librosa.feature.spectral_centroid(y=audio, sr=sampleRate)
    centroidScaled = np.mean(centroid.T, axis=0)

    return centroidScaled


def features_extractor(file):
    wavfilePath = convert_to_wav(file)
    features = []
    audio, sampleRate = librosa.load(wavfilePath, res_type='kaiser_fast')
    mfcc = mfcc_feature_extractor(audio, sampleRate)
    contrast = contrast_feature_extractor(audio, sampleRate)
    tonnetz = tonnetz_feature_extractor(audio, sampleRate)
    centroid = centroid_feature_extractor(audio, sampleRate)
    features.append([mfcc, contrast, tonnetz, centroid])
    features[0] = np.concatenate(
        (features[0][0], features[0][1], features[0][2], features[0][3]))
    return features

#------------------------------------------------- convert mp3 to wav -------------------------------------------------#


def convert_to_wav(file):
    mp3FilePath = "./files/"+file
    wavfilePath = "./files/"+file.split('.')[0]+".wav"
    sound = AudioSegment.from_mp3(mp3FilePath)
    sound.export(wavfilePath, format="wav")
    return wavfilePath


#----------------------------------------------------------------------------------------------------------------------#
# function description:
#       Arguments: File name
#               check if the file has an allowed extension or not
#       Return: True or Flase
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#----------------------------------------------------------------------------------------------------------------------#


#----------------------------------------------------------------------------------------------------------------------#
# Route handels the file recorded
#       Methods: the client Posts the recorded file
#       Functions: upload_file:
#       No Arguments
#       Descrption:
#             check & raise an Error flag if:
#                       --> No files sent
#                       --> not allowed formats
#             otherwise:
#                       save file in AUDIO_FOLDER
#       Return:  json script has file url
@app.route("/api/upload", methods=['POST'])
def upload_file():
    if "file" not in request.files:
        return {"there is an error": 'err'}, 400

    file = request.files["file"]

    if not allowed_file(file.filename):
        return {"err": "File format is not accepted"}, 400

    signalPath = os.path.join(AUDIO_FOLDER, file.filename)

    file.save(signalPath)

    features = features_extractor(file.filename)

    prediction = model.predict(features)
    print(prediction)

    result = "0000"
    if prediction == 0:
        result = 'anwar'
    elif prediction == 1:
        result = 'Aya'
    elif prediction == 2:
        result = 'Ehab'
    elif prediction == 3:
        result = 'Zeyad'

    return {"file_url": "http://127.0.0.1:5000/api/file/" + file.filename, "message": result, "result": result}, 200
#----------------------------------------------------------------------------------------------------------------------#


# get audio file APIs
@app.route('/api/file/<file_name>', methods=['GET'])
def file(file_name):
    if request.method == 'GET':
        return send_from_directory(directory=app.config['AUDIO_FOLDER'], path=file_name), 200


#----------------------------------------------------------------------------------------------------------------------#
if __name__ == "__main__":
    # debug = true --> if the app has any error they will pop up on the web page
    app.run(debug=True)
#----------------------------------------------------------------------------------------------------------------------#
