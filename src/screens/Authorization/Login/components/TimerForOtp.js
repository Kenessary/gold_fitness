import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";
import { getCodeRetry, sendCode, sendCodeRetry } from "../api/sendCode";

const TimerForOtp = ({ phone, setCode }) => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleResendCode = () => {
    if (time === 0) {
      setTime("");
    }
    setTime(60);
    getCodeRetry(phone.slice(1), setCode);
  };

  return (
    <>
      {time === 0 ? (
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 10,
          }}
          onPress={handleResendCode}
        >
          <Text style={{ ...textStyles.medium16pxGrey, color: "#000" }}>
            Получить код еще раз
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#393C43",
            marginTop: 25,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={textStyles.medium16pxGrey}>
            Получить код повторно {formatTimer(time)}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default TimerForOtp;
