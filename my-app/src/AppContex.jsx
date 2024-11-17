import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <AppContext.Provider value={{ showCard, setShowCard }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
