import MicRecorder from "mic-recorder-to-mp3";
import axios from "../../globals/api/axios";

const recorder = new MicRecorder({
  bitRate: 128,
});

function Body() {
  // const [recorderedFile, setRecordedFile] = useState("");

  const onCLickRecordButton = (e) => {
    // Start recording. Browser will request permission to use your microphone.
    recorder
      .start()
      .then(() => {
        // something else
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const onCLickStopRecordButton = (e) => {
    var today = new Date();
    const date =
      today.getMinutes() +
      "1" +
      today.getSeconds() +
      "0" +
      today.getMilliseconds();

    // Once you are record, stop and get the mp3.
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, `voice${date}.mp3`, {
          type: blob.type,
          lastModified: Date.now(),
        });

        const formData = new FormData();

        formData.append("file", file);

        axios.post("/upload", formData).then((res) => {
          const player = new Audio(res.data.file_url);
          player.play();
        });
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };
  return (
    <div>
      <button onClick={onCLickRecordButton}>Record</button>
      <button onClick={onCLickStopRecordButton}>Stop</button>
    </div>
  );
}

export default Body;
