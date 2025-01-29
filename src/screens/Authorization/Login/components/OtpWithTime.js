import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import OtpScreenForPassword from "./OtpScreenForPassword";
import TimerForOtp from "./TimerForOtp";
import { textStyles } from "../../../../styles/globalStyles";

const OtpWithTime = ({
  inputRefs,
  otp,
  setOtp,
  setFocusedInput,
  focusedInput,
  restorePasswordPhone,
  setSuccessSendCode,
  setCode,
  setWarning,
  warning,
}) => {
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    if (warning) {
      // Start the smooth appearance animation when the component mounts or isVisible becomes true
      Animated.timing(animation, {
        toValue: 1, // End value for the animation
        duration: 400, // Duration of the animation in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start();
    } else {
      // Reset the animation when switchIsForgotPass becomes false
      animation.setValue(0); // Reset the animation value to 0
    }
  }, [warning]);

  const animatedStyles = {
    opacity: animation, // Use animated value for opacity
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 1], // Interpolate scale from 0.8 to 1
        }),
      },
    ],
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={{ ...textStyles.medium18pxWhite }}>Введите код</Text>
      </View>
      <OtpScreenForPassword
        inputRefs={inputRefs}
        otp={otp}
        setOtp={setOtp}
        setFocusedInput={setFocusedInput}
        focusedInput={focusedInput}
        setWarning={setWarning}
        warning={warning}
      />
      {warning && (
        <Animated.View
          style={[
            {
              width: "100%",
              padding: 13,
              backgroundColor: "#56060D",
              borderRadius: 10,
              marginTop: 10,
            },
            animatedStyles,
          ]}
        >
          <Text style={{ ...textStyles.medium16pxGrey, color: "#F83E59" }}>
            Неправильный код, попробуйте еще раз
          </Text>
        </Animated.View>
      )}
      <TimerForOtp
        phone={restorePasswordPhone}
        setSuccessSendCode={setSuccessSendCode}
        setCode={setCode}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 45,
    alignItems: "center",
  },
});

export default OtpWithTime;
