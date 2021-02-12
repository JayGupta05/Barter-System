import * as React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class Receiver extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParam("Details")["userName"],
            requestId:this.props.navigation.getParam("Details")["exchangeId"],
            itemName:this.props.navigation.getParam("Details")["itemName"],
            reason:this.props.navigation.getParam("Details")["description"],
            receiverName:"",
            receiverContact:"",
            receiverAddress:"",
        }
    }

    componentDidMount=()=>{
        this.getUserDetails();
        this.addNotification();
    }

    getUserDetails=()=>{
        db.collection("Users").where("email","==",this.state.userId).get()
        .then(
            snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        receiverName:doc.data().firstName,
                        receiverAddress:doc.data().address,
                        receiverContact:doc.data().phoneNumber,
                    })
                })
            }
        )
    }

    addNotification=()=>{
        var message = this.state.receiverName + " has shown interest in donating the book.";
        db.collection("allNotifications").add({
            "targetedUserId":this.state.receiverId,
            "donorId":this.state.userId,
            "requestId":this.state.requestId,
            "itemName":this.state.itemName,
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "notificationStatus":"unread",
            "message":message
        })
    }

    updateExchangeStatus=()=>{
        db.collection("allExchanges").add({
            "itemName":this.state.itemName,
            "exchangeId":this.state.requestId,
            "exchangedBy":this.state.receiverName,
            "donorId":this.state.userId,
            "requestStatus":"Donor Interested",
        })
    }

    render(){
        return(
            <View style={styles.container}>
            <View>
            <Header
                    leftComponent={
                        <Icon 
                            name="arrow-left" 
                            type="feather" 
                            color="#696969" 
                            onPress={()=>{this.props.navigation.goBack();}}
                        />
                    }
                    centerComponent={{
                        text:"Exchange Books",
                        style:{color:"#90A5A9", fontSize:20, fontWeight:"bold"},
                    }}
                    backgroundColor="#EAF8FE"
                />
            </View>
            <View style={{flex:0.3}}>
                <Card title="Item Information" titleStyle={{fontSize:20}}>
                    <Card>
                        <Text style={{fontWeight:"bold"}} >
                            Name: {this.state.itemName}
                        </Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight:"bold"}} >
                            Reason: {this.state.reason}
                        </Text>
                    </Card>
                </Card>
            </View>  
            <View style={{flex:0.3,marginTop:90}}>
                <Card title="Receiver Details" titleStyle={{fontSize:20,}}>
                    <Card>
                        <Text style={{fontWeight:"bold"}} >
                            Name: {this.state.receiverName}
                        </Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight:"bold"}} >
                            Contact: {this.state.receiverContact}
                        </Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight:"bold"}} >
                            Address: {this.state.receiverAddress}
                        </Text>
                    </Card>
                </Card>
            </View>     
            <View style={styles.buttonContainer}>
                {
                    this.state.receiverId!=this.state.userId
                    ? (
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>{
                                this.updateExchangeStatus();
                                this.addNotification();
                            }}
                        >
                            <Text>
                                Exchange
                            </Text>
                        </TouchableOpacity>
                    )
                    : null                        
                }
            </View>         
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:300,
      height:50,
      marginTop:180,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })