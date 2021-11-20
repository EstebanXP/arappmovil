import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import firebase from "../database/firebase";
import Item from "./Item";
import LoginUser from "./loginUser";
import RegisterUser from "./registerUser";
import songsManagement from "../screens/songsManagement";
import useRoleContext from "../useContext/useRoleContext";
import { NativeBaseProvider, VStack, Center, Button } from "native-base";
import Demo from "../screens/demoNavigation";
export default function Home(
  {
    navigation,
  } /*Si se necesita que el componente vaya a otras pantallas, necesita heredar esto */
) {
  const [state1, setstate1] = useState(true);
  const roleAux = useRoleContext();

  useEffect(() => {});
  return (
    <View>
      {(() => {
        switch (roleAux) {
          case "Band Member":
            return (
              <NativeBaseProvider>
                  <VStack space={4} alignItems="center" mt="4" position="absolute" top="2" w="90%" right="5">                
                    
                      <Button
                      width="100%" h="32" bg="#241CC4" borderRadius="30" shadow={3}
                      textColor="white"
                      bg="indigo.600"
                      title="Ir a administrar set lists"
                      onPress={() => navigation.navigate("SetList List")}
                      >Ir a administrar set lists</Button>
                   
                    <Center w="64" h="20" bg="secondary.500" rounded="md" shadow={3} />
                    <Center w="64" h="20" bg="emerald.500" rounded="md" shadow={3} />
                    <Button
                    title="Ir a administrar sets"
                    onPress={() => navigation.navigate("Sets Lists")}
                  />
                  <Button
                      title="Ir a mostrar canciones"
                      onPress={() => navigation.navigate("Show Songs")}
                    />
                  <Button
                    title="Ir a Lista de etiquetas"
                    onPress={() => navigation.navigate("Tags List")}
                  />
                  <Button
                    title="Ir a administrar set lists"
                    onPress={() => navigation.navigate("SetList List")}
                  />
                  </VStack>
                  
                  
                
              </NativeBaseProvider>
            );
          case "Live Experience Designer":
            return (
              <NativeBaseProvider>
                <View>
                  <View>
                    <Button
                      title="Ir a Lista de etiquetas"
                      onPress={() => navigation.navigate("Tags List")}
                    />
                    <Button
                      title="Ir a mostrar canciones"
                      onPress={() => navigation.navigate("Show Songs")}
                    />
                    <Button
                      title="Ir a administrar canciones"
                      onPress={() => navigation.navigate("Add Songs")}
                    />
                    <Button
                      title="Ir a administrar set lists"
                      onPress={() => navigation.navigate("SetList List")}
                    />
                    <Button
                      title="Ir a administrar sets"
                      onPress={() => navigation.navigate("Sets Lists")}
                    />
                  </View>
                  
                </View>
              </NativeBaseProvider>
            );
          case "Band Manager":
            return (
              <NativeBaseProvider>
                <View>
                  <Button
                    title="Ir a administrar miembros de banda"
                    onPress={() => navigation.navigate("Band Members List")}
                  />
                  <Button
                    title="Ir a administrar bandas"
                    onPress={() => navigation.navigate("Bands List")}
                  />
                  <Button
                    title="Ir a lista de live shows"
                    onPress={() => navigation.navigate("Live Shows List")}
                  />
                </View>
              </NativeBaseProvider>
            );
          default:
            break;
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
<Button
        title="Ir a administrar bandas"
        onPress={() => navigation.navigate("Bands List")}
      />
      <Button
        title="Ir a lista de live shows"
        onPress={() => navigation.navigate("Live Shows List")}
      />
      <Button
        title="Ir a administrar set lists"
        onPress={() => navigation.navigate("Set List Management")}
      />
      <Button
        title="Ir a administrar canciones"
        onPress={() => navigation.navigate("Add Songs")}
      />
      <Button
        title="Ir a Lista de etiquetas"
        onPress={() => navigation.navigate("Tags List")}
      />
      <Button
        title="Ir a administrar miembros de banda"
        onPress={() => navigation.navigate("Band Members List")}
      />
      <Button
        title="Ir a registrar un usuario"
        onPress={() => navigation.navigate("Register User")}
      />
      <Button
        title="Ir a iniciar sesion"
        onPress={() => navigation.navigate("Login User")}
      />
      <Button
        title="Ir a mostrar canciones"
        onPress={() => navigation.navigate("Show Songs")}
      />
switch (roleAux) {
          case "Band Member":
            console.log("Hola desde band member");
            break;
          case "Live Experience Manager":
            console.log("Hola desde Live Experience MAnager");
          break;
          case "Band Manager":
            console.log("Hola desde Band Manager");  
          break;
          default:
            break;




             <Text>{roleAux}</Text>
      {(() => {
        switch (roleAux) {
          case "Band Member":
            return (
              <View>
                <Button
                  title="Ir a administrar canciones"
                  onPress={() => navigation.navigate("Add Songs")}
                />
                <Button
                  title="Ir a Lista de etiquetas"
                  onPress={() => navigation.navigate("Tags List")}
                />
                <Button
                  title="Ir a mostrar canciones"
                  onPress={() => navigation.navigate("Show Songs")}
                />
              </View>
            );
          case "Live Experience Designer":
            return (
              <View>
                <Text>{roleAux}</Text>
              </View>
            );
          case "Band Manager":
            return (
              <View>
                <Text>{roleAux}</Text>
              </View>
            );
          default:
            break;
        }
      })()}
*/
