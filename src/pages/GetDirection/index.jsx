import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { getData, storeData, wipeDirection } from "../../functions/main";
import {
  ButtonSave,
  ButtonsContainer,
  Container,
  ContainerAutocomplete,
  Input,
  Item,
  SaveText,
} from "./styles";
import { app } from "../../firebase";

const GetDirection = ({ navigation }) => {
  const [professorsList, setProfessorsList] = useState([]);
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

        setProfessorsList(professors);
        console.log(professors);
      });
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

  const useGeocoding = async (latitude, longitude) => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await res.data;

    setNewDirection(data.display_name);
    setLatitude(parseFloat(data.lat));
    setLongitude(parseFloat(data.lon));
  };

  return (
    <Container>
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
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0221,
        }}
        showsUserLocation
        showsScale
        showsMyLocationButton
        showsCompass
        followsUserLocation
      >
        <Marker
          style={{ width: 20, height: 20 }}
          draggable
          coordinate={{ latitude, longitude }}
          onDragEnd={(e) =>
            useGeocoding(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude
            )
          }
        />
        {professorsList.map((item) => (
          <Marker
            pinColor="blue"
            style={{ width: 20, height: 20, backgroundColor: "blue" }}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          >
            <Callout>
              <View style={{ width: 120 }}>
                <Text>{item.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
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
