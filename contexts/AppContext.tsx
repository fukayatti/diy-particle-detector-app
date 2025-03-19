import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppContextType = {
  websocketUrl: string;
  setWebsocketUrl: (url: string) => void;
  thresholdCH1: number;
  setThresholdCH1: (value: number) => void;
  thresholdCH2: number;
  setThresholdCH2: (value: number) => void;
};

const defaultContext: AppContextType = {
  websocketUrl: "ws://your-backend-server:5000",
  setWebsocketUrl: () => {},
  thresholdCH1: 100,
  setThresholdCH1: () => {},
  thresholdCH2: 100,
  setThresholdCH2: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [websocketUrl, setWebsocketUrl] = useState<string>(
    defaultContext.websocketUrl
  );
  const [thresholdCH1, setThresholdCH1] = useState<number>(
    defaultContext.thresholdCH1
  );
  const [thresholdCH2, setThresholdCH2] = useState<number>(
    defaultContext.thresholdCH2
  );

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedWsUrl = await AsyncStorage.getItem("websocketUrl");
        const savedThresholdCH1 = await AsyncStorage.getItem("thresholdCH1");
        const savedThresholdCH2 = await AsyncStorage.getItem("thresholdCH2");

        if (savedWsUrl) setWebsocketUrl(savedWsUrl);
        if (savedThresholdCH1) setThresholdCH1(Number(savedThresholdCH1));
        if (savedThresholdCH2) setThresholdCH2(Number(savedThresholdCH2));
      } catch (e) {
        console.error("Error loading settings from AsyncStorage", e);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("websocketUrl", websocketUrl).catch((e) =>
      console.error("Error saving websocketUrl", e)
    );
  }, [websocketUrl]);

  useEffect(() => {
    AsyncStorage.setItem("thresholdCH1", thresholdCH1.toString()).catch((e) =>
      console.error("Error saving thresholdCH1", e)
    );
  }, [thresholdCH1]);

  useEffect(() => {
    AsyncStorage.setItem("thresholdCH2", thresholdCH2.toString()).catch((e) =>
      console.error("Error saving thresholdCH2", e)
    );
  }, [thresholdCH2]);

  return (
    <AppContext.Provider
      value={{
        websocketUrl,
        setWebsocketUrl,
        thresholdCH1,
        setThresholdCH1,
        thresholdCH2,
        setThresholdCH2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
