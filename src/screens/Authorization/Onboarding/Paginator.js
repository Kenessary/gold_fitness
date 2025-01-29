import React from "react";
import { View, Animated, useWindowDimensions } from "react-native";
import { paginatorStyle } from "./styles/onboardingStyles";

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();

  return (
    <View style={paginatorStyle.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[
              paginatorStyle.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}
