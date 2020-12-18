import * as React from 'react-native';
import {View, Text, TouchableOpacity,StyleSheet, FlatList, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allExchanges:[],
        }
        this.exchangeRef=null;
    }

    getAllExchanges=()=>{
        this.exchangeRef=db.collection("Exchanges").onSnapshot((data)=>{
            var exchanges = data.docs.map(
                document=>document.data()
            )
            this.setState({
                allExchanges:exchanges,
            })
        })
    }

    keyExtractor=(item,index)=>{
        index.toString();
    }

    renderItem=({item,i})=>{
        return(
            <ListItem
                key={i}
                title={item.itemName}
                subtitle={item.description}
                titleStyle={{
                    color:'black',
                    fontWeight:'bold',
                }}
                rightElement={
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={{color:"#ffffff"}}>
                            View
                        </Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        );
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    {   this.state.allExchanges===[]
                        ? 
                            (
                                <View style={styles.subContainer}>
                                    <Text>List Of Requested Books</Text>
                                </View>
                            )
                        :
                            (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allExchanges}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
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
       }
    }
});