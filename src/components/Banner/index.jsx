import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { app } from "../../firebase";
import Placeholder from "../../resources/img/placeholder.png";
import { Container, ContainerDescription, ImageBanner, Title } from "./styles";

const Banner = ({ img, name }) => {
  const [imgLabel, setImgLabel] = useState(null);

  const fetchImg = async () => {
    const subscriber = await app.storage().ref(img).getDownloadURL();

    setImgLabel(subscriber);
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <Container>
      {imgLabel ? (
        <ImageBanner source={{ uri: imgLabel }} />
      ) : (
        <ImageBanner source={Placeholder} />
      )}
      <ContainerDescription>
        <Title>{name}</Title>
        <Ionicons name="arrow-forward" size={30} />
      </ContainerDescription>
    </Container>
  );
};

export default Banner;
