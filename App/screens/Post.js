import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import styles from '../components/styles/postStyles';

const Post = ({ route, navigation }) => {


    return (
        <ScrollView style={styles.postContainer}>
                <View>
                </View>
                <Image source={{uri:route.params.image}} style={{
                borderWidth:2,
                width:Dimensions.get('window').width,
                height:300,
                marginBottom:10,}}/>
                <View style={{display:'flex',flexDirection:'row', marginBottom:10}}>
                    <Image source={require('../assets/defaultuser.png')} style={styles.user}/>
                    <View>
                        <Text style={styles.name}>Me</Text>
                        <Text style={styles.time}>{route.params.createdAt.substring(0,10) +" "+ route.params.createdAt.substring(11,19)}</Text>
                    </View>
                    <Image source={require('../assets/3dotsv.png')} style={styles.dots}/>
                </View>
                <View style={{
                    width:Dimensions.get('window').width,
                    borderBottomWidth:0.4,
                    borderBottomColor:'gray',
                    marginBottom:20,
                    marginHorizontal:Dimensions.get('window').width-Dimensions.get('window').width*0.95,
                    width:Dimensions.get('window').width-Dimensions.get('window').width*0.1,
            }}></View>
                <Text style={[styles.title,{marginBottom:30,}]}>{route.params.title}</Text>
                <Text style={[styles.desc,{marginBottom:30}]}>{route.params.description}</Text>
        </ScrollView>
    )
}

export default Post
