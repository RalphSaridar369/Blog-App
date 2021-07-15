import React, {useState, useContext, useRef, useEffect} from 'react';
import Button from './Button';
import { AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image, TextInput, Text, Keyboard, TouchableWithoutFeedback,
     Alert, Dimensions, Modal, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles/create';
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



const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] =useState(visible);
    const scaleValue =useRef(new Animated.Value(0)).current;
   useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={stylesModal.modalBackGround}>
          <Animated.View
            style={[stylesModal.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };


const Create = () => {

    const [visible, setVisible] = useState(false);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
                style={{}}
                validationSchema={createSchema}
                initialValues={{ title:'', description:''}}
                onSubmit={(values,actions)=>{
                        create({...values,...imageUri});
                        Alert.alert("Post Creation","Post was created");
                        actions.resetForm();
                        setImageUri("");
                        }}>
                    {(formikProps)=>(
            
                    <View style={styles.createContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                            <View style={styles.inputsContainer}>
                                    <TouchableWithoutFeedback
                                        onPress={() => setVisible(true)}>
                                        {imageUri
                                        ?<Image source={imageUri} style={styles.image} ref={refImg} />
                                        :<Image source={require('../assets/default.jpg')} style={styles.image} />}
                                    </TouchableWithoutFeedback>
                
                                    <ModalPoup visible={visible}>
                                        <View style={{alignItems: 'flex-end'}}>
                                            <View style={styles.header}>
                                                <TouchableOpacity onPress={() => setVisible(false)}
                                                 style={{position:'relative', top:0, marginBottom:40,}}>
                                                    <Icon name="close" size={30} color="red"/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', marginBottom:50}}>
                                            <TouchableOpacity onPress={()=>{
                                                setVisible(false);
                                                openCam();
                
                                            }}>
                                                <Icon name="camera" color="#228B22" size={40} style={{marginHorizontal:50}}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{
                                                setVisible(false);
                                                openGallery();
                
                                                }}>
                                                <Icon name="photo" color="#228B22" size={40} style={{marginHorizontal:50}}/>
                                            </TouchableOpacity>
                                        </View>
                                    </ModalPoup>
                               {/* <Text style={{fontSize:15,textAlign:'center',fontFamily:'Roboto-Regular', color:'black'}}>or simply take a picture</Text>
                                <Icon name="camera" size={40} color="#228B22"
                                 style={{textAlign:'center',marginVertical:20}}
                                    onPress={()=>openCam()}/> */}
                                <View style={{display:"flex",justifyContent:'center',alignItems:'center',marginTop:5}}>
                                    <Text style={{fontSize:30,color:'#228B22',fontFamily:'Roboto-Regular'}}>Create&nbsp;
                                    <Text style={{fontSize:30,color:"black",fontFamily:'Roboto-Regular'}}>Blog</Text></Text>
                                </View>
                                <View style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                                    <Text style={styles.error}>{(formikProps.touched.title &&formikProps.errors.title )||(formikProps.touched.description && formikProps.errors.description)}</Text>
                                </View>
                                <View style={styles.iconandinput}>
                                    <TextInput placeholder="Title" style={styles.inputs}
                                     value={formikProps.values.title}
                                     onChangeText={formikProps.handleChange('title')}
                                     onBlur={formikProps.handleBlur('title')}
                                      />
                
                                </View>
                                <View style={styles.iconandinput}>
                                    <TextInput placeholder="Description" style={styles.inputs}
                                     multiline = {true} numberOfLines = {4}
                                     value={formikProps.values.description}
                                     onChangeText={formikProps.handleChange('description')}
                                     onBlur={formikProps.handleBlur('description')}
                                     />
                                </View>
                
                                <View style={{marginHorizontal:Dimensions.get('window').width*0.05}}>
                                    <Button title="Submit"
                                    color="#228B22" style={styles.button}
                                    onPress={formikProps.handleSubmit}/>
                                </View>
                        </View>
            </TouchableWithoutFeedback>
                    </View>)}
                </Formik>
        </TouchableWithoutFeedback>
    )
}

const stylesModal = StyleSheet.create({
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });
  

export default Create
