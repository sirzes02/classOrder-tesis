import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../pages/Home";
import Settings from "../pages/Settings";

const iconsType = {
  Home: (focused) => (focused ? "home" : "home-outline"),
  Settings: (focused) => (focused ? "list" : "list-outline"),
};

const RoutesHome = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={iconsType[route.name](focused)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default RoutesHome;
