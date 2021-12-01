import styled from "styled-components/native";

export const Container = styled.View`
  width: 80%;
  display: flex;
  border-width: 1px;
  border-radius: 10px;
  flex-direction: row;
  margin: 10px 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
`;

export const Photo = styled.Image`
  width: 120px;
  height: 120px;
`;

export const BodyContainer = styled.View`
  flex: 1;
  margin: 0 20px 10px;
`;

export const Name = styled.Text`
  align-self: center;
  justify-content: center;
  margin: 10px 0;
  font-weight: bold;
`;

export const Description = styled.Text`
  align-self: center;
  justify-content: center;
  text-align: justify;
`;
