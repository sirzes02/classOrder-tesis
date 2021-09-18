import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { app } from "./src/firebase";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import RoutesHome from "./src/routes/RoutesHome";

const App = () => {
  const Stack = createNativeStackNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = app.auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeRoutes"
          component={RoutesHome}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
};

export default App;
