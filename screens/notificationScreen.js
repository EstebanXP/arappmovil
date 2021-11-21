import React from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Noti",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Noti",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d722",
    title: "Third Noti",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d712",
    title: "Fourth Noti",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71342",
    title: "Fifth Noti",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29da71112",
    title: "Sixth Noti",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e2",
    title: "Seventh Noti",
  },
];

export default function notificationScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
