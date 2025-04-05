// src/components/RecentRewardPoints.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

interface Reward {
  id: string;
  merchant: string;
  date: string;
  points: number;
}

const RecentRewardPoints = () => {
  const rewards: Reward[] = [
    {id: '1', merchant: 'IKEA', date: '13 JUN', points: 140},
    {id: '2', merchant: 'H&M', date: '10 JUN', points: 390},
    {id: '3', merchant: "John's Café", date: '04 JUN', points: 12},
  ];

  const renderReward = ({item}: {item: Reward}) => (
    <View style={styles.rewardCard}>
      <View style={styles.rewardInfo}>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.points}>+{item.points} pts</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Reward Points</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={rewards}
        renderItem={renderReward}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  seeAll: {
    fontSize: 14,
    color: '#1e90ff',
    fontWeight: '500',
  },
  rewardCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rewardInfo: {
    flexDirection: 'column',
  },
  merchant: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  points: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '600',
  },
});

export default RecentRewardPoints;
