import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Text, TouchableHighlight } from "react-native";
import GetDirection from "../GetDirection";
import { app } from "../../firebase";

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
          <>
            <TouchableHighlight onPress={() => redirectTo("GetDirection")}>
              <Text>Mapa</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={logOut}>
              <Text>Cerrar sesion</Text>
            </TouchableHighlight>
          </>
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
