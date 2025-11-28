import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardSupervisor from '../screen/supervisor/DashboardSupervisor';
import GestionGuardias from '../screen/supervisor/GestionGuardias';
import Reportes from '../screen/supervisor/Reportes';

const Drawer = createDrawerNavigator();

export default function DrawerSupervisor() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardSupervisor} />
      <Drawer.Screen name="Gestión Guardias" component={GestionGuardias} />
      <Drawer.Screen name="Reportes" component={Reportes} />
    </Drawer.Navigator>
  );
}
