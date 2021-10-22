import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function BandsList(props,{navigation}) {

    const [Bands, setBands] = useState([])
    const [sort, setSort] = useState("bandName");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('Bands').orderBy(sort).onSnapshot(querySnapshot=>{
          const Bands = [];
          querySnapshot.docs.forEach(doc=>{
            const {bandName, bandLogo, bandDescription, bandGenres,} = doc.data()
            Bands.push({
              id: doc.id,
              bandName,
              bandLogo,
              bandDescription,
              bandGenres,
            })
          })
          if(!unmounted)
          setBands(Bands)
        })
        return () => {
          unmounted = true;
        }
    },[sort])

    return ( 
      <SafeAreaView>
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
          <Button
            title="Crear Banda"
            onPress={() => props.navigation.navigate('Bands Create')}
        />
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="bandName" />
        <Picker.Item label="Genero" value="bandGenres" />
        </Picker>
          {
            Bands.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.bandName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }else if(val.BandGenres.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }
            }).map(band =>{
              return(
                <ListItem key={band.id} bottomDivider onPress={() => {
                  props.navigation.navigate('Bands Management', {
                    bandId: band.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{band.bandName}</ListItem.Title>
                    <ListItem.Subtitle>{band.bandGenres}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            })
          }
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
 