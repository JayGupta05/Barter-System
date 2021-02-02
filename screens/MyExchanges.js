import * as React from 'react';
import {View, Text, TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import { Icon, ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class MyExchanges extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[],
        }
    }

    componentDidMount=()=>{
        this.getAllExchanges();
    }

    getAllExchanges=()=>{
        db.collection("allExchanges").where("donorId","==",this.state.userId).onSnapshot((snapshot)=>{
            var allBarters = snapshot.docs.map(document=>{
                return document.data();
            })
            this.setState({
                allBarters:allBarters
            })
            console.log(this.state.allBarters + "" + "Test")
        })
    }

    keyExtractor=(item,index)=>{
        index.toString();
    }

    renderItems=({item,i})=>(
        <ListItem
            key={i}
            title={item.itemName}
            subtitle={"Request By" + item.exchangedBy + "Status" + item.requestStatus}
            leftElement={
                <Icon 
                    name="book" 
                    type="feather" 
                    color ='#696969'
                />
            }
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:'#ffff'}}>Send Item</Text>
                </TouchableOpacity>
                }
                bottomDivider
        />
    )

    render(){
        return(
            <View style={{flex:1}}>
                {
                    this.state.allBarters.length === 0
                    ?(
                        <View style={styles.subtitle}>
                            <Text style={{ fontSize: 20}}>List of all Item Barters</Text>
                        </View>
                    )
                    :(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allBarters}
                            renderItem={this.renderItems}
                        />
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      },
      subtitle :{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
})