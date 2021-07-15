/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useMemo, useEffect, useState, useRef, useReducer} from 'react';
import {Alert, View, Image, Text, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNav from './routers/BottomNav';
import Navigation from './routers/Navigation';
import { AuthContext }from './components/context';

import {
  StatusBar,
} from 'react-native';


const StackTab = createStackNavigator();
const Tab = createBottomTabNavigator();

const App=({navigation}) => {

  const treeAnimation = useRef(new Animated.Value(0)).current;
  const animateTree =()=>{

    Animated.timing(treeAnimation,{
      toValue:5,
      duration: 1000,
      useNativeDriver:true,
    }).start((e)=>{
      setTimeout(()=>{
        setIsLoading(false);
      },1000)
      
    });

  }

  const logoAnimation = useRef(new Animated.Value(0)).current;
  const animateLogo =()=>{

    Animated.timing(logoAnimation,{
      toValue:1,
      useNativeDriver:true,
    }).start();

  }


  const [isLoading, setIsLoading] = useState(true);
  const [userToken,setUserToken] = useState(null);
  const [data, setData]=useState([]);

initialPostsState= {};

loginReducer = (state,action)=>{

      switch(action.type){
        case 'POSTS':
          console.log("Posts in Reducer: ",action.data);
          const post = action.data;
          return {...state,post};
      }

    }


  useEffect(() => {
        animateTree();
        animateLogo();
    }, []) 

  const [posts, dispatch] = useReducer(loginReducer, initialPostsState);

  useEffect(()=>{
    console.log("user token: ",userToken);
  },[setUserToken])


  const authContext = useMemo(() =>({
      dispatch:dispatch,
      userToken:userToken,
      setUserToken:setUserToken,
      data:data,
      setData:setData,
      signIn: (v)=>{
        fetch("http://10.0.2.2:3000/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username:v.username,
                password:v.password,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.length == 0)
                Alert.alert("Incorrect Credentials","Wrong username/password");
            else
              setUserToken(data[0]._id);
           });
          console.log("signed in");
          console.log(userToken);
          setIsLoading(false);
      },
      signOut:()=>{
          console.log("signed out");
          setUserToken(null);
          setData([]);
          setIsLoading(false);
      },
      signUp:(v)=>{
          fetch("http://10.0.2.2:3000/signup",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username:v.username,
                password:v.password,
            })
        }).then(res=>res.json())
        .then(data=>setUserToken(data[0]._id))
        console.log("signed up");
        setIsLoading(false);
      },

      create:(v)=>{
          console.log("from app",userToken);
          fetch("http://10.0.2.2:3000/create",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                title:v.title,
                description:v.description,
                image:v.uri,
                user:userToken,
            })
        }).then(res=>res.json())
        .then(
          fetch(`http://10.0.2.2:3000/${userToken}`)
          .then(res=>res.json())
          .then(data=>{
              setData(data);
              dispatch({type:'POSTS',data:data})
          }))
      },
  }));

  if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
         <Animated.Image source={require("./assets/logo.png")} style={{
           width:30,
           height:30,
           transform:[{scale: treeAnimation}]
           }}/>
         <Animated.Text style={{marginTop:60,fontSize:30,color:'#228b22',fontFamily:'Roboto-Bold',opacity:logoAnimation}}>Nature
         <Text style={{fontSize:30,color:"black",fontFamily:'Roboto-Bold'}}>Blog</Text></Animated.Text>
      </View>
  )}
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#228B22" />
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <StackTab.Navigator
            
            screenOptions={{
                headerShown: false,
            }}>
            {userToken === null?
            <StackTab.Screen name="Navigation" component={Navigation} navigation={navigation} />
            :
            <Tab.Screen name="Bottom" component={BottomNav} navigation={navigation} />}
      </StackTab.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};


export default App;