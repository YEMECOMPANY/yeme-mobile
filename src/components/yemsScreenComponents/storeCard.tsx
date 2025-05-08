import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

interface StoreCardProps {
  name: string;
  category: string;
}

function StoreCard({ name, category }: StoreCardProps) {
  return (
    <View style={styles.storeCard}>
      <View>
        <AppText style={styles.storeName} fontWeight="bold">
          {name}
        </AppText>
        <AppText style={styles.storeCategory}>Category: {category}</AppText>
      </View>
      <Icon name="chevron-right" size={24} color="#aaa" />
    </View>
  );
}

const styles = StyleSheet.create({
  storeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  storeName: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  storeYems: {
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  storeCategory: {
    fontSize: 14,
    color: "#777",
  },
});

export default StoreCard;
