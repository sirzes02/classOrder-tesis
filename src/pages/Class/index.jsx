import React from "react";
import { Container, Text, BannerContainer } from "./styles";
import { teachers } from "../../mocks/teachers";
import Teacher from "../../components/Teacher";
import { ScrollView, StyleSheet } from "react-native";

const Class = ({ navigation }) => {
  return (
    <Container>
      <Text>Near teacher list</Text>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        {teachers.map((teacher) => (
          <BannerContainer
            onPress={() => navigation.navigate("")}
            underlayColor="gray"
          >
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
