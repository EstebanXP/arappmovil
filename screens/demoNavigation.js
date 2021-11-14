import React from 'react'
import { View } from 'react-native'
import { Container, Button, Center, NativeBaseProvider,Stack, Input, Heading, Text} from "native-base"
import { NavigationContext } from '@react-navigation/native';
export default function demoNavigation() {
    const navigation = React.useContext(NavigationContext);
    return (
        <View>
            <Button
                    title="Ir a administrar set lists"
                    onPress={() => navigation.navigate("Sets Lists")}
                  />
        </View>
    )
}
