import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);

  return (
    <AppContext.Provider value={{ recording, setRecording }}>
      {children}
    </AppContext.Provider>
  );
};
