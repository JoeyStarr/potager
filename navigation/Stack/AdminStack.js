import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../../screens/AdminPage/Dashboard";
import Conseil from "../../screens/AdminPage/Conseil";
import Listing from "../../screens/AdminPage/listeProduit";
import CreaOffer from "../../screens/AdminPage/CreaOff";
import CreaPotager from "../../screens/AdminPage/CreaPotager";
import GesConseil from "../../screens/AdminPage/GesConseil";
import GesList from "../../screens/AdminPage/GesList";
import GesOff from "../../screens/AdminPage/GesOff";
import GesPotager from "../../screens/AdminPage/GesPotager";
import NewAdmin from "../../screens/AdminPage/newadmin";
import AdminList from "../../screens/AdminPage/listadmin";
import Details from "../../screens/AdminPage/detail";
import Command from "../../screens/AdminPage/UsersCommand";
import CmdForUser from "../../screens/AdminPage/cmdforuser";

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
        <Stack.Screen name="Listing" component={Listing}/>
        <Stack.Screen name="Offer" component={CreaOffer}/>
        <Stack.Screen name="Potager" component={CreaPotager}/>

        <Stack.Screen name="GesConseil" component={GesConseil} />
        <Stack.Screen name="GesList" component={GesList}/>
        <Stack.Screen name="GesOff" component={GesOff}/>
        <Stack.Screen name="GesPotager" component={GesPotager}/>

        <Stack.Screen name="New" component={NewAdmin}/>
        <Stack.Screen name="AdminList" component={AdminList}/>

        <Stack.Screen name="Detail" component={Details}/>

        <Stack.Screen name="Users" component={Command}/>
        <Stack.Screen name="Foruser" component={CmdForUser}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminStack;

