import React, { useState } from "react";
import {
  Container,
  ContainerInputs,
  Label,
  Input,
  ContainerForm,
  ButtonLogin,
  TextButton,
} from "./styles";
import { app } from "../../firebase";
import { Alert } from "react-native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

  const register = async () => {
    try {
      if (password === passwordVerification) {
        await app.auth().createUserWithEmailAndPassword(email, password);
      } else {
        Alert.alert("Las contraseñas no coinciden");
      }
    } catch (e) {
      Alert.alert("We have trouble creating you, try again...");

      setPassword("");
      setPasswordVerification("");
    }
  };

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
        <ContainerForm>
          <Label>Verify password</Label>
          <Input
            value={passwordVerification}
            onChangeText={setPasswordVerification}
            placeholder="Insert password verificator"
            secureTextEntry={true}
          />
        </ContainerForm>
        <ButtonLogin onPress={register}>
          <TextButton>Sign In</TextButton>
        </ButtonLogin>
      </ContainerInputs>
    </Container>
  );
};

export default Register;
