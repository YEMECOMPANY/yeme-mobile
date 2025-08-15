// components/RecentRewards.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

interface RecentReward {
  id: string;
  company: string;
  logo: string;
  points: number;
  date: string;
}

interface RecentRewardsProps {
  limit?: number;
  showHeader?: boolean; // New prop to control header visibility
}

const RecentRewards = ({
  limit = 3,
  showHeader = true,
}: RecentRewardsProps) => {
  const router = useRouter();

  const initialRewards: RecentReward[] = [
    {
      id: "harvey",
      company: "Harvey Norman",
      logo: "🏪",
      points: 17,
      date: "15 JUN",
    },
    {
      id: "woolworths",
      company: "Woolworths",
      logo: "🥗",
      points: 60,
      date: "14 JUN",
    },
    {
      id: "ikea",
      company: "Ikea",
      logo: "🛋️",
      points: 140,
      date: "13 JUN",
    },
    {
      id: "coles",
      company: "Coles",
      logo: "🛒",
      points: 45,
      date: "12 JUN",
    },
    {
      id: "kmart",
      company: "Kmart",
      logo: "🛍️",
      points: 22,
      date: "11 JUN",
    },
    {
      id: "qantas",
      company: "Qantas",
      logo: "✈️",
      points: 200,
      date: "10 JUN",
    },
    {
      id: "myer",
      company: "Myer",
      logo: "👗",
      points: 80,
      date: "09 JUN",
    },
    {
      id: "bunnings",
      company: "Bunnings",
      logo: "🔨",
      points: 35,
      date: "08 JUN",
    },
    {
      id: "target",
      company: "Target",
      logo: "🎯",
      points: 50,
      date: "07 JUN",
    },
    {
      id: "bigw",
      company: "Big W",
      logo: "🧸",
      points: 65,
      date: "06 JUN",
    },
  ];

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({
    ikea: false,
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSeeAll = () => {
    router.push({
      pathname: "/(screens)/rewards",
      params: { rewards: JSON.stringify(initialRewards) },
    });
  };

  const renderRecentRewardItem = (
    reward: RecentReward,
    index: number,
    total: number
  ) => {
    const isExpanded = !!expandedItems[reward.id];

    return (
      <View key={reward.id}>
        <View style={styles.rewardItem}>
          <View style={styles.rewardRow}>
            <View style={styles.rewardInfo}>
              <AppText style={styles.rewardLogo}> {reward.logo} </AppText>
              <View>
                <AppText fontWeight="semi-bold" style={styles.rewardCompany}>
                  {reward.company}
                </AppText>
                <AppText style={styles.rewardDate}>{reward.date}</AppText>

                {isExpanded && (
                  <View style={styles.expandedInfo}>
                    <AppText style={styles.sharehouseText}>
                      👥 Sharehouse
                    </AppText>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.pointsContainer}>
              <AppText fontWeight="semi-bold" style={styles.pointsText}>
                + {reward.points} pts
              </AppText>
              <TouchableOpacity
                onPress={() => toggleExpanded(reward.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  name="chevron-right"
                  size={20}
                  color="#aaa"
                  style={[
                    styles.chevronIcon,
                    isExpanded
                      ? { transform: [{ rotate: "90deg" }] }
                      : { transform: [{ rotate: "-90deg" }] },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isExpanded && (
            <View style={styles.viewItemsContainer}>
              <TouchableOpacity>
                <AppText style={styles.viewItemsText}>View items</AppText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {index < total - 1 && <View style={styles.divider} />}
      </View>
    );
  };

  const displayedRewards = initialRewards.slice(0, limit);

  return (
    <View style={styles.sectionContainer}>
      {showHeader && (
        <View style={styles.sectionHeader}>
          <AppText fontWeight="bold" style={styles.sectionTitle}>
            Recent Reward Points
          </AppText>
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
            <AppText style={styles.seeAllText} fontWeight="bold">
              See all
            </AppText>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.rewardsCard}>
        {displayedRewards.map((reward, index) =>
          renderRecentRewardItem(reward, index, displayedRewards.length)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  rewardsCard: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  rewardItem: {
    padding: 16,
  },
  rewardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rewardInfo: {
    flexDirection: "row",
  },
  rewardLogo: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  rewardCompany: {
    fontSize: 16,
    color: "#333",
  },
  rewardDate: {
    fontSize: 14,
    color: "#666",
  },
  expandedInfo: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  sharehouseText: {
    fontSize: 14,
    color: "#666",
  },
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsText: {
    fontSize: 18,
    color: "#333",
  },
  chevronIcon: {
    marginTop: 8,
  },
  viewItemsContainer: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  viewItemsText: {
    color: "#000",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
  },
});

export default RecentRewards;
