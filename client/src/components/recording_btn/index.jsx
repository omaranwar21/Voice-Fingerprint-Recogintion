import MicRecorder from "mic-recorder-to-mp3";
import axios from "../../globals/api/axios";
import style from "./style.module.css";
import { useState } from "react";
import AudioAnalyser from "react-audio-analyser";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import icon from "../../globals/assets/mic.png";
import locked from "../../globals/assets/lock.png";
import opened from "../../globals/assets/open.png";

const recorder = new MicRecorder({
  bitRate: 128,
});

function RecordingButton() {
  const [recording, setRecording] = useState(false);
  const [verified, setVerified] = useState(0);

  const [password, setPassword] = useState("");
  const [person, setPerson] = useState("");
  const [message, setMessage] = useState("Locked");
  const [status, setStatus] = useState("");

  const onCLickRecordButton = (e) => {
    console.log(recording);
    setRecording(true);
    setVerified(1);

    // Start recording. Browser will request permission to use your microphone.
    recorder
      .start()
      .then(() => {
        setStatus("recording");
        setPerson("");
        setPassword("");
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
        setStatus("inactive");

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
          if (res.data.person !== "0" && res.data.password !== "1") {
            setVerified(2);
            setMessage("Hello, " + res.data.person + " !");
          } else {
            setVerified(0);
            setMessage("Access Denied !" + res.data.person);
          }
        });
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  const audioProps = {
    status,
    timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
    width: "350",
  };
  return (
    <Container fluid>
      <Col className={style.recordingPanel}>
        <Row>
          <button
            className={!recording ? style.record : style.stop}
            onClick={!recording ? onCLickRecordButton : () => {}}
          >
            <img src={icon} alt="" />
          </button>
        </Row>

        <Row>
          <AudioAnalyser
            {...audioProps}
            className={style.analyser}
          ></AudioAnalyser>
        </Row>

        <Row className={style.result}>
          {verified === 1 ? (
            <Spinner
              as="span"
              animation="border"
              role="status"
              variant="primary"
              aria-hidden="true"
            />
          ) : (
            <img
              src={verified === 0 ? locked : opened}
              className={style.resultIcon}
              alt=""
            />
          )}
          <Col>{verified === 1 ? <h5>Loading ..</h5> : <h5>{message}</h5>}</Col>
        </Row>
      </Col>
    </Container>
  );
}

export default RecordingButton;
