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
  LoaderContainer,
} from "./styles";
import { app } from "../../firebase";
import { Alert, TouchableHighlight } from "react-native";
import Loader from "../../components/Loader";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);

    try {
      const res = await app.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert("We have trouble finding you, try again...");
      setPassword("");
    } finally {
      setIsLoading(false);
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
        <ButtonLogin
          onPress={login}
          underlayColor="rgba(73,182,77,1,0)"
          disabled={isLoading}
        >
          <TextButton>Log In</TextButton>
        </ButtonLogin>
        <TextRegistro>
          Don't you have an account? -
          <TouchableHighlight
            disabled={isLoading}
            onPress={goToRegister}
            underlayColor="rgba(73,182,77,1,0)"
          >
            <TextLink>{` Sign In`}</TextLink>
          </TouchableHighlight>
        </TextRegistro>
      </ContainerInputs>
      {isLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};

export default Login;
