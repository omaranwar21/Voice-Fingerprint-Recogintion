import MicRecorder from "mic-recorder-to-mp3";
import axios from "../../globals/api/axios";
import style from "./style.module.css";
import { useState } from "react";

const recorder = new MicRecorder({
  bitRate: 128,
});

function RecordingButton() {
  const [recording, setRecording] = useState();
  const [password, setPassword] = useState("");
  const [ingroup, setIngroup] = useState("");
  const [person, setPerson] = useState("");

  const onCLickRecordButton = (e) => {
    console.log(recording);
    setRecording(true);
    // Start recording. Browser will request permission to use your microphone.
    recorder
      .start()
      .then(() => {
        setPerson('');
          setPassword('');
          setIngroup('');
      })
      .catch((e) => {
        console.error(e);
      });

    setTimeout(function () {
      onCLickStopRecordButton();
    }, 3000);
  };
  const onCLickStopRecordButton = (e) => {
    console.log(recording);
    setRecording(false);
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
        formData.append("fileTest", "");

        axios.post("/upload", formData).then((res) => {
          // const player = new Audio(res.data.file_url);
          // player.play();

          setPerson(res.data.person);
          setPassword(res.data.password);
          setIngroup(res.data.ingroup);
        });
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };
  return (
    <div className={style.container}>
      {!recording ? (
        <button className={style.record} onClick={onCLickRecordButton}>
          Record
        </button>
      ) : (
        <button className={style.stop} disabled>
          Stop
        </button>
      )}
      <h3>{ingroup}</h3>
      <h3>{person}</h3>
      <h3>{password}</h3>
    </div>
  );
}

export default RecordingButton;
