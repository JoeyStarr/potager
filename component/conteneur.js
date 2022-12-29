import React from "react";
import styles from "../style";
import { Text, View } from "react-native";
import HomeStack from "./HomeStack";
import Partage from "./partageScreen";
import Marketplace from "./marketplaceScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionic from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Conteneur = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, colour }) => {
              let iconName;
              if (route.name == "Accueil") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name == "Vendre") {
                iconName = focused ? "add-circle" : "add-outline";
              } else if (route.name == "Marketplace") {
                iconName = focused ? "pricetags" : "pricetags-outline";
              }
              return <Ionic name={iconName} size={28} colour={colour} />;
            },
            headerShown: false,
            tabBarShowLabel: true,
            tabBarLabel: ({ focused }) => {
              let iconColor;
              if (route.name === "Accueil") {
                iconColor = focused ? "#000000" : "#282A3A";
              } else if (route.name === "Vendre") {
                iconColor = focused ? "#000000" : "#282A3A";
              } else if (route.name === "Marketplace") {
                iconColor = focused ? "#000000" : "#282A3A";
              }
              return (
                <Text
                  style={{
                    color: iconColor,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  {route.name}
                </Text>
              );
            },
          })}
        >
          <Tab.Screen name="Accueil" component={HomeStack} />
          <Tab.Screen name="Vendre" component={Partage} />
          <Tab.Screen name="Marketplace" component={Marketplace} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Conteneur;
