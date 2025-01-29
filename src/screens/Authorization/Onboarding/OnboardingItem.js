import React from "react";
import { View, Text, useWindowDimensions, Dimensions } from "react-native";

import { Image } from "expo-image";
import { onboardingItemStyle } from "./styles/onboardingStyles";

const imgSource = require("../../../../assets/preview/logo.png");
const windowWidth = Dimensions.get("window").width;

export default OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={onboardingItemStyle.container}>
      <Image
        source={item.image}
        style={[onboardingItemStyle.image, { width, height: "100%" }]}
        contentFit="cover"
      />
      <View style={onboardingItemStyle.overlay}>
        <View style={{ width: windowWidth - 40 }}>
          <Image style={onboardingItemStyle.imgStyle} source={imgSource} />
          <Text style={onboardingItemStyle.titleStyle}>{item.title}</Text>
        </View>
      </View>
    </View>
  );
};
