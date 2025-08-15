import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoresScreen from "../../src/components/storesScreenComponents/storeScreen";

const StoreScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <StoresScreen />
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
  productItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  productText: { fontSize: 16, color: "#333", fontWeight: "600" },
  priceText: { fontSize: 14, color: "#666" },
});

export default StoreScreen;
