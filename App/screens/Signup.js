import React, {useContext} from 'react';
import Button from './Button';
import { AuthContext } from '../components/context';
import {TextInput, Text, Image, ImageBackground, View, Keyboard, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import styles from './styles/auth';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';

/*
    This is the signup page
    where we validate if the user inputs are correct
    and create for him a new account afterwards redirect him to the homepage 
    otherwise we will show him errors 
*/

const signupSchema = yup.object({
    username:yup.string()
        .required().min(8),
    password:yup.string()
        .required().min(8),
    confirmpassword: yup.string()
          .test('passwords-match', 'Passwords must match', function(value){
            return this.parent.password === value
          })
})


const Signup = ({ navigation }) => {

    
    const {signUp} = useContext(AuthContext);

    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}} style={styles.container}>
            <ImageBackground source={require('../assets/bg.jpg')}
            style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, zIndex:-10}}>
                <View style={styles.bodyContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../assets/logo.png")} style={styles.logo}/>
                    </View>
                    <Formik
                        validationSchema={signupSchema}
                        initialValues={{ username:'', password:'', confirmpassword:''}}
                        onSubmit={values => signUp(values)}>
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

                                <View style={styles.iconandinput}>
                                    <Icon style={styles.icon}  name="lock" size={20} color="#228B22"/>
                                    <TextInput placeholder="password" style={styles.inputs} secureTextEntry={true}
                                    value={formikProps.values.confirmpassword}
                                    onChangeText={formikProps.handleChange('confirmpassword')}
                                    onBlur={formikProps.handleBlur('confirmpassword')}/>
                                </View>

                                <Text style={styles.error}>{formikProps.touched.confirmpassword && formikProps.errors.confirmpassword}</Text>

                                <Button title="Sign up" color="#228B22" style={styles.button}
                                onPress={formikProps.handleSubmit}/>
                            </View>
                            )}
                    </Formik>
                </View>
                <View style={styles.linkContainer}>
                    <Text>Already have an account?&nbsp;&nbsp;&nbsp;
                        <Text style={styles.link} onPress={()=>navigation.navigate("Login")}>Login</Text>
                    </Text>
                </View>
                </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

export default Signup
