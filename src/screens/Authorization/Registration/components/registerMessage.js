import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";
import { MaterialIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { registerMessage } from "../styles/registrationStyles";

const RegisterMessage = ({ loadingRegister, hideBlock, setHideBlock }) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    setHideBlock(false);
    navigation.goBack();
  };

  return (
    <BottomSheet visible={hideBlock}>
      <View style={[registerMessage.bottomNavigationView1]}>
        {loadingRegister ? (
          <MaterialIndicator size={30} color="white" />
        ) : (
          <View style={registerMessage.container}>
            <Text style={registerMessage.text}>Регистрация прошла успешно</Text>
            <TouchableOpacity
              onPress={() => handleGoBack()}
              style={registerMessage.backBtn}
            >
              <Text style={registerMessage.backBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default RegisterMessage;
