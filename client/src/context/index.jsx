import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [verified, setVerified] = useState(0);
  const [password, setPassword] = useState("");
  const [person, setPerson] = useState("");
  const [message, setMessage] = useState("Locked");
  const [status, setStatus] = useState("");

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
