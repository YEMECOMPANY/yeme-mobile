// src/screens/Dashboard/RewardsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.subtitle}>Check your rewards here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {fontSize: 24, fontWeight: 'bold', color: '#333'},
  subtitle: {fontSize: 16, color: '#666', marginTop: 10},
});

export default RewardsScreen;
