import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function liveShowsManagement(props,{navigation}) {

    const [liveShows, setLiveShows] = useState([])

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('LiveShows').onSnapshot(querySnapshot=>{
          const liveShows = [];
          querySnapshot.docs.forEach(doc=>{
            const {showLocation, showName, showTour, showDate, showPlace, showBand,} = doc.data()
            liveShows.push({
              id: doc.id,
              showLocation,
              showName,
              showTour,
              showDate,
              showPlace,
              showBand,
            })
          })
          if(!unmounted)
          setLiveShows(liveShows)
        })
        return () => {
          unmounted = true;
        }
    })

    return ( 
      <SafeAreaView>
          <Button
            title="Crear live show"
            onPress={() => props.navigation.navigate('Live Shows Create')}
        />
          {
            liveShows.map(liveShow =>{
              return(
                <ListItem key={liveShow.id} bottomDivider onPress={() => {
                  props.navigation.navigate('Live Shows Management', {
                    showId: liveShow.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{liveShow.showName}</ListItem.Title>
                    <ListItem.Subtitle>{liveShow.showDate}</ListItem.Subtitle>
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
 