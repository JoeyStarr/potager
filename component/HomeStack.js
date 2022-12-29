import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Home Screens
import Home from "./homeScreen";
import Profile from "../screens/Profile/Profile";
import HashScreen from "../screens/Hash/HashScreen";
import Advice from "../screens/Advice/Advice";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HashScreen" component={HashScreen} />
      <Stack.Screen name="Advice" component={Advice} />
    </Stack.Navigator>
  );
};

export default HomeStack;
