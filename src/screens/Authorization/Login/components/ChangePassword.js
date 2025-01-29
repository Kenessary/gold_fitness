import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Input from "../../../../component/Input";
import { loginStyles } from "../styles/loginStyles";
import { ActivityIndicator } from "react-native";

const ChangePassword = ({
  errors,
  handleError,
  inputs,
  handleOnChange,
  validate,
  isLoading,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <Input
        iconName="lock"
        label="Пароль"
        error={errors.password}
        onFocus={() => {
          handleError(null, "password");
        }}
        placeholder="Пароль"
        fontSize={16}
        value={inputs.password}
        password
        onChangeText={(text) => handleOnChange(text, "password")}
      />
      <Input
        iconName="lock"
        label="Повторите пароль"
        error={errors.confirm_password}
        onFocus={() => {
          handleError(null, "confirm_password");
        }}
        placeholder="Повторный пароль"
        fontSize={16}
        value={inputs.confirm_password}
        password
        onChangeText={(text) => handleOnChange(text, "confirm_password")}
      />

      <TouchableOpacity
        disabled={isLoading}
        onPress={() => validate()}
        style={styles.loginButton}
      >
        {isLoading ? (
          <ActivityIndicator color={"#111214"} size={"large"} />
        ) : (
          <Text style={styles.loginButtonText}>Восстановить пароль</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(loginStyles);

export default ChangePassword;
