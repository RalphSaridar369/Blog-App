import React, {useContext} from 'react';
import Button from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput, Text, Image, ImageBackground, View, Keyboard, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import styles from './styles/auth';
import {Formik} from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../components/context';
import { valuesIn } from 'lodash-es';

/*
    This is the login page
    where we validate if the user inputs are correct
    if so we will redirect him to the homepage 
    otherwise we will show him errors
*/

const loginSchema = yup.object({
    username:yup.string().required(),
    password:yup.string().required(),
})

const Login = ({ navigation }) => {

    const {signIn} = useContext(AuthContext);

    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} style={styles.container}>
            <ImageBackground source={require('../assets/bg.jpg')}
            style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, zIndex:-10}}>
                <View style={styles.bodyContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../assets/logo.png")} style={styles.logo}/>
                    </View>
                    <Formik
                        validationSchema={loginSchema}
                        initialValues={{ username:'', password:''}}
                        onSubmit={(values)=>signIn(values)}>
                            {(formikProps)=>(
                            <View style={styles.inputsContainer}>
                                <View style={styles.iconandinput}>
                                    <Icon style={styles.icon} name="user" size={20} color="#228B22"/>   
                                    <TextInput placeholder="username" style={styles.inputs}
                                    value={formikProps.values.username}
                                    onChangeText={formikProps.handleChange('username')}
                                    onBlur={formikProps.handleBlur('username')}/>
                                </View>

                                <Text style={styles.error}>{formikProps.touched.username && formikProps.errors.username}</Text>

                                <View style={styles.iconandinput}>
                                   <Icon style={styles.icon}  name="lock" size={20} color="#228B22"/>
                                    <TextInput placeholder="password" style={styles.inputs} secureTextEntry={true}
                                    value={formikProps.values.password}
                                    onChangeText={formikProps.handleChange('password')}
                                    onBlur={formikProps.handleBlur('password')}/>
                                </View>

                                <Text style={styles.error}>{formikProps.touched.password && formikProps.errors.password}</Text>

                                <Button title="Login" color="#228B22" style={styles.button}
                                onPress={formikProps.handleSubmit}/>
                            </View>
                            )}
                    </Formik>
                </View>
                <View style={styles.linkContainer}>
                    <Text>Don't have an account?&nbsp;&nbsp;&nbsp;
                        <Text onPress={()=>navigation.navigate("Signup")} style={styles.link}>Sign up</Text>
                    </Text>
                </View>
                </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

export default Login
