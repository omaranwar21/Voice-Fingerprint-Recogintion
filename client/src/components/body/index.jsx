import { useReactMediaRecorder } from "react-media-recorder";

const RecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true, type: "audio/wav" });

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <p>{mediaBlobUrl}</p>
      <audio src={mediaBlobUrl} controls autoPlay />
    </div>
  );
};

export default RecordView;
