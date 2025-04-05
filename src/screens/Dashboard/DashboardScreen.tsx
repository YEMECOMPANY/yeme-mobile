import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './Home/HomeScreen';
import GroupsScreen from '../Dashboard/GroupsScreen';
import YEMSScreen from '../Dashboard/YEMSScreen';
import RewardsScreen from '../Dashboard/RewardsScreen';
import StoreScreen from '../Dashboard/StoreScreen';
import {DashboardTabParamList} from '../../types/navigation';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName: string;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Groups':
                iconName = 'people';
                break;
              case 'YEMS':
                iconName = 'emoji-events';
                break;
              case 'Rewards':
                iconName = 'redeem';
                break;
              case 'Store':
                iconName = 'shopping-cart';
                break;
              default:
                iconName = 'circle';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3A266E',
          tabBarInactiveTintColor: '#666',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Groups" component={GroupsScreen} />
        <Tab.Screen name="YEMS" component={YEMSScreen} />
        <Tab.Screen name="Rewards" component={RewardsScreen} />
        <Tab.Screen name="Store" component={StoreScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DashboardScreen;
