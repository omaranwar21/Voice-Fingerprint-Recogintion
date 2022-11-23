#####################################-----------     Packages Used     -----------######################################
from flask import Flask, request, send_from_directory     # Flask I
from flask_cors import CORS             # Activate Flask APIs
import os.path                          # To treat with files path (save Files)
import pickle
import librosa
import numpy

#----------------------------------------------------------------------------------------------------------------------#

model = pickle.load(open("../processing/SVM_Model.pkl", "rb"))


def features_extractor(file):
    audio, sampleRate = librosa.load(file, res_type='kaiser_fast') 
    mfccsFeatures = librosa.feature.mfcc(y=audio, sr=sampleRate, n_mfcc=40)
    mfccsScaledFeatures = np.mean(mfccsFeatures.T,axis=0)
    
    return mfccsScaledFeatures



AUDIO_FOLDER = '.\\files'  # Path to save the fils got from the client

app = Flask(__name__)

app.config['AUDIO_FOLDER'] = AUDIO_FOLDER

CORS(app)

ALLOWED_EXTENSIONS = {'wav', 'mp3'}   # Extension Allowed


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

    features = features_extractor(file)

    # features = features.reshape(1, -1)

    # prediction = model.predict(features)
    prediction = 0

    result = " "
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
