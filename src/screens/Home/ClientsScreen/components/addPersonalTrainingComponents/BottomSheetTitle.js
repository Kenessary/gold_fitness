import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { bottomSheetTitle } from "../../styles/clientScreenStyles";

const BottomSheetTitle = ({ close, resultAdding }) => {
  return (
    <View style={bottomSheetTitle.bottomSheetTitleContainer}>
      <Text style={bottomSheetTitle.titleText}>
        Персональная программа тренировок
      </Text>
      <TouchableOpacity
        onPress={close}
        style={[
          bottomSheetTitle.closeButton,
          { display: resultAdding.message ? "none" : "flex" },
        ]}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color="grey"
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetTitle;
