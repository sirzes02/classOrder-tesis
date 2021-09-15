import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { app } from "../../firebase";

// import { Container } from './styles';

const Home = () => {
  const logOut = async () => {
    const res = app.auth().signOut();

    console.log(res);
  };

  return (
    <View>
      <TouchableHighlight style={{ marginTop: 200 }} onPress={logOut}>
        <Text>HOLA</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Home;
