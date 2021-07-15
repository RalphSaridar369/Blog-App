import { StyleSheet, Dimensions } from "react-native";

const ht = Dimensions.get('window').height;
const wt = Dimensions.get('window').width;


export default StyleSheet.create({
    createContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        position:'absolute',
        bottom:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    bodyContainer:{
        paddingVertical:20,
        width:wt,
        position:'absolute',
        bottom:20,
        backgroundColor:'#fff',
        marginTop:ht/6,
        zIndex:10,
    },
    inputsContainer:{
        marginHorizontal: wt-wt*0.95
    },
    inputs:{
        flex:1,
        fontSize:20,
        borderWidth:0.4,
        borderColor:'black',
        borderRadius:10,
    },
    iconandinput:{
        flexDirection:'row',
        borderRadius:10,
        marginTop:5,
        borderColor:'#d3d3d3',
        borderWidth:1,
        backgroundColor:'#fff',
        marginHorizontal: wt-wt*0.95,
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
    hr:{
        marginTop:10,
        marginHorizontal: wt-wt*0.95,
        borderTopColor:'#228B22',
        borderTopWidth:0.9,
    },
    linkContainer:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: wt-wt*0.8,
        marginVertical:10,
    },
    link:{
        fontSize:18,
        marginLeft:10,
        color:'#228B22',
    },
    image:{
        width:wt,
        height:ht-0.5*ht,

    }
})