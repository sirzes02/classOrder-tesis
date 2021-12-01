import React from "react";
import { getImage } from "../../functions/main";
import { BodyContainer, Container, Description, Name, Photo } from "./styles";
import { Text, TouchableOpacity, Linking } from "react-native";
import { app } from "../../firebase";

const Teacher = ({ teacher }) => {
  const { name, description, distance, phone } = teacher;

  const sendWhatsAppMessage = async () => {
    const user = app.auth().currentUser.email;

    Linking.canOpenURL(
      "https://wa.me/57" +
        phone +
        "?text=" +
        `Hola, soy ${user} estoy interesado en tus servicios, comunicate por este medio, muchas gracias, muchas gracias.`
    )
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            "Please install WhatsApp to send direct message to teachers via WhatsApp"
          );
        } else {
          return Linking.openURL(
            "https://wa.me/57" +
              phone +
              "?text=" +
              `Hola, soy ${user} estoy interesado en tus servicios, comunicate por este medio, muchas gracias, muchas gracias.`
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <Container style={{ alignItems: "center" }}>
      <Photo style={{ marginLeft: 10 }} source={getImage()} />
      <BodyContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Text style={{ alignSelf: "flex-end", marginTop: 10 }}>
          {distance + "Km in distance"}
        </Text>
        <TouchableOpacity onPress={sendWhatsAppMessage}>
          <Text style={{ alignSelf: "flex-end", marginTop: 0, color: "green" }}>
            Chat in Whatsapp -
          </Text>
        </TouchableOpacity>
      </BodyContainer>
    </Container>
  );
};

export default Teacher;
