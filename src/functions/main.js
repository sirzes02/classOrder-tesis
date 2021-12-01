import AsyncStorage from "@react-native-async-storage/async-storage";
import a1 from "../images/a1.png";
import a2 from "../images/a2.png";
import a3 from "../images/a3.png";
import a4 from "../images/a4.png";
import a5 from "../images/a5.png";
import a6 from "../images/a6.png";
import a7 from "../images/a7.png";
import a8 from "../images/a8.png";
import a9 from "../images/a9.png";
import a10 from "../images/a10.png";
import a11 from "../images/a11.png";
import a12 from "../images/a12.png";
import a13 from "../images/a13.png";
import a14 from "../images/a14.png";
import a15 from "../images/a15.png";
import a16 from "../images/a16.png";

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const wipeDirection = (dir) => {
  return dir
    .replace(", Colombia", "")
    .replace(", Cali", "")
    .replace(", Valle del Cauca", "")
    .replace(", Sur", "")
    .replace(", Pacífica", "");
};

const getImage = () => {
  const images = [
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    a12,
    a13,
    a14,
    a15,
    a16,
  ];

  const number = Math.floor(Math.random() * 16);

  return images[number];
};

const getKilometros = (lat1, lon1, lat2, lon2) => {
  const rad = (x) => (x * Math.PI) / 180;

  let R = 6378.137; //Radio de la tierra en km
  let dLat = rad(lat2 - lat1);
  let dLong = rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;

  return d.toFixed(2); //Retorna tres decimales
};

export { getData, storeData, wipeDirection, getImage, getKilometros };
