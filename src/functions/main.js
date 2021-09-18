import AsyncStorage from "@react-native-async-storage/async-storage";

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

export { getData, storeData, wipeDirection };
