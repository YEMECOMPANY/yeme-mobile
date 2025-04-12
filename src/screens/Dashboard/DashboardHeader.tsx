import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../constants/styles';

interface DashboardHeaderProps {
  onProfilePress: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({onProfilePress}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/yeme-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
        <Icon name="account-circle" size={32} color="#3A266E" />
      </TouchableOpacity>
    </View>
  );
};


export default DashboardHeader;
