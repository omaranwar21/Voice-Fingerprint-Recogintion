import MicRecorder from "mic-recorder-to-mp3";
import React, { useState } from "react";
const recorder = new MicRecorder({
  bitRate: 128,
});

function Body() {
  const [recorderedFile, setRecordedFile] = useState();
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
    // Once you are done singing your best song, stop and get the mp3.
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const player = new Audio(URL.createObjectURL(file));
        player.play();
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
