import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { confirmButton } from "../../styles/clientScreenStyles";

const ConfirmButton = ({
  resultAdding,
  close1,
  changeTraining,
  validate,
  isLoading,
  oneDayTrain,
  modalShow,
  modalDelShow,
}) => {
  return (
    <View style={confirmButton.addBtnContainer}>
      <TouchableOpacity
        onPress={() =>
          resultAdding.message
            ? close1()
            : oneDayTrain !== undefined
            ? changeTraining()
            : validate()
        }
        style={{
          ...confirmButton.addBtn,
          opacity: modalShow || modalDelShow ? 0.2 : 1,
        }}
      >
        {isLoading ? (
          <MaterialIndicator size={30} color="white" />
        ) : resultAdding.message ? (
          <Text style={confirmButton.btnText}>Закрыть</Text>
        ) : oneDayTrain !== undefined ? (
          <Text style={confirmButton.btnText}>Изменить</Text>
        ) : (
          <Text style={confirmButton.btnText}>Добавить</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmButton;
