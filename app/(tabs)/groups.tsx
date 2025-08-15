import GroupsScreen from "@/src/components/groupsScreenComponents/groupsScreen";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Groups = () => {
  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <GroupsScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 0, // Remove default padding at the top
    marginTop: 0, // Remove default margin at the top
  },
});

export default Groups;
