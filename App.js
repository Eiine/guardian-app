import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import DrawerSupervisor from './src/navigation/DrawerSupervisor';
import DrawerVigilador from "./src/navigation/DrawerVigilador"
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState(null);
   return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <StackNavigator setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
      ) : role === "supervisor" ? (
        <DrawerSupervisor />
      ) : (
        <DrawerVigilador />
      )}
    </NavigationContainer>
  );
}
