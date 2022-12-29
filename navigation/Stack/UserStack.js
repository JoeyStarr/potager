import * as React from "react";
import Conteneur from "../../component/conteneur";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return <Conteneur />;
}
