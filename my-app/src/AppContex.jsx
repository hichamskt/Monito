import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [items , setItems ] = useState([]);

  return (
    <AppContext.Provider value={{ showCard, setShowCard, items , setItems }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
