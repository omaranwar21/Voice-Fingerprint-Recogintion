##################################### -----------     Packages Used     -----------######################################
from flask import Flask, request, send_from_directory     # Flask I
from flask_cors import CORS             # Activate Flask APIs
import os.path                          # To treat with files path (save Files)
import pickle
import librosa
import numpy as np
import pandas as pd
from pydub import AudioSegment
import matplotlib.pyplot as plt


app = Flask(__name__)

AUDIO_FOLDER = '.\\files'  # Path to save the fils got from the client

app.config['AUDIO_FOLDER'] = AUDIO_FOLDER

CORS(app)

ALLOWED_EXTENSIONS = {'wav', 'mp3'}   # Extension Allowed


# ------------------------------------------------- extracting features -------------------------------------------------#
ingroup_model = pickle.load(open("../processing/ingroup_model.pkl", "rb"))
model = pickle.load(open("../processing/model.pkl", "rb"))
password_model = pickle.load(open("../processing/password_model.pkl", "rb"))


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


def chroma_feature_extractor(audio, sampleRate):
    stft = np.abs(librosa.stft(audio))
    chroma = librosa.feature.chroma_stft(S=stft, sr=sampleRate)
    chromaScaled = np.mean(chroma.T, axis=0)

    return chromaScaled


def features_extractor(file):
    wavfilePath = convert_to_wav(file)
    features = []
    audio, sampleRate = librosa.load(wavfilePath, res_type='kaiser_fast')
    mfcc = mfcc_feature_extractor(audio, sampleRate)
    contrast = contrast_feature_extractor(audio, sampleRate)
    tonnetz = tonnetz_feature_extractor(audio, sampleRate)
    chroma = chroma_feature_extractor(audio, sampleRate)

    features.append([mfcc, contrast, tonnetz, chroma])
    features[0] = np.concatenate(
        (features[0][0], features[0][1], features[0][2], features[0][3]))
    return features


# ------------------------------------------------- model plotting -------------------------------------------------#
plotting_model = pickle.load(open("../processing/plotting_model.pkl", "rb"))
model_data = pd.read_csv("../processing/model_data.csv")
x = model_data.iloc[:, 0:-1]
y = model_data.loc[:, 'target']
x = x.values
xNew = []
for i in x:
    xNew.append([i[4], i[46]])
xNew = np.array(xNew)
h = .02  # step size in the mesh
x_min, x_max = xNew[:, 0].min() - 1, xNew[:, 0].max() + 1
y_min, y_max = xNew[:, 1].min() - 1, xNew[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                     np.arange(y_min, y_max, h))
z = plotting_model.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)


def model_plotting(firstFeature, secondFeature, x, y, xx, yy, z, name):
    plt.figure(figsize=(10, 7))
    plt.style.context(['dark_background'])
    plt.contourf(xx, yy, z, origin='lower',
                 cmap=plt.cm.coolwarm, alpha=0.4, zorder=0)

    plt.scatter(x[:, 0], x[:, 1], c=y, marker='x',
                cmap=plt.cm.coolwarm, zorder=1)

    plt.scatter(x=firstFeature, y=secondFeature, color='#ffffff',
                marker='^', zorder=10, s=80)  # plotting single point

    plt.xlabel('firstFeature')
    plt.ylabel('secondFeature')
    plt.xlim(xx.min(), xx.max())
    plt.ylim(yy.min(), yy.max())
    plt.xticks(())
    plt.yticks(())
    plt.title("SVM Model with linear kernel")
    plt.savefig('./files/' + name+'.png', facecolor="#00000000")

# ------------------------------------------------- convert mp3 to wav -------------------------------------------------#


def convert_to_wav(file):
    mp3FilePath = "./files/"+file
    wavfilePath = "./files/"+file.split('.')[0]+".wav"
    sound = AudioSegment.from_mp3(mp3FilePath)
    sound.export(wavfilePath, format="wav")
    return wavfilePath


# ----------------------------------------------------------------------------------------------------------------------#
# function description:
#       Arguments: File name
#               check if the file has an allowed extension or not
#       Return: True or Flase
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# ----------------------------------------------------------------------------------------------------------------------#


# ----------------------------------------------------------------------------------------------------------------------#
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

    person = '...'
    password = ''
    # ingroup='...'

    features = features_extractor(file.filename)

    first_feature = features[0][4]
    second_feature = features[0][46]

    ingroup_model_prediction = ingroup_model.predict(features)

    if ingroup_model_prediction == 0:
        # ingroup="In Group"

        model_prediction = model.predict(features)
        if model_prediction == 0:
            person = 'Anwar'
        elif model_prediction == 1:
            person = 'Aya'
        elif model_prediction == 2:
            person = 'Ehab'
        elif model_prediction == 3:
            person = 'Zeyad'

        password_model_prediction = password_model.predict(features)
        if password_model_prediction == 0:
            password = '0'
        else:
            password = '1'

    else:
        person = "0"
        password = '1'
    model_plotting(first_feature, second_feature,
                   xNew, y, xx, yy, z, file.filename)
    print(person)
    print(password)

    return {"file_url": "http://127.0.0.1:5000/api/file/" + file.filename, "person": person, "password": password}, 200
# ----------------------------------------------------------------------------------------------------------------------#


# get audio file APIs
@app.route('/api/file/<file_name>', methods=['GET'])
def file(file_name):
    if request.method == 'GET':
        return send_from_directory(directory=app.config['AUDIO_FOLDER'], path=file_name), 200


# ----------------------------------------------------------------------------------------------------------------------#
if __name__ == "__main__":
    # debug = true --> if the app has any error they will pop up on the web page
    app.run(debug=True)
# ----------------------------------------------------------------------------------------------------------------------#
