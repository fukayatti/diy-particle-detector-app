import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

/**
 * 404エラーページ
 */
export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - ページが見つかりません</Text>
      <Link href="/" style={styles.link}>
        ホームに戻る
      </Link>
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
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    color: "blue",
  },
});
