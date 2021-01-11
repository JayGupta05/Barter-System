import * as React from 'react';
import {View, Text, TextInput,StyleSheet, KeyboardAvoidingView, TouchableOpacity,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userName:firebase.auth().currentUser.email,
            itemName:"",
            description:"",
        }
    }

    createUniqueId=()=>{
        return Math.random().toString(36).substring(7);
    }

    addItem=(itemName, description)=>{
        var userName = this.state.userName;
        var uniqueId = this.createUniqueId();
        db.collection('Exchanges').add({
            "userName":userName,
            "itemName":itemName,
            "description":description,
            "exchangeId":uniqueId,
        })
        this.setState({
            itemName:'',
            description:'',
        })
        return Alert.alert("Exchanged Successfully");
    }

    render(){
        return(
            <View>
                <TextInput
                    style={[styles.formTextInput,{marginTop:200}]}
                    placeholder="Item Name"
                    onChangeText={(text)=>{
                        this.setState({
                            itemName:text
                        })
                    }}
                    value={this.state.itemName}
                />
                <TextInput
                    style={styles.formTextInput}
                    placeholder="Description"
                    onChangeText={(text)=>{
                        this.setState({
                            description:text
                        })
                    }}
                    value={this.state.description}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        this.addItem(this.state.itemName,this.state.description);
                    }}
                >
                    <Text>
                        Exchange
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginTop:50,
        marginLeft:50,
        },
})