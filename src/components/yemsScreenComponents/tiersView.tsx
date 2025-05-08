import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../appText";
import StoreCard from "./storeCard";

function TiersView() {
  return (
    <View style={styles.tiersContainer}>
      <View style={styles.tierHeader}>
        <AppText style={styles.tierHeaderText} fontWeight="bold">
          Tier 3
        </AppText>
      </View>
      <StoreCard name="John's Café" category="Restaurant" />
      <StoreCard name="Bright Spark Electronics" category="Electronics Store" />
      <StoreCard name="Green Grocer Market" category="Grocery" />
      <StoreCard name="Ocean Blue Seafood" category="Restaurant" />
    </View>
  );
}

const styles = StyleSheet.create({
  tiersContainer: {
    marginBottom: 24,
  },
  tierHeader: {
    backgroundColor: "#3A266E",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 16,
  },
  tierHeaderText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default TiersView;
