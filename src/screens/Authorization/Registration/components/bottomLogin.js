import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { bottomLogin } from "../styles/registrationStyles";

const BottomLogin = () => {
  return (
    <View style={bottomLogin.container}>
      <Text style={bottomLogin.text}>У вас уже есть учетной записи?</Text>
      <TouchableOpacity style={bottomLogin.button}>
        <Text style={bottomLogin.buttonText}>Вход</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomLogin;
