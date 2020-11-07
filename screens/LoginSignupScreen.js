import * as React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginSignupScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
        }
    }

    userSignUp=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((response)=>{return Alert.alert("User Successfully Signed In")})
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        });
    }

    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((response)=>{return Alert.alert("User Successfully Logged In")})
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        });
    }

    render(){
        return(
            <View style={{backgroundColor:'#F8BE85'}}>
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
                            this.userSignUp(this.state.email,this.state.password);
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
    }
  })