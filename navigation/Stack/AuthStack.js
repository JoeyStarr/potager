import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnBoarding from "../../containers/OnBoarding/OnBoarding";
import { SignIn, SignUp } from "../../screens/Authentication";
import Admin from "../../screens/AdminPage/Dashboard";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "../../hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const user = useAuth();

  // OnBoarding
  const [viewedOnboarding, setViewedOnboarding] = React.useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log("Error @checkOnboarding : ", err);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {viewedOnboarding === false ? (
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        ) : null}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
