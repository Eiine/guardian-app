import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardSupervisor from "../screen/supervisor/DashboardSupervisor";
import DetalleObjetivoScreen from "../screen/supervisor/DetalleObjetivoScreen";

const Stack = createNativeStackNavigator();

export default function SupervisorStack() {
  return (
    <Stack.Navigator initialRouteName="DashboardSupervisor">
      <Stack.Screen 
        name="DashboardSupervisor" 
        component={DashboardSupervisor} 
        options={{ title: "Dashboard" }} 
      />
      <Stack.Screen 
        name="DetalleObjetivo" 
        component={DetalleObjetivoScreen} 
        options={{ title: "Detalle del Objetivo" }}
      />
    </Stack.Navigator>
  );
}
