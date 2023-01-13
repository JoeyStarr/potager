import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { async } from "@firebase/util";
import Market from "./MarkT/Market";
import Aliment from "./MarkT/alimentScreen";
import Blank from "./MarkT/blank";
import Cart from "./Cart/Cart";

const Marketplace = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Market"
    >
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="Aliment" component={Aliment} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default Marketplace;
