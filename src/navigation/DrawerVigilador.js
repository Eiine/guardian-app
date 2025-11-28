import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DiagramaScreen from '../screen/vigilador/DiagramaScreen';
import CargarParteMedico from '../screen/vigilador/CargarParteMedico';
import ParteNovedades from '../screen/vigilador/ParteNovedades';
import VerDiagramaCompleto from '../screen/vigilador/VerDiagramaCompleto';
import SolicitarVacaciones from '../screen/vigilador/SolicitarVacaciones';
import CambioGuardia from '../screen/vigilador/CambioGuardia';
import Inconvenientes from '../screen/vigilador/Inconcenientes';
import CargarDiagrama from '../screen/vigilador/CargarDiagrama';
import HomeScreen from '../screen/vigilador/HomeScreen';
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
