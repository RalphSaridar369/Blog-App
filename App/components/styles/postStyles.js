import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    postContainer:{
        flex: 1,
        borderWidth:0.2,
        borderColor:'gray',
        paddingBottom:100
    },
    user:{
        height:50,
        width:50,
        marginTop:10,
        marginHorizontal:10,
    },
    time:{
        fontStyle:'italic'
    },
    name:{
        marginTop:15,
        fontWeight:'bold'
    },
    dots:{
        height:30,
        width:30,
        position:'absolute',
        top:10,
        right:10,
    },
    image:{
        borderWidth:2,
        width:Dimensions.get('window').width,
        height:300,
        marginVertical:10,
    },
    title:{
        fontFamily:'Roboto-Regular',
        fontSize: 30,
        paddingHorizontal:20,
    }, 
    desc:{
        fontSize:20,
        fontFamily:'Roboto-Regular',
        marginVertical:10,
        paddingHorizontal:20,
    }
});