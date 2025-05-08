import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import UserTransactionsScreen from "../../src/components/homeScreenComponents/userTransactions";

const transactions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserTransactionsScreen />
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
