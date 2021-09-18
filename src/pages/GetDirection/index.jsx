import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { Container, MarkerImage } from "./styles";
import { getData } from "../../functions/main";
import MarkerHome from "../../resources/img/markerHome.png";

const GetDirection = () => {
  const [latitude, setLatitude] = useState(3.479388);
  const [longitude, setLongitude] = useState(-76.500304);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const obj = await getData("userData");

    const { latitude, longitude } = obj;

    setLatitude(latitude);
    setLongitude(longitude);
  };

  return (
    <Container>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }}>
          <MarkerImage source={MarkerHome} />
        </Marker>
      </MapView>
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default GetDirection;
