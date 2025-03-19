import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { useTheme } from "@react-navigation/native";

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

  const { colors } = useTheme();

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>WebSocket URL:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        value={localWsUrl}
        onChangeText={setLocalWsUrl}
        placeholderTextColor={colors.text + "80"} // 80 adds 50% transparency
      />
      <Text style={[styles.label, { color: colors.text }]}>Threshold CH1:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        value={localThresholdCH1}
        onChangeText={setLocalThresholdCH1}
        keyboardType="numeric"
        placeholderTextColor={colors.text + "80"}
      />
      <Text style={[styles.label, { color: colors.text }]}>Threshold CH2:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        value={localThresholdCH2}
        onChangeText={setLocalThresholdCH2}
        keyboardType="numeric"
        placeholderTextColor={colors.text + "80"}
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
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
  },
  updateButton: {
    marginTop: 24,
  },
});
