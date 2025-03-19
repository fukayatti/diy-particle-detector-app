import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Notifications from "expo-notifications";
import { io, Socket } from "socket.io-client";
import { AppContext } from "../../contexts/AppContext";

/**
 * 受信データの型定義
 */
type DataPoint = {
  timestamp: number;
  rms_ch1: number;
  rms_ch2: number;
};

/**
 * Explore画面
 * ・socket.io-client を使用してWebSocketでデータを受信
 * ・受信データをグラフ表示
 * ・閾値超過時にExpo Notificationsでプッシュ通知を送信
 */
export default function ExploreScreen() {
  const { websocketUrl, thresholdCH1, thresholdCH2 } = useContext(AppContext);
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    let socket: Socket | null = null;

    // socket.io-clientを使用して接続
    socket = io(websocketUrl, {
      transports: ["websocket"], // WebSocketのみ使用
    });

    // サーバーから 'data' イベントでデータが送信される前提
    socket.on("data", (receivedData: DataPoint) => {
      setData((prev) => [...prev, receivedData]);

      if (
        receivedData.rms_ch1 > thresholdCH1 ||
        receivedData.rms_ch2 > thresholdCH2
      ) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Threshold Exceeded",
            body: `CH1: ${receivedData.rms_ch1} (Threshold: ${thresholdCH1}) / CH2: ${receivedData.rms_ch2} (Threshold: ${thresholdCH2})`,
          },
          trigger: null,
        });
      }
    });

    socket.on("connect_error", (error: any) => {
      console.error("Socket接続エラー:", error);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [websocketUrl, thresholdCH1, thresholdCH2]);

  // 最新10件のデータをグラフ用に整形
  const recentData = data.slice(-10);
  const chartData = {
    labels: recentData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        data: recentData.map((d) => d.rms_ch1),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: recentData.map((d) => d.rms_ch2),
        color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["CH1", "CH2"],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>リアルタイムデータ</Text>
      {data.length > 0 ? (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text>まだデータは受信していません。</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
