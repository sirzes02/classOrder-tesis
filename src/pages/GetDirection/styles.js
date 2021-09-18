import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const MarkerImage = styled.Image`
  width: 32px;
  height: 40px;
  margin-bottom: 30px;
`;

export const ContainerAutocomplete = styled.View`
  position: absolute;
  z-index: 400;
  background-color: white;
  width: 80%;
  top: 5%;
  border-width: 1px;
  padding: 10px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
`;

export const Input = styled.TextInput`
  padding: 8px 20px;
  border-width: 1px;
  border-radius: 7px;
  margin: 5px 10px;
  flex-grow: 5;
`;

export const Item = styled.TouchableHighlight`
  border-width: 1px;
  margin: 5px 0 5px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export const ContainerInput = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  z-index: 440;
  bottom: 5%;
  right: 3%;
  display: flex;
  align-items: flex-end;
`;

export const ButtonSave = styled.TouchableHighlight`
  z-index: 440;
  background-color: green;
  padding: 10px;
  border-width: 1px;
  border-radius: 7px;
  margin-top: 10px;
`;

export const SaveText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const PinIcon = styled.Text`
  position: absolute;
  z-index: 500;
`;
