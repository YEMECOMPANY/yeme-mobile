import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import StoreDetailScreen from "@/src/components/storesScreenComponents/storeDetailScreen";

const transactions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoreDetailScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 16,
    paddingBottom: 20,
  },
});

export default transactions;
