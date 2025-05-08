import React from "react";
import AllLoyaltyProgramsScreen from "../../src/components/rewardsScreenComponents/allLoyaltyPrograms";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const PartnerLoyaltyProgram = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AllLoyaltyProgramsScreen />;
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default PartnerLoyaltyProgram;
