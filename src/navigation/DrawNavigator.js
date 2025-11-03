import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DiagramaScreen from '../screen/DiagramaScreen';
import CargarParteMedico from '../screen/CargarParteMedico';
import ParteNovedades from '../screen/ParteNovedades';
import VerDiagramaCompleto from '../screen/VerDiagramaCompleto';
import SolicitarVacaciones from '../screen/SolicitarVacaciones';
import CambioGuardia from '../screen/CambioGuardia';
import Inconvenientes from '../screen/Inconcenientes';
import CargarDiagrama from '../screen/CargarDiagrama';
import HomeScreen from '../screen/HomeScreen';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="DiagramaScreen" component={DiagramaScreen} />
      <Drawer.Screen name="CargarParteMedico" component={CargarParteMedico} />
      <Drawer.Screen name="ParteNovedades" component={ParteNovedades} />
      <Drawer.Screen name="VerDiagramaCompleto" component={VerDiagramaCompleto} />
      <Drawer.Screen name="SolicitarVacaciones" component={SolicitarVacaciones} />
      <Drawer.Screen name="CambioGuardia" component={CambioGuardia} />
      <Drawer.Screen name="Inconvenientes" component={Inconvenientes} />
      <Drawer.Screen name="CargarDiagrama" component={CargarDiagrama} />
    </Drawer.Navigator>
  );
}
