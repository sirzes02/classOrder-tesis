import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Banner from "../../components/Banner";
import { app } from "../../firebase";

const Home = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
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
      });

    return () => subscriber();
  }, []);

  return (
    <View>
      <FlatList
        data={banners}
        renderItem={({ item }) => (
          <Banner img={item.imgRoute} name={item.name} />
        )}
      />
    </View>
  );
};

export default Home;
