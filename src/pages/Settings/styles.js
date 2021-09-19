import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  margin: 0 30px;
  align-items: center;
`;

export const ImageProfile = styled.Image`
  width: 250px;
  height: 250px;
`;

export const TextEmail = styled.Text`
  font-size: 20px;
  margin-top: 15px;
`;

export const Separator = styled.View`
  width: 100%;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  margin: 15px 0;
`;

export const ItemOption = styled.TouchableHighlight`
  background-color: white;
  width: 100%;
  align-items: center;
  border-width: 1px;
  padding: 10px 0;
  border-radius: 7px;
  margin-bottom: 15px;
`;
