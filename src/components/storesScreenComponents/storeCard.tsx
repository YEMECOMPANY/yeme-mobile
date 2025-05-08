import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";
import AppText from "../appText";

interface StoreCardProps {
  id: number;
  name: string;
  points: number;
  color: string;
}

function StoreCard({ id, name, points, color }: StoreCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/(screens)/store",
          params: { id: id.toString(), name, points: points.toString(), color },
        })
      }
    >
      <View style={[styles.logoContainer, { backgroundColor: color }]}>
        <AppText style={styles.logoText} fontWeight="bold">
          {name.substring(0, 2)}
        </AppText>
      </View>
      <View style={styles.pointsContainer}>
        <AppText style={styles.points} fontWeight="bold">
          {points.toLocaleString()}
        </AppText>
        <AppText style={styles.pointsLabel}>YEMs</AppText>
      </View>
      <AppText style={styles.storeName} fontWeight="semi-bold">
        {name}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 28,
    color: "#fff",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  points: {
    fontSize: 16,
    color: "#333",
  },
  pointsLabel: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
  storeName: {
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 12,
    paddingBottom: 12,
    textAlign: "center",
  },
});

export default StoreCard;
