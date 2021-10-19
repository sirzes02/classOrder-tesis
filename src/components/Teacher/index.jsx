import React from "react";
import User from "../../resources/img/profilePlaceholder.png";
import { BodyContainer, Container, Description, Name, Photo } from "./styles";

const Teacher = ({ teacher, navigation }) => {
  const { name, description, photo } = teacher;

  return (
    <Container>
      <Photo source={User} />
      <BodyContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </BodyContainer>
    </Container>
  );
};

export default Teacher;
