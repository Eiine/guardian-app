import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/vigilador/LooginScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator({ setIsLoggedIn, setRole }) {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Login" 
        children={(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn}  setRole={setRole} />} 
      />
    </Stack.Navigator>
  );
}
