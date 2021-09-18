import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  margin: 15px 30px 15px 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;
  justify-content: space-around;
`;

export const ImageBanner = styled.Image`
  width: 150px;
  height: 150px;
`;

export const ContainerDescription = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  justify-content: space-around;
`;

export const Title = styled.Text`
  padding-bottom: 10px;
`;
