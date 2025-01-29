import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../../../../../component/Input";
import { checkMember } from "../../api/CheckMember";
import { firstStep } from "../../styles/registrationStyles";

const FirstStep = ({
  inputs,
  errors,
  isLoading,
  handleOnChange,
  handleError,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Input
        keyboardType="number-pad"
        iconName="phone"
        label="Номер телефона"
        value={inputs.phone}
        error={errors.phone}
        checkPhone={isLoading}
        onFocus={() => {
          handleError(null, "phone");
        }}
        placeholder="Номер телефона"
        fontSize={16}
        onChangeText={(text) => handleOnChange(text, "phone")}
        maxLength={11}
      />
      <Text style={firstStep.inputBottomLabel}>Формат номера: 87001234567</Text>
    </View>
  );
};

export default FirstStep;
