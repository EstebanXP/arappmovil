import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import firebase from "../database/firebase";
import Item from "./Item";
import LoginUser from "./loginUser";
import RegisterUser from "./registerUser";
import songsManagement from "../screens/songsManagement";
import useRoleContext from "../useContext/useRoleContext";
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box , Heading, Image} from "native-base";
import Demo from "../screens/demoNavigation";
import {TouchableOpacity} from 'react-native-gesture-handler'
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
                <VStack space={4} alignItems="center" mt="4" position="absolute" top="2" w="90%" right="5%" left="5%">                
                  <Pressable
                  width="100%" h="32"  borderRadius="20" shadow={9}
                  textColor="white"
                  bg="#000"
                  >
                    <TouchableOpacity  onPress={() => navigation.navigate("Live Shows List")}>
                      <Box  width="100%" h="32">
                        <Heading textAlign="center" mt="auto" mb="auto" zIndex="3"  color="white">Shows</Heading>
                        <Image
                        opacity=".5"
                        width="100%" h="32"
                        borderRadius="20" 
                        resizeMode={"cover"}
                        position="absolute"
                        source={{
                            uri: "https://images.unsplash.com/photo-1501694159270-7b55f5eb85fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                        }}
                        alt="Shows"
                        />
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                  <Pressable
                  width="100%" h="32"  borderRadius="20" shadow={9}
                  textColor="white"
                  bg="#000"
                  >
                    <TouchableOpacity  onPress={() => navigation.navigate("Bands List")}>
                      <Box  width="100%" h="32">
                        <Heading textAlign="center" mt="auto" mb="auto" zIndex="3"  color="white">Bands</Heading>
                        <Image
                        opacity=".5"
                        width="100%" h="32"
                        borderRadius="20" 
                        resizeMode={"cover"}
                        position="absolute"
                        source={{
                            uri: "https://images.unsplash.com/photo-1598518141787-5be70e839626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
                        }}
                        alt="Bands"
                        />
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                </VStack>
              </NativeBaseProvider>
            );
          case "Live Experience Designer":
            return (
              <NativeBaseProvider>
                <VStack space={4} alignItems="center" mt="4" position="absolute" top="2" w="90%" right="5%" left="5%">                
                  <Pressable
                  width="100%" h="32"  borderRadius="20" shadow={9}
                  textColor="white"
                  bg="#000"
                  >
                    <TouchableOpacity  onPress={() => navigation.navigate("Show Song")}>
                      <Box  width="100%" h="32">
                        <Heading textAlign="center" mt="auto" mb="auto" zIndex="3"  color="white">Songs</Heading>
                        <Image
                        opacity=".5"
                        width="100%" h="32"
                        borderRadius="20" 
                        resizeMode={"cover"}
                        position="absolute"
                        source={{
                            uri: "https://images.unsplash.com/photo-1596301448249-860401fa31a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                        }}
                        alt="Songs"
                        />
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                  <Pressable
                  width="100%" h="32"  borderRadius="20" shadow={9}
                  textColor="white"
                  bg="#000"
                  >
                    <TouchableOpacity  onPress={() => navigation.navigate("SetList List")}>
                      <Box  width="100%" h="32">
                        <Heading textAlign="center" mt="auto" mb="auto" zIndex="3"  color="white">Setlists</Heading>
                        <Image
                        opacity=".5"
                        width="100%" h="32"
                        borderRadius="20" 
                        resizeMode={"cover"}
                        position="absolute"
                        source={{
                            uri: "https://images.unsplash.com/photo-1540829016269-e05670f88adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                        }}
                        alt="Setlists"
                        />
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                </VStack>
              </NativeBaseProvider>
            );
          case "Band Manager":
            return (
              <NativeBaseProvider>
                <VStack space={4} alignItems="center" mt="4" position="absolute" top="2" w="90%" right="5%" left="5%">                
                  <Pressable
                  width="100%" h="32"  borderRadius="20" shadow={9}
                  textColor="white"
                  bg="#000"
                  >
                    <TouchableOpacity  onPress={() => navigation.navigate("Live Shows List")}>
                      <Box  width="100%" h="32">
                        <Heading textAlign="center" mt="auto" mb="auto" zIndex="3"  color="white">Shows</Heading>
                        <Image
                        opacity=".5"
                        width="100%" h="32"
                        borderRadius="20" 
                        resizeMode={"cover"}
                        position="absolute"
                        source={{
                            uri: "https://images.unsplash.com/photo-1501694159270-7b55f5eb85fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                        }}
                        alt="Shows"
                        />
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                  <Pressable
                  width="100%" h="32"  borderRadius="20" shadow={9}
                  textColor="white"
                  bg="#000"
                  >
                    <TouchableOpacity  onPress={() => navigation.navigate("Bands List")}>
                      <Box  width="100%" h="32">
                        <Heading textAlign="center" mt="auto" mb="auto" zIndex="3"  color="white">Bands</Heading>
                        <Image
                        opacity=".5"
                        width="100%" h="32"
                        borderRadius="20" 
                        resizeMode={"cover"}
                        position="absolute"
                        source={{
                            uri: "https://images.unsplash.com/photo-1598518141787-5be70e839626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
                        }}
                        alt="Bands"
                        />
                      </Box>
                    </TouchableOpacity>
                  </Pressable>
                </VStack>
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
