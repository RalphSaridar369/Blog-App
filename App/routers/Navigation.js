import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const StackTab = createStackNavigator();

const Tabs =({navigation})=> {


  return (
      <StackTab.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <StackTab.Screen name="Login" component={Login} navigation={navigation}
             />
        <StackTab.Screen name="Signup" component={Signup} navigation={navigation}
            />
      </StackTab.Navigator>
  );
}

export default Tabs;