import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { deleteTrain } from "../../api/DeleteTrain";
import { MaterialIndicator } from "react-native-indicators";

const DeleteButton = ({ deleteOneTraining, isLoadingDel }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        deleteOneTraining();
      }}
      style={{
        backgroundColor: "#F14635",
        padding: 10,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        flexDirection: "row",
      }}
    >
      {isLoadingDel ? (
        <MaterialIndicator size={16} color="white" />
      ) : (
        <>
          <MaterialIcons name="delete" size={16} color="white" />
          <Text style={{ color: "white", fontSize: 14, marginLeft: 5 }}>
            Удалить тренировку
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default DeleteButton;
