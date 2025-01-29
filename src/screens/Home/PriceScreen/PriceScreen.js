import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { textStyles } from "../../../styles/globalStyles";
import TopNavigation from "./components/topNavigation";
import AbonementScreen from "./components/abonementScreen";

const PriceScreen = () => {
  const [isOneTime, setIsOneTime] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isAbonement, setIsAbonement] = useState(true);

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#111214" }}>
      <TopNavigation
        isOneTime={isOneTime}
        isGroup={isGroup}
        isAbonement={isAbonement}
        setIsOneTime={setIsOneTime}
        setIsGroup={setIsGroup}
        setIsAbonement={setIsAbonement}
      />
      <AbonementScreen
        isOneTime={isOneTime}
        isGroup={isGroup}
        isAbonement={isAbonement}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PriceScreen;
