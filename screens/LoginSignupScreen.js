import * as React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, KeyboardAvoidingView,ScrollView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginSignupScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            isModalVisible:false,
            firstName:'',
            lastName:'',
            address:'',
            phoneNumber:'',
            confirmPassword:'',
        }
    }

    userSignUp=(email,password,confirmPassword)=>{
        if(password!=confirmPassword){
            return Alert.alert("Passwords don't match")
        } else{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((response)=>{
                db.collection('Users').add(
                    {
                        "firstName":this.state.firstName,
                        "lastName":this.state.lastName,
                        "address":this.state.address,
                        "phoneNumber":this.state.phoneNumber,
                        "email":this.state.email,
                    }
                )
                return Alert.alert("User Added")})
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });
        }
    }

    userLogin=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{return Alert.alert("User Successfully Logged In")})
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        });
    }

    showModal=()=>{
        return(
            <Modal 
                animationType='fade'
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:"100%"}}> 
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>
                                Registration
                            </Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="First Name"
                                maxLength={8}
                                onChangeText={(text)=>{
                                    this.setState({
                                        firstName:text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="Last Name"
                                maxLength={8}
                                onChangeText={(text)=>{
                                    this.setState({
                                        lastName:text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="Address"
                                multiline={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        address:text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="PhoneNumber"
                                keyboardType="numeric"
                                onChangeText={(text)=>{
                                    this.setState({
                                        phoneNumber:text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="Email"
                                keyboardType="email-address"
                                onChangeText={(text)=>{
                                    this.setState({
                                        email:text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        password:text,
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        confirmPassword:text,
                                    })
                                }}
                            />
                            <TouchableOpacity 
                                style={styles.registerButton}
                                onPress={()=>{
                                    this.userSignUp(this.state.email,this.state.password,this.state.confirmPassword)
                                }}
                            >
                                <Text style={styles.registerButtonText}>Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.registerButton}
                                onPress={()=>{
                                    this.setState({
                                        isModalVisible:false
                                    })
                                }}
                            >
                                <Text style={styles.registerButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style={{backgroundColor:'#F8BE85'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {
                        this.showModal()
                    }
                </View>
                <View style={{marginLeft:100}}>
                    <Text style={styles.title}>Barter</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={[styles.loginBox,{marginTop:150}]}
                        placeholder='Email'
                        value={this.state.email}
                        keyboardType='email-address'
                        onChangeText={(text)=>{
                            this.setState({
                                email:text,
                            });
                        }}
                    />
                    <TextInput
                        style={styles.loginBox}
                        placeholder='Password'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text,
                            });
                        }}
                    />
                    <TouchableOpacity 
                        style={[styles.button,{marginTop:20,marginBottom:20}]} 
                        onPress={()=>{
                            this.userLogin(this.state.email,this.state.password);
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button,{marginBottom:200}]} 
                        onPress={()=>{
                            this.setState({
                                isModalVisible:true
                            })
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#F8BE85'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10,
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      alignItems:'center'
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
  })