import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

interface DiscoverProgram {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface DiscoverProgramsProps {
  limit?: number; // Optional prop to control the number of programs displayed
  showHeader?: boolean; // Optional prop to control header visibility
}

const DiscoverPrograms = ({
  limit = 3,
  showHeader = true,
}: DiscoverProgramsProps) => {
  // Expanded data with 10 diverse loyalty programs
  const discoverPrograms: DiscoverProgram[] = [
    { id: "flybuys", name: "Flybuys", logo: "✈️", color: "#3b82f6" },
    { id: "velocity", name: "Velocity", logo: "🛫", color: "#E10000" },
    {
      id: "qantas",
      name: "Qantas Frequent Flyer",
      logo: "🦘",
      color: "#E40000",
    },
    { id: "myer", name: "Myer One", logo: "🛍️", color: "#000000" },
    {
      id: "woolworths",
      name: "Everyday Rewards",
      logo: "🛒",
      color: "#44B549",
    },
    { id: "ikea", name: "IKEA Family", logo: "🪑", color: "#0051BA" },
    { id: "coles", name: "Coles Rewards", logo: "🥕", color: "#F28C38" },
    { id: "kmart", name: "Kmart Rewards", logo: "🎯", color: "#005555" },
    {
      id: "bunnings",
      name: "Bunnings PowerPass",
      logo: "🔨",
      color: "#E84C3D",
    },
    { id: "target", name: "Target Club", logo: "🧸", color: "#CC0000" },
  ];

  const handleLearnMore = (program: DiscoverProgram) => {
    router.push({
      pathname: "/(screens)/partnerLoyaltyPrograms",
      params: { program: JSON.stringify(program) },
    });
  };

  const handleSeeAll = () => {
    router.push({
      pathname: "/(screens)/discoverLoyaltyProgram",
      params: { programs: JSON.stringify(discoverPrograms) },
    });
  };

  // Apply limit to displayed programs
  const displayedPrograms = discoverPrograms.slice(0, limit);

  return (
    <View style={styles.sectionContainer}>
      {showHeader && (
        <View style={styles.sectionHeader}>
          <AppText fontWeight="bold" style={styles.sectionTitle}>
            Discover loyalty programs
          </AppText>
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
            <AppText style={styles.seeAllText} fontWeight="bold">
              See all
            </AppText>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      {displayedPrograms.map((item) => (
        <View style={styles.discoverCard} key={item.id}>
          <View style={styles.discoverContent}>
            <AppText
              fontWeight="bold"
              style={[styles.loyaltyText, { color: item.color }]}
            >
              {item.name}
            </AppText>
            <View style={styles.learnMoreContainer}>
              <TouchableOpacity onPress={() => handleLearnMore(item)}>
                <AppText style={styles.learnMoreText}>Learn more</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    color: "#666",
    marginRight: 4,
  },
  discoverCard: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  discoverContent: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  loyaltyText: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 20,
  },
  learnMoreContainer: {
    alignSelf: "flex-end",
  },
  learnMoreText: {
    color: "#000",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

export default DiscoverPrograms;
