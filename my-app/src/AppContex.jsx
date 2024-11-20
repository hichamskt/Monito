import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [items , setItems ] = useState([]);
  const [currency , setcurrency ] = useState(localStorage.getItem('currency') || "MAD");
  const [rate , setRate ] = useState(localStorage.getItem('rate') || 1);

  return (
    <AppContext.Provider value={{ showCard, setShowCard, items , setItems , currency , setcurrency , rate , setRate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
