import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { textStyles } from "../../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { topProfile } from "../styles/profileStyle";

const TopProfileMenu = ({ setVisible, navigation }) => {
  return (
    <View style={topProfile.topButtonsContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ContactsTrainers")}
        style={topProfile.contactTrainersBtn}
      >
        <Image
          style={topProfile.logoSize}
          source={require("../../../../assets/preview/logo1.png")}
        />
        <Text style={{ ...textStyles.medium14pxWhite, marginLeft: 7 }}>
          Контакты тренера
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setVisible(true)}>
        <MaterialIcons name="settings" size={34} color="#BABABA" />
      </TouchableOpacity>
    </View>
  );
};

export default TopProfileMenu;
