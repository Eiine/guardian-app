import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SupervisorStack from "./StackdelSupervisor"; // el stack que contiene Dashboard y Detalle
import GestionGuardias from '../screen/supervisor/GestionGuardias';
import Reportes from '../screen/supervisor/Reportes';
import addPersonal from "../screen/supervisor/AddPersonal";
import AgrgarObjetivo from '../screen/supervisor/AgrgarObjetivo';

const Drawer = createDrawerNavigator();

export default function DrawerSupervisor() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={SupervisorStack} />
      <Drawer.Screen name="Cargar diagramas" component={GestionGuardias} />
      <Drawer.Screen name="Reportes" component={Reportes} />
      <Drawer.Screen name="Agregar Personal" component={addPersonal} />
      <Drawer.Screen name="Agregar Objetivo" component={AgrgarObjetivo} />
    </Drawer.Navigator>
  );
}
