import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { notificationScreen } from "./styles/notificationScreenStyles";

export default function NotificationScreen() {
  const [animation] = useState(new Animated.Value(0)); // Initial value for the animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start the smooth appearance animation when the component mounts or isVisible becomes true
      Animated.timing(animation, {
        toValue: 1, // End value for the animation
        duration: 400, // Duration of the animation in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start();
    }
  }, [isVisible]);

  const smoothAppearance = () => {
    setIsVisible(true); // Set isVisible to true to trigger the animation
  };

  const animatedStyles = {
    opacity: animation, // Use animated value for opacity
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1], // Interpolate scale from 0.8 to 1
        }),
      },
    ],
  };

  return (
    <View style={notificationScreen.container}>
      <MaterialIcons name="notifications-paused" size={50} color="white" />
      <Text style={notificationScreen.text}>Уведомление отсутсвуют</Text>

      {/* <TouchableOpacity onPress={smoothAppearance}>
        <Text style={styles.button}>Start Animation</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text style={styles.text}>Animated View</Text>
      </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
