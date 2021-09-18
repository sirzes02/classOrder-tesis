import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getData, storeData, wipeDirection } from "../../functions/main";
import MarkerHome from "../../resources/img/markerHome.png";
import {
  ButtonSave,
  ButtonsContainer,
  Container,
  ContainerAutocomplete,
  Input,
  Item,
  MarkerImage,
  PinIcon,
  SaveText,
} from "./styles";

const GetDirection = ({ navigation }) => {
  const [latitude, setLatitude] = useState(3.479388);
  const [longitude, setLongitude] = useState(-76.500304);
  const [newDirection, setNewDirection] = useState("");
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getNominatim();
  }, [newDirection]);

  const getNominatim = async () => {
    if (newDirection.length > 3) {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${newDirection},cali,colombia&format=json&limit=3`
      );
      const data = await res.data;

      setSites(data);
    } else {
      setSites([]);
    }
  };

  const fetchData = async () => {
    const obj = await getData("userData");

    const { latitude, longitude } = obj;

    setLatitude(latitude);
    setLongitude(longitude);
  };

  const setNewPlace = (site, direction) => {
    const { lat, lon } = site;

    setLatitude(lat);
    setLongitude(lon);
    setNewDirection(direction);
  };

  const saveNewPlace = () => {
    Alert.alert(
      "Changing location...",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            storeData("userData", {
              latitude,
              longitude,
            });

            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const useGeocoding = async (e) => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${e.latitude}&lon=${e.longitude}&format=json`
    );
    const data = await res.data;

    setNewDirection(data.display_name);
    setLatitude(data.lat);
    setLongitude(data.lon);
  };

  return (
    <Container>
      <PinIcon>
        <Ionicons name="pin-outline" size={20} />
      </PinIcon>
      <ContainerAutocomplete>
        <Text>Insert Direction:</Text>
        <Input
          placeholder="Insert a new direction..."
          value={newDirection}
          onChangeText={setNewDirection}
        />
        {sites.map((site, key) => {
          const direction = wipeDirection(site.display_name);

          return (
            <Item
              key={key}
              onPress={() => setNewPlace(site, direction)}
              underlayColor="rgba(73,182,77,1,0)"
            >
              <Text>{direction}</Text>
            </Item>
          );
        })}
      </ContainerAutocomplete>
      <MapView
        onRegionChangeComplete={useGeocoding}
        style={styles.map}
        region={{
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
      <ButtonsContainer>
        <ButtonSave onPress={saveNewPlace} underlayColor="rgba(73,182,77,1,0)">
          <SaveText>Save direction</SaveText>
        </ButtonSave>
      </ButtonsContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default GetDirection;
