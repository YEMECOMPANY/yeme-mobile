import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../../appText";

interface CardListHeaderProps {
  onAddPress: () => void;
}

const CardListHeader = ({ onAddPress }: CardListHeaderProps) => {
  return (
    <View style={styles.header}>
      <AppText fontWeight="bold" style={styles.headerText}>
        My Cards
      </AppText>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#333",
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4A58D9",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default CardListHeader;
