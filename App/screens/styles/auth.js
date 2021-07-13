import { StyleSheet, Dimensions } from "react-native";

const ht = Dimensions.get('window').height;
const wt = Dimensions.get('window').width;

export default StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    bodyContainer:{
        marginTop:ht/6,
        zIndex:10,
    },
    inputsContainer:{
        marginHorizontal: wt-wt*0.8
    },
    inputs:{
        flex:1,
        fontSize:20,
    },
    iconandinput:{
        flexDirection:'row',
        marginVertical:5,
        borderRadius:6,
        borderColor:'#d3d3d3',
        borderWidth:1,
        backgroundColor:'#fff',
        padding:0
    },
    icon:{
        paddingTop:15,
        paddingHorizontal:10,
    },
    logo:{
        width:150,
        height:150,
    },
    logoContainer:{
        marginVertical:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    error:{
        color:'red',
        opacity:0.8,
    },
    button:{
        borderRadius:60,
        borderColor:'gray',
        borderWidth:1,
    },
    linkContainer:{
        marginHorizontal: wt-wt*0.8,
        marginVertical:10,
    },
    link:{
        marginLeft:10,
        color:'#228B22',
        textDecorationColor:'#228B22',
        textDecorationLine:'underline',
    },
    image:{
        width:wt-wt*0.4,
        height:200,
        marginVertical:40,
        marginHorizontal:20

    }
})