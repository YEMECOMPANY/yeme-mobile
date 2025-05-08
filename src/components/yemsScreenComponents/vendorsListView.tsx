import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";
import VendorCard from "./vendorCard";
import SearchBar from "./searchBar";

type ViewModeType = "list" | "map";

interface VendorsListViewProps {
  viewMode: ViewModeType;
  setViewMode: (mode: ViewModeType) => void;
}

function VendorsListView({ viewMode, setViewMode }: VendorsListViewProps) {
  return (
    <View style={styles.earnYemsContainer}>
      <SearchBar
        placeholder="Start typing a vendor, suburb or city"
        showTag={false}
      />

      <View style={styles.sortFilterContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Icon name="swap-vert" size={18} color="#5D5FEF" />
          <View>
            <AppText fontWeight="semi-bold" style={styles.sortFilterLabel}>
              Sort by
            </AppText>
            <AppText style={styles.sortFilterValue}>Popular</AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Icon name="tune" size={18} color="#5D5FEF" />
          <AppText fontWeight="semi-bold" style={styles.sortFilterLabel}>
            Filter
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.viewModeSwitcher}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "list" && styles.activeViewModeButton,
          ]}
          onPress={() => setViewMode("list")}
        >
          <AppText
            fontWeight="semi-bold"
            style={[
              styles.viewModeText,
              viewMode === "list" && styles.activeViewModeText,
            ]}
          >
            List View
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "map" && styles.activeViewModeButton,
          ]}
          onPress={() => setViewMode("map")}
        >
          <AppText
            fontWeight="semi-bold"
            style={[
              styles.viewModeText,
              viewMode === "map" && styles.activeViewModeText,
            ]}
          >
            Map View
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.vendorList}>
        <VendorCard
          logo="https://example.com/mcdonalds-logo.png"
          name="Mcdonalds"
          branches={3}
          distance={1.7}
        />
        <VendorCard
          logo="https://example.com/papajohns-logo.png"
          name="Papa Johns"
          branches={3}
          distance={2}
        />
        <VendorCard
          logo="https://example.com/starbucks-logo.png"
          name="Starbucks"
          branches={3}
          distance={3.3}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  earnYemsContainer: {
    marginBottom: 24,
  },
  sortFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortFilterLabel: {
    marginLeft: 8,
    color: "#5D5FEF",
    fontWeight: "500",
  },
  sortFilterValue: {
    marginLeft: 8,
    color: "#999",
    fontSize: 12,
  },
  viewModeSwitcher: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewModeButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  activeViewModeButton: {
    backgroundColor: "#3A266E",
  },
  viewModeText: {
    color: "#666",
    fontWeight: "500",
  },
  activeViewModeText: {
    color: "#fff",
  },
  vendorList: {
    marginBottom: 16,
  },
});

export default VendorsListView;
