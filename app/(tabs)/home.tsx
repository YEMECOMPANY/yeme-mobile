import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YemeHeader from "../../src/components/homeScreenComponents/yemeHeader";
import LoyaltyCard from "../../src/components/homeScreenComponents/loyaltySignUpCard";
import CardList from "../../src/components/homeScreenComponents/cardCarousel/cardList";
import RecentRewards from "../../src/components/rewardsScreenComponents/recentRewardPoints";
import UserTransactionsScreen from "@/src/components/homeScreenComponents/userTransactions";
import { router } from "expo-router";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <YemeHeader />
      <ScrollView>
        <LoyaltyCard />
        <CardList />
        <RecentRewards />
        <UserTransactionsScreen
          limit={3}
          onSeeAll={() => router.push("/(screens)/transactions")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 32,
  },
});

export default HomeScreen;
