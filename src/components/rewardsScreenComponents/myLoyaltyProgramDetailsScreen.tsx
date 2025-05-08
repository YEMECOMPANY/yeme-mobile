import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

interface LoyaltyProgram {
  id: string;
  name: string;
  points: number;
  logo: string;
}

const MyLoyaltyProgramDetailsScreen = () => {
  const { program } = useLocalSearchParams();
  const parsedProgram: LoyaltyProgram = program
    ? JSON.parse(program as string)
    : null;

  if (!parsedProgram) {
    return (
      <View style={styles.container}>
        <AppText>No program data available</AppText>
      </View>
    );
  }

  const history = [
    { date: "2025-04-15", points: 200, description: "Purchase at store" },
    { date: "2025-04-10", points: 150, description: "Online order" },
    { date: "2025-04-01", points: 300, description: "Bonus points offer" },
  ];

  const rewards = [
    { id: "1", name: "$10 Voucher", points: 1000 },
    { id: "2", name: "Free Delivery", points: 500 },
    { id: "3", name: "$25 Gift Card", points: 2000 },
  ];

  const deals = [
    { id: "1", name: "Double Points Weekend", expiry: "2025-05-15" },
    { id: "2", name: "20% Off Selected Items", expiry: "2025-05-10" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.logo}>{parsedProgram.logo}</AppText>
        <AppText fontWeight="bold" style={styles.programName}>
          {parsedProgram.name} Loyalty Program
        </AppText>
      </View>

      <View style={styles.pointsCard}>
        <AppText style={styles.pointsLabel}>Total Loyalty Points</AppText>
        <AppText fontWeight="bold" style={styles.pointsValue}>
          {parsedProgram.points.toLocaleString()}
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText fontWeight="bold" style={styles.sectionTitle}>
          History
        </AppText>
        {history.map((item) => (
          <View key={item.date} style={styles.historyItem}>
            <View>
              <AppText style={styles.historyDescription}>
                {item.description}
              </AppText>
              <AppText style={styles.historyDate}>{item.date}</AppText>
            </View>
            <AppText style={styles.historyPoints}>+{item.points} pts</AppText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <AppText fontWeight="bold" style={styles.sectionTitle}>
          Reward Points Offer
        </AppText>
        {rewards.map((reward) => (
          <View key={reward.id} style={styles.rewardItem}>
            <View>
              <AppText style={styles.rewardName}>{reward.name}</AppText>
              <AppText style={styles.rewardPoints}>
                {reward.points} points
              </AppText>
            </View>
            <Icon name="chevron-right" size={24} color="#aaa" />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <AppText fontWeight="bold" style={styles.sectionTitle}>
          Other Deals
        </AppText>
        {deals.map((deal) => (
          <View key={deal.id} style={styles.dealItem}>
            <View>
              <AppText style={styles.dealName}>{deal.name}</AppText>
              <AppText style={styles.dealExpiry}>
                Expires: {deal.expiry}
              </AppText>
            </View>
            <Icon name="chevron-right" size={24} color="#aaa" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 12,
  },
  logo: {
    fontSize: 30,
    marginRight: 16,
  },
  programName: {
    fontSize: 20,
    color: "#333",
  },
  pointsCard: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  pointsLabel: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 32,
    color: "white",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  historyDescription: {
    fontSize: 16,
    color: "#333",
  },
  historyDate: {
    fontSize: 14,
    color: "#666",
  },
  historyPoints: {
    fontSize: 16,
    color: "#007AFF",
  },
  rewardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rewardName: {
    fontSize: 16,
    color: "#333",
  },
  rewardPoints: {
    fontSize: 14,
    color: "#666",
  },
  dealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dealName: {
    fontSize: 16,
    color: "#333",
  },
  dealExpiry: {
    fontSize: 14,
    color: "#666",
  },
});

export default MyLoyaltyProgramDetailsScreen;
