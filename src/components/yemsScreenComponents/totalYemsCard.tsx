import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../appText";
import { router } from "expo-router";

const TotalYemsCard = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Total YEMS Card */}
      <View style={styles.yemsCard}>
        <AppText fontWeight="semi-bold" style={styles.yemsTitle}>
          Total YEMs
        </AppText>
        <AppText fontWeight="bold" style={styles.yemsTotal}>
          18,460
        </AppText>
      </View>

      {/* View Store Button */}
      <TouchableOpacity
        style={styles.storeButton}
        onPress={() => router.push({ pathname: "/(tabs)/store" })}
      >
        <AppText fontWeight="semi-bold" style={styles.storeButtonText}>
          View Store
        </AppText>
      </TouchableOpacity>
    </View>
  );
};
// onPress={() =>
//         router.push({
//           pathname: "/(screens)/store",
//           params: { id: id.toString(), name, points: points.toString(), color },
//         })

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 32,
  },
  yemsCard: {
    backgroundColor: "#3A266E",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  yemsTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  yemsTotal: {
    fontSize: 30,
    color: "white",
    letterSpacing: 1,
  },
  storeButton: {
    backgroundColor: "#3b82f6",
    width: "75%",
    alignSelf: "center",
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  storeButtonText: {
    color: "white",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});

export default TotalYemsCard;
