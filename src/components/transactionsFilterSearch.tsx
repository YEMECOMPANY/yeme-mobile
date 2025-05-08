import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./appText";

interface UserTransactionFilterProps {
  onSearch: (query: string) => void;
  onSort: (
    sortType: "date-desc" | "date-asc" | "amount-desc" | "amount-asc"
  ) => void;
}

const UserTransactionFilter: React.FC<UserTransactionFilterProps> = ({
  onSearch,
  onSort,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "date-desc" | "date-asc" | "amount-desc" | "amount-asc"
  >("date-desc");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query.trim()); // Trim whitespace for better search handling
  };

  const handleSort = (sortType: "date" | "amount") => {
    let newSortBy: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
    if (sortType === "date") {
      newSortBy = sortBy === "date-desc" ? "date-asc" : "date-desc";
    } else {
      newSortBy = sortBy === "amount-desc" ? "amount-asc" : "amount-desc";
    }
    setSortBy(newSortBy);
    onSort(newSortBy);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#b3b3b3"
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { fontFamily: "Inter-Regular" }]}
          placeholder="Search transactions..."
          placeholderTextColor="#b3b3b3"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Ionicons name="close-circle-outline" size={20} color="#b3b3b3" />
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Buttons */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy.includes("date") && styles.sortButtonActive,
          ]}
          onPress={() => handleSort("date")}
        >
          <AppText
            style={[
              styles.sortButtonText,
              sortBy.includes("date") && styles.sortButtonTextActive,
            ]}
          >
            Date{" "}
            {sortBy === "date-desc" ? "↓" : sortBy === "date-asc" ? "↑" : ""}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy.includes("amount") && styles.sortButtonActive,
          ]}
          onPress={() => handleSort("amount")}
        >
          <AppText
            style={[
              styles.sortButtonText,
              sortBy.includes("amount") && styles.sortButtonTextActive,
            ]}
          >
            Amount{" "}
            {sortBy === "amount-desc"
              ? "↓"
              : sortBy === "amount-asc"
              ? "↑"
              : ""}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "Inter-Regular",
  },
  clearIcon: {
    marginLeft: 8,
  },
  sortContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sortButtonActive: {
    backgroundColor: "#3A266E",
    borderColor: "#3A266E",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#333",
  },
  sortButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default UserTransactionFilter;
