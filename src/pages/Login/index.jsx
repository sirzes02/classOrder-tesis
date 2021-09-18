import React, { useState } from "react";
import {
  Container,
  ContainerInputs,
  Label,
  Input,
  ContainerForm,
  ButtonLogin,
  TextButton,
  TextRegistro,
  TextLink,
} from "./styles";
import { app } from "../../firebase";
import { Alert } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await app.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert("We have trouble finding you, try again...");
      setPassword("");
    }
  };

  const goToRegister = () => navigation.navigate("Register");

  return (
    <Container>
      <ContainerInputs>
        <ContainerForm>
          <Label>Email</Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Insert email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </ContainerForm>
        <ContainerForm>
          <Label>Password</Label>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Insert password"
            secureTextEntry={true}
          />
        </ContainerForm>
        <ButtonLogin onPress={login}>
          <TextButton>Log In</TextButton>
        </ButtonLogin>
        <TextRegistro>
          Don't you have an account? -
          <TextLink onPress={goToRegister}>Sign In</TextLink>
        </TextRegistro>
      </ContainerInputs>
    </Container>
  );
};

export default Login;
