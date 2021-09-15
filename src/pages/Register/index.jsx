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
        throw "Las contraseñas no coinciden";
      }
    } catch (e) {
      Alert.alert(e);

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
            placeholder="Ingrese correo"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </ContainerForm>
        <ContainerForm>
          <Label>Contraseña</Label>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Ingrese contraseña"
            secureTextEntry={true}
          />
        </ContainerForm>
        <ContainerForm>
          <Label>Verificar contraseña</Label>
          <Input
            value={passwordVerification}
            onChangeText={setPasswordVerification}
            placeholder="Ingrese verifiación"
            secureTextEntry={true}
          />
        </ContainerForm>
        <ButtonLogin onPress={register}>
          <TextButton>Registrarse</TextButton>
        </ButtonLogin>
      </ContainerInputs>
    </Container>
  );
};

export default Register;
