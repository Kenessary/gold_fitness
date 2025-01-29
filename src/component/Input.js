import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Input({
  label,
  iconName,
  error,
  password,
  keyboardType,
  checkPhone,
  // fontFamily,
  value,
  fontSize,
  placeholder,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
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
            borderColor: error ? "#F83E59" : isFocused ? "#AD873C" : "#696969",
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
          keyboardAppearance="dark"
          // autoComplete='off'
          keyboardType={keyboardType}
          value={value}
          secureTextEntry={hidePassword}
          placeholderTextColor={isFocused ? "#D7D8D9" : "#696969"}
          placeholder={isFocused ? "" : placeholder}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{
            color: "#D7D8D9",
            flex: 1,
            fontSize: fontSize,
            fontFamily: "TTNormsPro-Regular",
          }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 24, color: isFocused ? "#D7D8D9" : "#696969" }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}

        {checkPhone && (
          <View>
            <MaterialIndicator size={20} color="#BC994A" />
          </View>
        )}
      </View>
      {error && (
        <Text style={{ color: "#F83E59", fontSize: 14, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
  },
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
