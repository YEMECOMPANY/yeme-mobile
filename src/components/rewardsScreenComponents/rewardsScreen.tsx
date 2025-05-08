import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import YemsCard from "../yemsScreenComponents/totalYemsCard";
import LoyaltyPrograms from "./myLoyaltyPrograms";
import DiscoverPrograms from "./newLoyaltyPrograms";
import RecentRewards from "./recentRewardPoints";

const Rewards = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Apply horizontal padding only here */}
        <View style={styles.paddedContent}>
          <YemsCard />
          <LoyaltyPrograms />
        </View>

        {/* No padding applied here */}
        <RecentRewards />

        {/* Resume padding again */}
        <View style={styles.paddedContent}>
          <DiscoverPrograms />
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  paddedContent: {
    paddingHorizontal: 20,
  },
  bottomPadding: {
    height: 70,
  },
});

export default Rewards;
