import React, {useState, useContext, useRef} from 'react';
import Button from './Button';
import { AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image, TextInput, Text, ScrollView, TouchableWithoutFeedback, Alert} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles/auth';
import {Formik} from 'formik';
import * as yup from 'yup';

/*
    This is where we will create a new post
    the user will have the option to choose
    either an image from the gallery or capture
    a photo instantly

    it is also required to insert descripion and 
    title of the post 
*/

const createSchema = yup.object({
    title:yup.string()
        .required()
        .min(6, 'Title must be longer than 6 characters')
        .max(30, 'Title must be shorter than 30 characters'),
    description:yup.string()
        .required()
        .min(10, 'Description must be longer than 10 characters')
        .max(50, 'Description must be shorter than 50 characters'),
})

const Create = () => {

    const {create, userToken} = useContext(AuthContext);
    const refImg = useRef();
    const [imageUri,setImageUri]=useState("");

    console.log("User token: ",userToken);

    const openCam=()=>{
        let options = {
            storageOptions:{
                path: 'images',
                mediaType:'photo',
            },
            includeBase64:true,
        };

        launchCamera(options,(response=>{
            console.log("Response : ",response);
            if(response.didCancel)
                console.log('User cancelled image picker');
            else if(response.error)
                console.log("error: ",response.error)
            else if(response.customButton)
                console.log("user tapped: ", response.customButton);
            else{
               // console.log(response.assets[0].uri);
                const source = {uri:response.assets[0].uri}
                setImageUri(source);
            }
        }
        ))
    }   
    
    const openGallery=()=>{
        let options = {
            storageOptions:{
                path: 'images',
                mediaType:'photo',
            },
            includeBase64:true,
        };

        launchImageLibrary(options,(response=>{
            if(response.didCancel)
                console.log('User cancelled image picker');
            else if(response.error)
                console.log("error: ",response.error)
            else if(response.customButton)
                console.log("user tapped: ", response.customButton);
            else{
                //console.log(response.assets[0].uri);
                const source = {uri:response.assets[0].uri}
                setImageUri(source);
            }
        }
        ))
    }

    return (
        <ScrollView>
        <Formik
        style={{marginTop:20,}}
            validationSchema={createSchema}
            initialValues={{ title:'', description:''}}
            onSubmit={(values,actions)=>{
                    create({...values,...imageUri});
                    Alert.alert("Post Creation","Post was created");
                    actions.resetForm();
                    setImageUri("");
                    }}>
                {(formikProps)=>(
                
                <View style={styles.container}>
                    
                    <View style={styles.inputsContainer}>
                        <TouchableWithoutFeedback
                            onPress={()=>openGallery()}>
                            {imageUri
                            ?<Image source={imageUri} style={styles.image} ref={refImg} /> 
                            :<Image source={require('../assets/default.jpg')} style={styles.image} />}
                        </TouchableWithoutFeedback>
                        <Text style={{fontSize:15,textAlign:'center',fontFamily:'Roboto-Regular', color:'black'}}>or simply take a picture</Text>
                        <Icon name="camera" size={40} color="#228B22"
                         style={{textAlign:'center',marginVertical:20}}
                         onPress={()=>openCam()}/>
                        <View style={styles.iconandinput}>
                            <TextInput placeholder="Title" style={styles.inputs}
                             value={formikProps.values.title}
                             onChangeText={formikProps.handleChange('title')}
                             onBlur={formikProps.handleBlur('title')}
                              />
                        
                        </View>
                        <Text style={styles.error}>{formikProps.touched.title && formikProps.errors.title}</Text>
                        <View style={styles.iconandinput}>
                            <TextInput placeholder="Description" style={styles.inputs}
                             multiline = {true} numberOfLines = {4}
                             value={formikProps.values.description}
                             onChangeText={formikProps.handleChange('description')}
                             onBlur={formikProps.handleBlur('description')}
                             />
                        </View>
                        
                        <Text style={styles.error}>{formikProps.touched.description && formikProps.errors.description}</Text>
                        <Button title="Submit"
                        color="#228B22" style={styles.button}
                        onPress={formikProps.handleSubmit}/>
                    </View>
                </View>)}

            </Formik> 
        </ScrollView>
    )
}

export default Create
