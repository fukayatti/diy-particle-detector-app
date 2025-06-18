import React, { createContext, useState, useEffect, ReactNode, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppContextType = {
  websocketUrl: string;
  setWebsocketUrl: (url: string) => void;
  thresholdCH1: number;
  setThresholdCH1: (value: number) => void;
  thresholdCH2: number;
  setThresholdCH2: (value: number) => void;
  connectionStatus: string;
  receivedData: any[];
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
};

const defaultContext: AppContextType = {
  websocketUrl: "ws://your-backend-server:5000",
  setWebsocketUrl: () => {},
  thresholdCH1: 100,
  setThresholdCH1: () => {},
  thresholdCH2: 100,
  setThresholdCH2: () => {},
  connectionStatus: "disconnected",
  receivedData: [],
  connectWebSocket: () => {},
  disconnectWebSocket: () => {},
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
  const [connectionStatus, setConnectionStatus] = useState<string>(
    defaultContext.connectionStatus
  );
  const [receivedData, setReceivedData] = useState<any[]>(
    defaultContext.receivedData
  );
  const webSocketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    if (webSocketRef.current && webSocketRef.current.readyState !== WebSocket.CLOSED) {
      console.log("WebSocket connection already exists or is in progress.");
      return;
    }

    setConnectionStatus("connecting");
    const ws = new WebSocket(websocketUrl);
    webSocketRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus("connected");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data as string);
        setReceivedData((prevData) => {
          const newData = [...prevData, message];
          if (newData.length > 100) {
            return newData.slice(newData.length - 100);
          }
          return newData;
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      setConnectionStatus("error");
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      setConnectionStatus("disconnected");
      console.log("WebSocket disconnected");
    };
  };

  const disconnectWebSocket = () => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
  };

  useEffect(() => {
    if (websocketUrl) {
      connectWebSocket();
    }
    return () => {
      disconnectWebSocket();
    };
  }, [websocketUrl]);

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
        connectionStatus,
        receivedData,
        connectWebSocket,
        disconnectWebSocket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
