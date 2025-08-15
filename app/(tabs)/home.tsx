import UserTransactionsScreen from "@/src/components/homeScreenComponents/userTransactions";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardList from "../../src/components/homeScreenComponents/cardCarousel/cardList";
import LoyaltyCard from "../../src/components/homeScreenComponents/loyaltySignUpCard";
import YemeHeader from "../../src/components/homeScreenComponents/yemeHeader";
import RecentRewards from "../../src/components/rewardsScreenComponents/recentRewardPoints";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <YemeHeader />
      <ScrollView>
        <LoyaltyCard />
        <CardList />
        <UserTransactionsScreen
          limit={3}
          onSeeAll={() => router.push("/(screens)/transactions")}
        />
        <RecentRewards />
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
