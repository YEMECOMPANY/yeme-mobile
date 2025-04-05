// src/screens/Dashboard/HomeScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DashboardHeader from '../DashboardHeader';
import LoyaltyCard from './LoyaltyCard';
import CardCarousel from './CardCarousel';
import RecentRewardPoints from './RecentRewardPoints';
import Transactions from './Transactions';

const HomeScreen = () => {
  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View style={styles.container}>
      <DashboardHeader onProfilePress={handleProfilePress} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LoyaltyCard totalYems={1234} />
        <CardCarousel />
        <RecentRewardPoints />
        <Transactions />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;
