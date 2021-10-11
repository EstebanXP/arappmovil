import React,{useState,useEffect} from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function Item({item}){
    
    useEffect(()=>{
     },[])

    return (
        <View>
            <Text>{item}</Text>
        </View>
    )
}