import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';

export default function bandmembersManagement(props,{navigation}) {

    const [bandMembers, setBandMember] = useState([])
    const [sort, setSort] = useState("memberName");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('bandMembers').orderBy(sort).onSnapshot(querySnapshot=>{
          const bandMembers = [];
          querySnapshot.docs.forEach(doc=>{
            const {memberName, userName, rol, } = doc.data()
            bandMembers.push({
              id: doc.id,
              memberName,
              userName,
              rol,
            })
          })
          if(!unmounted)
          setBandMember(bandMembers)
        })
        return () => {
          unmounted = true;
        }
    },[sort])

    return ( 
      <SafeAreaView>
          <Button
            title="Crear miembro"
            onPress={() => props.navigation.navigate('Band Members Create')}
        />
         <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="memberName" />
        <Picker.Item label="Rol" value="rol" />
        </Picker>
          {
            bandMembers.map(bandMember =>{
              return(
                <ListItem key={bandMember.id} bottomDivider onPress={() => {
                  props.navigation.navigate('Band Members Management', {
                    memberId: bandMember.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{bandMember.memberName}</ListItem.Title>
                    <ListItem.Subtitle>{bandMember.rol}</ListItem.Subtitle>
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
 