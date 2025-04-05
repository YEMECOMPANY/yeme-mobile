// src/screens/Dashboard/YEMSScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const YEMSScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YEMS</Text>
      <Text style={styles.subtitle}>Your YEMS overview.</Text>
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

export default YEMSScreen;
