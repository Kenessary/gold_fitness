import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { resulMessage } from "../../styles/clientScreenStyles";

const ResultMessage = ({ resultAdding }) => {
  return (
    <View style={resulMessage.resultMessageContainer}>
      <FontAwesome name="calendar-check-o" size={60} color="grey" />
      <Text style={resulMessage.resultMessageText}>{resultAdding.message}</Text>
    </View>
  );
};

export default ResultMessage;
