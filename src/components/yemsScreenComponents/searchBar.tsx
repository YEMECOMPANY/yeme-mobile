import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

interface SearchBarProps {
  placeholder?: string;
  showTag?: boolean;
  tagText?: string;
  onTunePress?: () => void;
}

function SearchBar({
  placeholder = "Search",
  showTag = false,
  tagText = "by 'Tier'",
  onTunePress,
}: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      {showTag && (
        <View style={styles.searchByTag}>
          <AppText style={styles.searchByTagText}>{tagText}</AppText>
        </View>
      )}
      {onTunePress && (
        <TouchableOpacity style={styles.tuneButton} onPress={onTunePress}>
          <Icon name="tune" size={20} color="#777" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
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
    height: 24,
    padding: 0,
    color: "#333",
  },
  searchByTag: {
    backgroundColor: "#3A266E",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  searchByTagText: {
    color: "#fff",
    fontSize: 12,
  },
  tuneButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default SearchBar;
