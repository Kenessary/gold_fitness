import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function InputForNews({
  label,
  keyboardType,
  value,
  placeholder,
  multiline,
  height,
  editable,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={[
          styles.label,
          {
            color: "white",
            fontSize: 14,
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
            borderWidth: 2,
            height: height,
          },
        ]}
      >
        <TextInput
          editable={editable}
          multiline={multiline}
          keyboardAppearance="dark"
          keyboardType={keyboardType}
          value={value}
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
            fontSize: 16,
            fontFamily: "TTNormsPro-Regular",
            width: "100%",
          }}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
  },
  inputContainer: {
    backgroundColor: "#24262B",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
});
