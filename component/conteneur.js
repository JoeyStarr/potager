import React from 'react';
import styles from '../style';
import { Text, View } from 'react-native';
import Home from './homeScreen';
import Partage from './partageScreen';
import Marketplace from './marketplaceScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

const Conteneur = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Partage" component={Partage} />
            <Tab.Screen name="Marketplace" component={Marketplace} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Conteneur;