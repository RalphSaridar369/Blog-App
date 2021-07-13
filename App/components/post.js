import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';
import styles from './styles/postStyles';

/*
    This is a post component formed of title, description and image
*/

const Post = ({post}) => {
    return (
        <View>
            <Text style={styles.title}>{post.title}</Text>
            <Image source={{uri:post.image}} style={styles.image}/>
            <Text style={styles.desc}>{post.description}</Text>
        </View>
    )
}



export default Post
