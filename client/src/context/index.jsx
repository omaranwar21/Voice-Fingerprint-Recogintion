import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [verified, setVerified] = useState(0);
  const [password, setPassword] = useState("");
  const [person, setPerson] = useState("");
  const [message, setMessage] = useState("Locked");
  const [status, setStatus] = useState("");
  const [topImg, setTopImg] = useState(
    "https://lightningchart.com/lightningchart-js-interactive-examples/images/spectrogram.png"
  );
  const [bottomImg1, setBottomImg1] = useState(
    "https://lightningchart.com/lightningchart-js-interactive-examples/images/spectrogram.png"
  );
  const [bottomImg2, setBottomImg2] = useState(
    "https://lightningchart.com/lightningchart-js-interactive-examples/images/spectrogram.png"
  );
  const [fileName, setFileName] = useState("");

  return (
    <AppContext.Provider
      value={{
        recording,
        setRecording,
        verified,
        setVerified,
        password,
        setPassword,
        person,
        setPerson,
        message,
        setMessage,
        status,
        setStatus,
        fileName,
        setFileName,
        topImg,
        setTopImg,
        bottomImg1,
        setBottomImg1,
        bottomImg2,
        setBottomImg2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
