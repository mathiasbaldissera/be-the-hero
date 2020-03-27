import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Incidents from "./pages/Incidents";
import Detail from "./pages/Detail";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        <AppStack.Screen component={Incidents} name="incidents" />
        <AppStack.Screen component={Detail} name="details" />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
