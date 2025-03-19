import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AppContext } from "../../contexts/AppContext";

/**
 * Settings画面
 * ・WebSocket URLおよびCH1/CH2の閾値設定
 * ・入力した値はContextで管理し、設定は永続化されます
 */
export default function SettingsScreen() {
  const {
    websocketUrl,
    setWebsocketUrl,
    thresholdCH1,
    setThresholdCH1,
    thresholdCH2,
    setThresholdCH2,
  } = useContext(AppContext);

  // ローカルの入力用ステート
  const [localWsUrl, setLocalWsUrl] = useState(websocketUrl);
  const [localThresholdCH1, setLocalThresholdCH1] = useState(
    String(thresholdCH1)
  );
  const [localThresholdCH2, setLocalThresholdCH2] = useState(
    String(thresholdCH2)
  );

  const handleUpdate = () => {
    setWebsocketUrl(localWsUrl);
    setThresholdCH1(Number(localThresholdCH1));
    setThresholdCH2(Number(localThresholdCH2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>WebSocket URL:</Text>
      <TextInput
        style={styles.input}
        value={localWsUrl}
        onChangeText={setLocalWsUrl}
      />
      <Text style={styles.label}>Threshold CH1:</Text>
      <TextInput
        style={styles.input}
        value={localThresholdCH1}
        onChangeText={setLocalThresholdCH1}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Threshold CH2:</Text>
      <TextInput
        style={styles.input}
        value={localThresholdCH2}
        onChangeText={setLocalThresholdCH2}
        keyboardType="numeric"
      />
      <View style={styles.updateButton}>
        <Button title="Update Settings" onPress={handleUpdate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
  },
  updateButton: {
    marginTop: 24,
  },
});
