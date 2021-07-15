import React,{useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Posts from '../screens/Posts';
import Post from '../screens/Post';
import Create from '../screens/Create';
import Login from '../screens/Login';
import Window from '../screens/Modal';

const Tab = createBottomTabNavigator();
const PostsTab = createStackNavigator();

const TabPosts = ({navigation})=>{
  return(
  <PostsTab.Navigator
      screenOptions={{
          headerShown: false,
      }}
      initialRouteName="Posts">
      <PostsTab.Screen name="Posts" component={Posts}/>
      <PostsTab.Screen name="Post" component={Post}/>
  </PostsTab.Navigator>
  )
}

const BottomTabs =({navigation})=> {

  const {signOut} = useContext(AuthContext);
  return (
      <Tab.Navigator 
      tabBarOptions={{ showIcon: true, showLabel: false, }}>
        <Tab.Screen name="TabPosts" component={TabPosts}
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