import React, { useEffect, useState } from "react";
import { Container, Text, BannerContainer } from "./styles";
import { teachers } from "../../mocks/teachers";
import Teacher from "../../components/Teacher";
import { ScrollView, StyleSheet } from "react-native";
import { app } from "../../firebase";
import { getData, getKilometros } from "../../functions/main";

const Class = () => {
  const [professorsList, setProfessorsList] = useState([]);

  useEffect(() => {
    app
      .firestore()
      .collection("professors")
      .onSnapshot((querySnapshot) => {
        const professors = [];

        querySnapshot.forEach((documentSnapshot) =>
          professors.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          })
        );

        mapping(professors);
      });
  }, []);

  const mapping = async (professors) => {
    const user = await getData("userData");

    let finalMap = professors.map((item) => {
      const distance = getKilometros(
        user.latitude,
        user.longitude,
        item.latitude,
        item.longitude
      );

      return { ...item, distance };
    });

    finalMap = finalMap.sort((a, b) => a.distance - b.distance);

    setProfessorsList(finalMap);
  };

  return (
    <Container>
      <Text>Near teacher list</Text>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        {professorsList.map((teacher, i) => (
          <BannerContainer key={i} underlayColor="gray">
            <Teacher teacher={teacher} />
          </BannerContainer>
        ))}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    justifyContent: "center",
    width: "100%",
  },
});

export default Class;
