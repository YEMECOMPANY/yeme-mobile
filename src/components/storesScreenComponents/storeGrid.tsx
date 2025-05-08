import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import StoreCard from "./storeCard";

interface StoreItem {
  id: number;
  name: string;
  points: number;
  color: string;
}

interface StoreGridProps {
  items: StoreItem[];
}

function StoreGrid({ items }: StoreGridProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.gridContainer}>
        {items.map((item) => (
          <StoreCard
            key={item.id}
            id={item.id}
            name={item.name}
            points={item.points}
            color={item.color}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default StoreGrid;
