// src/components/LoyaltyCard.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface LoyaltyCardProps {
  totalYems: number;
}

const LoyaltyCard = ({totalYems = 18387}: LoyaltyCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.signUpText}>Sign up to loyalty program</Text>
        <View style={styles.qrPlaceholder} />
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
        <View style={styles.yemsContainer}>
          <Text style={styles.yemsLabel}>Total YEMS</Text>
          <Text style={styles.yemsValue}>{totalYems.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#352069',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  leftSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  yemsContainer: {
    alignItems: 'flex-end',
  },
  yemsLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  yemsValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default LoyaltyCard;
