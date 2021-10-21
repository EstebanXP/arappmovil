import React, {useEffect} from "react";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import firebase from "../database/firebase";
export default function Home({navigation}/*Si se necesita que el componente vaya a otras pantallas, necesita heredar esto */) {
    useEffect(()=>{
        this.unsubscribe = firebase.firebase.app().auth().onAuthStateChanged(user =>{
            if(!user){
                navigation.navigate('Login User');
            }
        })
    });
    return (
      <View style={styles.container}>
        <Button
            title="Ir a administrar bandas"
            onPress={() => navigation.navigate('Bands Management')}
        />
        <Button
            title="Ir a lista de live shows"
            onPress={() => navigation.navigate('Live Shows List')}
        />
        <Button
            title="Ir a administrar set lists"
            onPress={() => navigation.navigate('Set List Management')}
        />
        <Button
            title="Ir a administrar canciones"
            onPress={() => navigation.navigate('Add Songs')}
        />
        <Button
            title="Ir a Lista de etiquetas"
            onPress={() => navigation.navigate('Tags List')}
        />
        <Button
            title="Ir a administrar miembros de banda"
            onPress={() => navigation.navigate('Band Members List')}
        />
        <Button
            title="Ir a registrar un usuario"
            onPress={() => navigation.navigate('Register User')}
        />
        <Button
            title="Ir a iniciar sesion"
            onPress={() => navigation.navigate('Login User')}
        />
        <Button
            title="Ir a mostrar canciones"
            onPress={() => navigation.navigate('Show Songs')}
        />
      </View>
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
  