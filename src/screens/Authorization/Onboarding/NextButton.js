import { View, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { nextButtonStyles } from "./styles/onboardingStyles";

export default function NextButton({ percentage, scrollTo }) {
  const size = 100;
  const strokeWidth = 5;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={nextButtonStyles.container}>
      <TouchableOpacity
        onPress={scrollTo}
        style={nextButtonStyles.button}
        activeOpacity={0.6}
      >
        <FontAwesome5 name="angle-right" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}
