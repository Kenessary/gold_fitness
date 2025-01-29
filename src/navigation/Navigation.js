import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { isLoading, phone } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111214",
        }}
      >
        <MaterialIndicator color="#BC994A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {phone === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default Navigation;
