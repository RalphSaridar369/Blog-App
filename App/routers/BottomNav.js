import React,{useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Posts from '../screens/Posts';
import Create from '../screens/Create';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

const BottomTabs =()=> {

  const {signOut} = useContext(AuthContext);
  return (
      <Tab.Navigator 
      tabBarOptions={{ showIcon: true, showLabel: false, }}>
        <Tab.Screen name="Posts" component={Posts}
        options={{
          tabBarIcon:({ focused })=>(
            <Icon size={30} name="photo" color={focused?"#228B22":"black"}/>
          )
        }} />
        <Tab.Screen name="Create" component={Create}
        options={{
          tabBarIcon:({ focused })=>(
            <Icon size={30} name="camera" color={focused?"#228B22":"black"}/>
          )
        }} />
        <Tab.Screen name="Login" component={Login}
        options={{
          gestureDirection: "horizontal-inverted",
          tabBarIcon:({ focused })=>(
            <Icon2 size={30} name="log-out" color={focused?"#228B22":"black"} onPress={()=>signOut()}/>
          )
        }} />
      </Tab.Navigator>
  );
}

export default BottomTabs;