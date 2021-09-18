import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getData, storeData, wipeDirection } from "../../functions/main";
import MarkerHome from "../../resources/img/markerHome.png";
import {
  ButtonCurrentLocation,
  ButtonSave,
  ButtonsContainer,
  Container,
  ContainerAutocomplete,
  ContainerInput,
  Input,
  Item,
  MarkerImage,
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

  const restoreData = () => {
    setNewDirection("");
    fetchData();
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

  return (
    <Container>
      <ContainerAutocomplete>
        <Text>Insert Direction:</Text>
        <ContainerInput>
          <Input
            placeholder="Insert a new direction..."
            value={newDirection}
            onChangeText={setNewDirection}
          />
          {newDirection.length > 0 && (
            <Text onPress={restoreData}>
              <Ionicons name="close-circle-outline" size={20} />
            </Text>
          )}
        </ContainerInput>
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
        <ButtonCurrentLocation
          onPress={restoreData}
          underlayColor="rgba(73,182,77,1,0)"
        >
          <Ionicons name="locate-outline" size={30} />
        </ButtonCurrentLocation>
        {sites.length !== 0 && (
          <ButtonSave
            onPress={saveNewPlace}
            underlayColor="rgba(73,182,77,1,0)"
          >
            <SaveText>Save direction</SaveText>
          </ButtonSave>
        )}
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
