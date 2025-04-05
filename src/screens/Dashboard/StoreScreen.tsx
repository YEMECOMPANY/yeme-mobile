// src/screens/Dashboard/StoreScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store</Text>
      <Text style={styles.subtitle}>Browse the store.</Text>
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

export default StoreScreen;
