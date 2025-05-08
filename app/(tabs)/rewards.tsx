import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Rewards from "../../src/components/rewardsScreenComponents/rewardsScreen";

const RewardsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Rewards />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
});

export default RewardsScreen;
