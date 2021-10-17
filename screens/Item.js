import React,{useState,useEffect} from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function Item({item}){
    const [var1,setVar1]= useState("Hola mundo");
    useEffect(()=>{
     },[])

    return (
        <View>
            <Text>{var1}</Text>
        </View>
    )
}