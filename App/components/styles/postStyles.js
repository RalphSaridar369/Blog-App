import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    image:{
        width:Dimensions.get('window').width-40,
        height:300,
        marginVertical:40,
        marginHorizontal:20
    },
    title:{
        marginTop:30,
        fontSize:30,
        fontFamily:'Roboto-Bold',
        textAlign:'center',
    }, 
    desc:{
        fontSize:20,
        fontFamily:'Roboto-Regular',
        textAlign:'center',
        marginVertical:20,
        paddingHorizontal:20,
    }
});