import * as React from 'react';
import {View, Text, TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import { Icon, ListItem} from 'react-native-elements';
import firebase from 'firebase';

export default class MyExchanges extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[],
        }
    }

    getAllExchanges=()=>{
        db.collection("allDonations").where("donorId","==",this.state.userId).onSnapshot((snapshot)=>{
            var allBarters = snapshot.docs.map(document=>{
                document.data();
            })
            this.setState({
                allBarters:allBarters
            })
        })
    }

    render(){
        return(
            <View>
                <Text>
                    Hi My Name Is Jay
                </Text>
            </View>
        );
    }
}