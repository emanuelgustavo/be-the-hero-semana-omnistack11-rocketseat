import React from 'react';
//componente essencial em todas as rotas
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from './pages/Search';
import Detail from './pages/Detail';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WantHelp from './pages/WantHelp';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Logon" component={Logon} />
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen name="Register" component={Register} />
        <AppStack.Screen name="Search" component={Search} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="WantHelp" component={WantHelp} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}