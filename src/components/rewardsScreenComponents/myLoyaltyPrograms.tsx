import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

interface LoyaltyProgram {
  id: string;
  name: string;
  points: number;
  logo: string;
}

interface LoyaltyProgramsProps {
  limit?: number;
  showHeader?: boolean;
}

const LoyaltyPrograms = ({
  limit = 3,
  showHeader = true,
}: LoyaltyProgramsProps) => {
  // const router = useRouter();

  const loyaltyPrograms: LoyaltyProgram[] = [
    { id: "woolworths", name: "Woolworths", points: 3735, logo: "🥗" },
    { id: "qantas", name: "Qantas", points: 4353, logo: "✈️" },
    { id: "ampol", name: "Ampol", points: 2355, logo: "⛽" },
    { id: "iga", name: "IGA", points: 1349, logo: "🛒" },
    { id: "flybuys", name: "Flybuys", points: 2890, logo: "✈️" },
    { id: "velocity", name: "Velocity", points: 3200, logo: "🛫" },
    { id: "myer", name: "Myer One", points: 1800, logo: "🛍️" },
    { id: "coles", name: "Coles", points: 2500, logo: "🥕" },
    { id: "kmart", name: "Kmart", points: 900, logo: "🎯" },
    { id: "bunnings", name: "Bunnings", points: 1500, logo: "🔨" },
  ];

  const handleSeeAll = () => {
    router.push({
      pathname: "/(screens)/myLoyaltyProgram",
      params: { programs: JSON.stringify(loyaltyPrograms) },
    });
  };

  const handleProgramPress = (program: LoyaltyProgram) => {
    router.push({
      pathname: "/(screens)/myLoyaltyProgramDetails",
      params: { program: JSON.stringify(program) },
    });
  };

  const renderLoyaltyProgramCard = (program: LoyaltyProgram) => (
    <TouchableOpacity
      key={program.id}
      style={styles.card}
      onPress={() => handleProgramPress(program)}
    >
      <View style={styles.cardContent}>
        <View style={styles.programRow}>
          <View style={styles.programInfo}>
            <AppText style={styles.programLogo}>{program.logo}</AppText>
            <View>
              <AppText fontWeight="semi-bold" style={styles.programName}>
                {program.name}
              </AppText>
              <AppText style={styles.programPoints}>
                {program.points.toLocaleString()} points
              </AppText>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const displayedPrograms = loyaltyPrograms.slice(0, limit);

  return (
    <View style={styles.sectionContainer}>
      {showHeader && (
        <View style={styles.sectionHeader}>
          <AppText fontWeight="bold" style={styles.sectionTitle}>
            My loyalty programs
          </AppText>
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
            <AppText style={styles.seeAllText} fontWeight="bold">
              See all
            </AppText>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      {displayedPrograms.map((program) => renderLoyaltyProgramCard(program))}
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
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  programRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  programInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  programLogo: {
    fontSize: 28,
    marginRight: 16,
  },
  programName: {
    fontSize: 18,
    color: "#333",
  },
  programPoints: {
    fontSize: 14,
    color: "#666",
  },
});

export default LoyaltyPrograms;
