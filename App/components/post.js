import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles/postStyles';

/*
    This is a post component formed of title, description and image
*/

const Post = ({post,navigation}) => {
    return (
            <TouchableOpacity onPress={()=>navigation.navigate('Post',post)} style={styles.postContainer}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Image source={require('../assets/defaultuser.png')} style={styles.user}/>
                        <View>
                            <Text style={styles.name}>Me</Text>
                            <Text style={styles.time}>{post.createdAt.substring(0,10) +"    "+ post.createdAt.substring(11,19)}</Text>
                        </View>
                        <Image source={require('../assets/3dots.png')} style={styles.dots}/>
                    </View>
                    <View>
                    </View>
                    <Image source={{uri:post.image}} style={styles.image} />
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.desc}>{post.description.length>120?post.description.substring(0,120)+"...":post.description}</Text>
            </TouchableOpacity>
    )
}



export default Post
