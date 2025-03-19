import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * ホーム画面
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Router Sample</Text>
      <Text style={styles.description}>
        このアプリは、OWON
        VDS1022オシロスコープからWebSocket経由でデータを受信し、グラフ表示や通知を行います。
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});
