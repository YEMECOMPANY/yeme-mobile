import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder = "Search" }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
      <Icon name="tune" size={20} color="#888" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 5,
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
});

export default SearchBar;
