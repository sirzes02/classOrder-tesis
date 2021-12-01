import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Text, TouchableHighlight } from "react-native";
import { app } from "../../firebase";
import { getImage } from "../../functions/main";
import GetDirection from "../GetDirection";
import {
  Container,
  ImageProfile,
  ItemOption,
  Separator,
  TextEmail,
} from "./styles";

const Settings = ({ navigation }) => {
  const logOut = async () => {
    try {
      const res = await app.auth().signOut();
    } catch (e) {
      Alert.alert("We have trouble close your session, try again...");
      console.log(e);
    }
  };

  const redirectTo = (itemList) => navigation.push(itemList);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Test" options={{ title: "Settings" }}>
        {() => (
          <Container style={{ paddingTop: 10 }}>
            <ImageProfile source={getImage()} />
            <TextEmail>{app.auth().currentUser.email}</TextEmail>
            <Separator />
            <ItemOption
              onPress={() => redirectTo("GetDirection")}
              underlayColor="rgba(73,182,77,1,0)"
            >
              <Text>Mapa</Text>
            </ItemOption>
            <TouchableHighlight onPress={logOut}>
              <Text>Cerrar sesion</Text>
            </TouchableHighlight>
          </Container>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="GetDirection"
        component={GetDirection}
        options={{ title: "My Location" }}
      />
    </Stack.Navigator>
  );
};

export default Settings;
