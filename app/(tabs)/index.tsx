import React, { useContext } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppContext, AppContextType } from "../../contexts/AppContext";

/**
 * ホーム画面
 */
export default function HomeScreen() {
  const { colors } = useTheme();
  const { connectionStatus, receivedData, websocketUrl } =
    useContext<AppContextType>(AppContext);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            DIY Particle Detector
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.description, { color: colors.text }]}>
            このアプリは、OWON
            VDS1022オシロスコープからWebSocket経由でデータを受信し、
            グラフ表示や通知を行います。
          </Text>

          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, { color: colors.text }]}>
              Status:{" "}
              {connectionStatus === "connecting"
                ? `Connecting to ${websocketUrl}...`
                : connectionStatus === "error"
                ? "Error connecting to WebSocket."
                : connectionStatus}
            </Text>
          </View>

          <View style={styles.dataContainer}>
            <Text style={[styles.dataHeader, { color: colors.text }]}>
              Received Data:
            </Text>
            {receivedData.length === 0 ? (
              <Text style={{ color: colors.text }}>No data received yet.</Text>
            ) : (
              <ScrollView style={styles.dataScrollView}>
                {receivedData.map((message, index) => (
                  <Text
                    key={index}
                    style={[styles.dataText, { color: colors.text }]}
                  >
                    {JSON.stringify(message)}
                  </Text>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    // alignItems: "center", // Removed to allow data section to take full width
    // justifyContent: "center", // Removed to allow natural flow
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  statusContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dataContainer: {
    marginTop: 10,
    flex: 1, // Added to allow ScrollView to take available space
  },
  dataHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataScrollView: {
    flex: 1, // Ensure ScrollView expands
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  dataText: {
    fontSize: 12,
    marginBottom: 5,
  },
});
