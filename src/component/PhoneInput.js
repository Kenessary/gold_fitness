import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIndicator } from "react-native-indicators";

export default function PhoneInput({
  editable,
  onPhoneNumberChange,
  label,
  iconName,
  value,
  fontSize,
  placeholder,
  autoFocus,
  checkPhone,
  setProfile,
  notMyAccount,
  setNotMyAccount,
  ...props
}) {
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (notMyAccount) {
      setPhoneNumber("+7");
      setNotMyAccount(false);
    }
  }, [notMyAccount]);

  const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters from the input
    const numericInput = input.replace(/\D/g, "");

    // Apply the desired format
    let formattedNumber = "+";
    for (let i = 1; i < numericInput.length + 1; i++) {
      formattedNumber += numericInput[i - 1];
      if (i === 1) {
        formattedNumber += " (";
      } else if (i === 4 && numericInput.length > 4) {
        formattedNumber += ") ";
      } else if (
        (i === 7 && numericInput.length > 7) ||
        (i === 9 && numericInput.length > 9)
      ) {
        formattedNumber += " ";
      }
    }
    return formattedNumber.trim();
  };

  const handlePhoneNumberChange = (input) => {
    const formatted = formatPhoneNumber(input);
    setPhoneNumber(formatted);
    onPhoneNumberChange(formatted);
  };

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={[
            styles.label,
            {
              color: "white",
              fontSize: fontSize,
              fontFamily: "TTNormsPro-Medium",
              marginBottom: 8,
            },
          ]}
        >
          {label}
        </Text>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: isFocused ? "#AD873C" : "#696969",
              borderWidth: isFocused ? 2 : 2,
            },
          ]}
        >
          <Icon
            name={iconName}
            style={{
              fontSize: 24,
              color: isFocused ? "#D7D8D9" : "#696969",
              marginRight: 10,
            }}
          />
          <TextInput
            editable={editable}
            keyboardAppearance="dark"
            autoComplete="off"
            autoFocus={autoFocus}
            placeholder={isFocused ? "" : placeholder}
            placeholderTextColor={isFocused ? "#D7D8D9" : "#696969"}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={18}
            style={{
              color: isFocused ? "#D7D8D9" : "#696969",
              flex: 1,
              fontSize: fontSize,
              fontFamily: "TTNormsPro-Regular",
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          {checkPhone && (
            <View>
              <MaterialIndicator size={20} color="#BC994A" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 42,
    backgroundColor: "#24262B",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
  },
});
