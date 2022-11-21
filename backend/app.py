#####################################-----------     Packages Used     -----------######################################
from flask import Flask, request, send_from_directory     # Flask I
from flask_cors import CORS             # Activate Flask APIs
import os.path                          # To treat with files path (save Files)
#----------------------------------------------------------------------------------------------------------------------#

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
    return {"file_url": "http://127.0.0.1:5000/api/file/" + file.filename}, 200
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
