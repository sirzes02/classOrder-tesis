import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ContainerInputs = styled.View`
  border-width: 1px;
  border-radius: 15px;
  padding: 30px;
  width: 75%;
  margin: 10px 0 30% 0;
`;

export const Label = styled.Text``;

export const Input = styled.TextInput`
  margin-top: 8px;
  border-width: 1px;
  border-radius: 7px;
  width: 100%;
  padding: 8px 0 8px 10px;
`;

export const ContainerForm = styled.View`
  margin: 0px 0 20px 0;
`;

export const ButtonLogin = styled.TouchableHighlight`
  margin-top: 10px;
  background-color: green;
  border-radius: 10px;
  border-width: 2px;
  padding: 10px;
  display: flex;
`;

export const TextButton = styled.Text`
  align-self: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

export const TextRegistro = styled.Text`
  align-self: flex-end;
  margin-top: 10px;
  font-size: 12px;
`;

export const TextLink = styled.Text`
  font-style: italic;
  color: blueviolet;
`;
