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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await app.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
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
        <ButtonLogin onPress={login}>
          <TextButton>Iniciar sesión</TextButton>
        </ButtonLogin>
        <TextRegistro>
          ¿No tienes cuenta? -
          <TextLink onPress={goToRegister}>Registrate</TextLink>
        </TextRegistro>
      </ContainerInputs>
    </Container>
  );
};

export default Login;
