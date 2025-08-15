import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YemsScreen from "../../src/components/yemsScreenComponents/yemsScreen";

const YEMSScreen = () => {
  const events = [
    { id: "1", name: "YEMS Event 1", date: "April 20, 2025" },
    { id: "2", name: "YEMS Event 2", date: "April 25, 2025" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <YemsScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 0, // Remove default padding at the top
    marginTop: 0, // Remove default margin at the top
  },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  eventItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventText: { fontSize: 16, color: "#333", fontWeight: "600" },
  eventDate: { fontSize: 14, color: "#666" },
});

export default YEMSScreen;
