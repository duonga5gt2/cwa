"use client";
import { createContext, useState, useContext } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <HomeContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHome = () => useContext(HomeContext);
