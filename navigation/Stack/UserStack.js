import * as React from "react";
import Conteneur from "../../component/conteneur";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../screens/Home/Home";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return <Conteneur />;
}
