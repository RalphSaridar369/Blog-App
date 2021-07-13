import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
//import {data} from '../assets/mockdata';
import Post from '../components/post';
import {AuthContext} from '../components/context'; 

/*
    This is a page
    to create map through all posts 
    created
*/




const Posts = () => {

    const [loading, setLoading]=useState(true);
    const {userToken,data,setData,create,dispatch} = useContext(AuthContext);
    

    useEffect(()=>{
        console.log("user token: ",userToken);
        fetch(`http://10.0.2.2:3000/${userToken}`)
        .then(res=>res.json())
        .then(data=>{
            setData(data);
            dispatch({type:'POSTS',data:data});
            setTimeout(async()=>{
                setLoading(false)},2000)
        });
    },[setData])

    if(loading){
        return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color="#228B22" size={50} />
        </View>
        )
    }

    return (
            <ScrollView>
                {data.map(item=>(
                    <Post post={item} key={item._id}/>
                ))}
            </ScrollView>
    )}


export default Posts
