import MicRecorder from "mic-recorder-to-mp3";
import axios from "../../globals/api/axios";
import style from "./style.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/index";

import AudioAnalyser from "react-audio-analyser";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import icon from "../../globals/assets/mic.png";
import locked from "../../globals/assets/lock.png";
import opened from "../../globals/assets/open.png";


const recorder = new MicRecorder({
  bitRate: 128,
});

function RecordingButton() {
  // fetch files from the context
  const {
    recording,
    setRecording,
    verified,
    setVerified,
    setPassword,
    setPerson,
    message,
    setMessage,
    status,
    setStatus,
    setFileName,
    setBottomImg1,
    setBottomImg2,
  } = useContext(AppContext);

  const onCLickRecordButton = (e) => {
    console.log(recording);
    setRecording(true);
    setVerified(1);
    SpeechRecognition.startListening();
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
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
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
      SpeechRecognition.stopListening();
    // Once you are record, stop and get the mp3.
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
       
        setStatus("inactive");
        setFileName(`voice${date}`);
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
          console.log(transcript)
          if(transcript.toLowerCase().trim()==='open the door'){
          console.log('oooo')}else{
            console.log('nnn')
          }
          if (res.data.person !== "0" && transcript.toLowerCase().trim()==='open the door') {
            setVerified(2);
            setBottomImg1(
              `http://localhost:5000/api/file/voice${date}.mp3.png`
            );
            setBottomImg2(
              `http://localhost:5000/api/file/${res.data.person}.png`
            );
            setMessage("Hello, " + res.data.person + " !");
          } else {
            setVerified(0);
            setBottomImg1(
              `http://localhost:5000/api/file/voice${date}.mp3.png`
            );
            setBottomImg2(`http://localhost:5000/api/file/others.png`);
            setMessage("Access Denied !");
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
    width: "500",
  
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
