import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";

const OtpScreenForPassword = ({
  inputRefs,
  otp,
  setOtp,
  setFocusedInput,
  focusedInput,
  setWarning,
  warning,
}) => {
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    if (newOtp.join("").length !== 4) {
      setWarning(false);
    }

    setOtp(newOtp);

    // Only move to the next input if the current input is filled
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    if (newOtp[3] !== "") {
      Keyboard.dismiss();
      setFocusedInput(-1);
    }
  };

  const handleBackspace = (index) => {
    const newOtp = [...otp];

    // Delete the digit in the current input field
    newOtp[index] = "";

    if (index > 0) {
      // Focus on the previous input field
      inputRefs[index - 1].current.focus();
    }

    setOtp(newOtp);
  };

  return (
    <View style={otpStyle.container}>
      {otp.map((digit, index) => (
        <TextInput
          autoFocus={index === 0}
          key={index}
          ref={inputRefs[index]}
          style={[
            otpStyle.input,
            { borderColor: warning ? "#F83E59" : "#ccc" },
            index === 0 ? otpStyle.firstInput : null, // Add special style for first input
            index === focusedInput ? otpStyle.focusedInput : null, // Change style when focused
          ]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleOtpChange(index, value)}
          value={digit}
          // caretHidden={true}
          cursorColor="#BC994A"
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === "Backspace") {
              handleBackspace(index);
            }
          }}
          onFocus={() => setFocusedInput(index)} // Update focused input index
        />
      ))}
    </View>
  );
};

const otpStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    width: 50,
    textAlign: "center",
    marginHorizontal: 5,
    color: "white",
  },
  firstInput: {
    // Add special styles for the first input field
  },
  focusedInput: {
    // Change border color and width when focused
    borderColor: "#BC994A",
    borderWidth: 3,
  },
});

export default OtpScreenForPassword;
