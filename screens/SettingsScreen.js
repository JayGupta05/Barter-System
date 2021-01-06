import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            firstName:"",
            lastName:"",
            address:"",
            phoneNumber:"",
            docId:"",
        }
    }

    componentDidMount=()=>{
        this.getData();
    }

    getData=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection("Users").where('email','==',email).get().then(
            snapshot=>{
                snapshot.forEach(doc=>{
                    var data = doc.data();
                    this.setState({
                        firstName:data.firstName,
                        lastName:data.lastName,
                        contact:data.contact,
                        address:data.address,
                        docId:doc.id,
                    })
                })
            }
        )
    }

    updateData=()=>{
        db.collection("Users").doc(this.state.docId).update({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            address:this.state.address,
        })
        Alert.alert("File Updated Successfully");
    }

    render(){
        return(
            <View style={styles.container}>
             <View style={styles.formContainer}>
                 <TextInput
                    style={styles.formTextInput}
                    placeholder="First Name"
                    maxLength={8}
                    onChangeText={(text)=>{
                        this.setState({
                            firstName:text,
                        })
                    }}
                    value={this.state.firstName}
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
                    value={this.state.lastName}
                 />
                 <TextInput
                    style={styles.formTextInput}
                    placeholder="Phone Number"
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={(text)=>{
                        this.setState({
                            phoneNumber:text,
                        })
                    }}
                    value={this.state.contact}
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
                    value={this.state.address}
                 />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>{
                        this.updateData();
                    }}
                >
                    <Text style={styles.buttonText}>
                        Save
                    </Text>
                 </TouchableOpacity>
             </View>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:150,
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })