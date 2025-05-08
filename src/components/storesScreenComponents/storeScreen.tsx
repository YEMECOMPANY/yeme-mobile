import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TabBar from "./tabBar";
import SearchBar from "./searchBar";
import StoreGrid from "./storeGrid";

function StoresScreenContent() {
  const [activeTab, setActiveTab] = useState<"discover" | "gift-cards">(
    "discover"
  );

  const discoverItems = [
    { id: 1, name: "Harvey Norman", points: 11500, color: "#3366cc" },
    { id: 2, name: "MECCA", points: 12200, color: "#ff6666" },
    { id: 3, name: "Woolworths", points: 15000, color: "#339933" },
    { id: 4, name: "Coles", points: 18000, color: "#cc3333" },
    { id: 5, name: "JB HI-FI", points: 8000, color: "#ffff33" },
    { id: 6, name: "Dan Murphy's", points: 25000, color: "#336633" },
  ];

  const giftCardItems = [
    { id: 7, name: "Amazon", points: 10000, color: "#ff9900" },
    { id: 8, name: "Target", points: 8500, color: "#cc0000" },
    { id: 9, name: "Kmart", points: 9000, color: "#0055a4" },
    { id: 10, name: "Myer", points: 12000, color: "#003087" },
    { id: 11, name: "Apple", points: 15000, color: "#999999" },
    { id: 12, name: "Nike", points: 11000, color: "#000000" },
  ];

  return (
    <View style={styles.container}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SearchBar
        placeholder={
          activeTab === "discover" ? "Search Stores" : "Search Gift Cards"
        }
      />
      <StoreGrid
        items={activeTab === "discover" ? discoverItems : giftCardItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f0e3",
  },
});

export default StoresScreenContent;
