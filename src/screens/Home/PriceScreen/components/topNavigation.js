import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";

const TopNavigation = ({
  isOneTime,
  setIsOneTime,
  isGroup,
  setIsGroup,
  isAbonement,
  setIsAbonement,
}) => {
  const handleOneTimeChoose = () => {
    setIsOneTime(true), setIsGroup(false), setIsAbonement(false);
  };

  const handleGroupChoose = () => {
    setIsOneTime(false), setIsGroup(true), setIsAbonement(false);
  };

  const handleAbonementChoose = () => {
    setIsOneTime(false), setIsGroup(false), setIsAbonement(true);
  };
  return (
    <View
      style={{
        backgroundColor: "#202226",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={handleAbonementChoose}
        style={{
          width: "32%",
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: isAbonement ? "#BC994A" : "#202226",
          padding: 10,
          borderBottomWidth: 4,
        }}
      >
        <Text
          style={{
            ...textStyles.medium16pxWhite,
            textAlign: "center",
            fontFamily: isAbonement ? "TTNormsPro-Bold" : "TTNormsPro-Medium",
            opacity: isAbonement ? 1 : 0.6,
          }}
        >
          Абонементы
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleGroupChoose}
        style={{
          width: "30%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderBottomColor: isGroup ? "#BC994A" : "#202226",
          borderBottomWidth: 4,
        }}
      >
        <Text
          style={{
            ...textStyles.medium16pxWhite,
            fontFamily: isGroup ? "TTNormsPro-Bold" : "TTNormsPro-Medium",
            textAlign: "center",
            opacity: isGroup ? 1 : 0.6,
          }}
        >
          Групповые{"\n"}занятии
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleOneTimeChoose}
        style={{
          width: "30%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderBottomColor: isOneTime ? "#BC994A" : "#202226",
          borderBottomWidth: 4,
        }}
      >
        <Text
          style={{
            ...textStyles.bold16pxWhite,
            fontFamily: isOneTime ? "TTNormsPro-Bold" : "TTNormsPro-Medium",
            textAlign: "center",
            opacity: isOneTime ? 1 : 0.6,
          }}
        >
          Разовые{"\n"}посещение
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TopNavigation;
