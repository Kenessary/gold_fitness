import React from "react";
import { View } from "react-native";
import Input from "../../../../../component/Input";

const ThirdStep = ({ errors, handleError, handleOnChange }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Input
        iconName="lock"
        label="Пароль"
        error={errors.password}
        onFocus={() => {
          handleError(null, "password");
        }}
        placeholder="Пароль"
        fontSize={16}
        password
        onChangeText={(text) => handleOnChange(text, "password")}
      />
      <Input
        iconName="lock"
        label="Повтор пароля"
        error={errors.reply_password}
        onFocus={() => {
          handleError(null, "reply_password");
        }}
        placeholder="Повторите пароль"
        fontSize={16}
        password
        onChangeText={(text) => handleOnChange(text, "reply_password")}
      />
    </View>
  );
};

export default ThirdStep;
