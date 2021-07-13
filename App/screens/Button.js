import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{   
        marginVertical:10,
        height:36,
        borderRadius:6,
        borderColor:'#228B22',
        borderWidth:1,
        textAlign:'center',
        backgroundColor:'#228B22'
    },
    text:{
        fontSize:20,
        color:'white',
        textAlign:'center',
    }
})

export default Button
