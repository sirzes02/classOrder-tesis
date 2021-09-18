import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync,
} from "expo-location";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import Banner from "../../components/Banner";
import Loader from "../../components/Loader";
import { app } from "../../firebase";
import Class from "../Class";
import { BannerList } from "./styles";
import { storeData } from "../../functions/main";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  const getUserData = async () => {
    const { uid, email } = app.auth().currentUser;
    const docRef = app.firestore().collection("Users").doc(uid);
    const res = await docRef.get();
    const today = Date.now();
    const { status } = await requestForegroundPermissionsAsync();
    let obj = { lastLoginDate: today, latitude: 0, longitude: 0 };

    if (status === "granted") {
      await startLocationUpdatesAsync("background-location-task", {
        accuracy: Accuracy.Balanced,
      });
      let location = await getCurrentPositionAsync({});

      obj = {
        ...obj,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      storeData("userData", obj);
    }

    if (res.exists) {
      docRef.update(obj);
    } else {
      docRef.set({ ...obj, displayName: email, accountCreatedDate: today });
    }
  };

  useEffect(() => {
    getUserData();

    const subscriber = app
      .firestore()
      .collection("classes")
      .onSnapshot((querySnapshot) => {
        const banners = [];

        querySnapshot.forEach((documentSnapshot) =>
          banners.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          })
        );

        setBanners(banners);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const redirectTo = (className) => navigation.push(className);

  if (loading) {
    return <Loader />;
  }

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Conf" options={{ title: "Home" }}>
        {(props) => (
          <BannerList
            {...props}
            data={banners}
            renderItem={({ item }) => {
              const { name, imgRoute } = item;

              return (
                <TouchableHighlight
                  onPress={() => redirectTo(name)}
                  underlayColor="rgba(73,182,77,1,0)"
                >
                  <Banner img={imgRoute} name={name} />
                </TouchableHighlight>
              );
            }}
          />
        )}
      </Stack.Screen>
      {banners.map((banner, id) => {
        const { name } = banner;

        return (
          <Stack.Screen name={name} key={id}>
            {(props) => <Class {...props} classBanner={banner} />}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export default Home;
