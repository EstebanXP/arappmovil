import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({navigation}/*Si se necesita que el componente vaya a otras pantallas, necesita heredar esto */) {
    return (
      <View style={styles.container}>
        <Button
            title="Ir a administrar bandas chingonas"
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
            onPress={() => navigation.navigate('Songs Management')}
        />
        <Button
            title="Ir a administrar etiquetas"
            onPress={() => navigation.navigate('Tags Management')}
        />
        <Button
            title="Ir a administrar miembros de banda"
            onPress={() => navigation.navigate('Bands Members Management')}
        />
        <Button
            title="Ir a registrar un usuario"
            onPress={() => navigation.navigate('Register User')}
        />
        <Button
            title="Ir a iniciar sesion"
            onPress={() => navigation.navigate('Login User')}
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
  