import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

// import { Container } from './styles';

const Settings = () => {
  const logOut = async () => {
    try {
      const res = await app.auth().signOut();
    } catch (e) {
      Alert.alert("We have trouble close your session, try again...");
    }
  };

  return (
    <View>
      <TouchableHighlight onPress={logOut}>
        <Text>Cerrar sesion</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Settings;
