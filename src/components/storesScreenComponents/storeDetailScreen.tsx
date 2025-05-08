import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import AppText from "../appText";

interface StoreDetailRouteParams {
  id: number;
  name: string;
  points: number;
  color: string;
}

function StoreDetailScreen() {
  const route = useRoute();
  const { name, points, color } = route.params as StoreDetailRouteParams;

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { backgroundColor: color }]}>
        <AppText style={styles.logoText} fontWeight="bold">
          {name.substring(0, 2)}
        </AppText>
      </View>
      <AppText style={styles.storeName} fontWeight="bold">
        {name}
      </AppText>
      <AppText style={styles.points} fontWeight="semi-bold">
        Cost: {points.toLocaleString()} YEMS
      </AppText>
      <AppText style={styles.description} fontWeight="regular">
        Redeem your YEMS to shop at {name} and enjoy exclusive offers!
      </AppText>
      <TouchableOpacity style={styles.buyButton}>
        <AppText style={styles.buyButtonText} fontWeight="bold">
          Buy Now
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f0e3",
    padding: 16,
    alignItems: "center",
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  logoText: {
    fontSize: 48,
    color: "#fff",
  },
  storeName: {
    fontSize: 24,
    color: "#333",
    marginBottom: 12,
  },
  points: {
    fontSize: 18,
    color: "#333",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buyButton: {
    backgroundColor: "#39316d",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buyButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default StoreDetailScreen;
