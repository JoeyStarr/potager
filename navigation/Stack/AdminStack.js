import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../../screens/AdminPage/Dashboard";
import Conseil from "../../screens/AdminPage/Conseil";

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dashboard"
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Conseil" component={Conseil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminStack;

