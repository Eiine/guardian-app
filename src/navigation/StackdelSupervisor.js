import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardSupervisor from "../screen/supervisor/DashboardSupervisor";
import DetalleObjetivoScreen from "../screen/supervisor/DetalleObjetivoScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function SupervisorStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="DashboardSupervisor"
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={28} />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen 
        name="DashboardSupervisor"
        component={DashboardSupervisor}
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen 
        name="DetalleObjetivo"
        component={DetalleObjetivoScreen}
        options={{
          title: "Detalle del Objetivo",
        }}
      />
    </Stack.Navigator>
  );
}
