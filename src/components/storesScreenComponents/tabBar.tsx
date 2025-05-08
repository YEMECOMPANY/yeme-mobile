import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../appText";

interface TabBarProps {
  activeTab: "discover" | "gift-cards";
  setActiveTab: (tab: "discover" | "gift-cards") => void;
}

function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  return (
    <View style={styles.tabContainer}>
      <View
        style={[
          styles.tabIndicator,
          activeTab === "discover"
            ? styles.tabIndicatorLeft
            : styles.tabIndicatorRight,
        ]}
      />
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("discover")}
      >
        <AppText
          style={[
            styles.tabText,
            activeTab === "discover" && styles.tabTextActive,
          ]}
          fontWeight={activeTab === "discover" ? "bold" : "semi-bold"}
        >
          Discover
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("gift-cards")}
      >
        <AppText
          style={[
            styles.tabText,
            activeTab === "gift-cards" && styles.tabTextActive,
          ]}
          fontWeight={activeTab === "gift-cards" ? "bold" : "semi-bold"}
        >
          Gift Cards
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginVertical: 5,
    padding: 2,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    width: "50%",
    backgroundColor: "#39316d",
    borderRadius: 25,
  },
  tabIndicatorLeft: {
    left: 4,
  },
  tabIndicatorRight: {
    left: "50%",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    zIndex: 1,
  },
  tabText: {
    color: "#888",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
  },
});

export default TabBar;
