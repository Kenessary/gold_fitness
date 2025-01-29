import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { textStyles } from "../../../../../styles/globalStyles";
import { FontAwesome } from "@expo/vector-icons";

const EmptyMessage = ({ clientsPersonal }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="calendar-times-o" size={60} color="grey" />
      <Text
        style={{
          ...textStyles.bold20pxWhite,
          marginTop: 10,
          marginLeft: 15,
        }}
      >
        {clientsPersonal.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
});

export default EmptyMessage;
