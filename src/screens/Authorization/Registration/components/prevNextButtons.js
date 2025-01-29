import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { prevNextButtons } from "../styles/registrationStyles";

const PrevNextButtons = ({
  step,
  handlePrevious,
  handleNext,
  validate,
  checkStatus,
}) => {
  return (
    <View style={prevNextButtons.prevNextContainer}>
      <TouchableOpacity
        disabled={step === 1 && true}
        onPress={() => handlePrevious()}
        style={{
          ...prevNextButtons.previousBtn,
          backgroundColor: step === 1 ? "#1C1D21" : "white",
        }}
      >
        <FontAwesome
          name="caret-left"
          size={24}
          color={step === 1 ? "#1C1D21" : "#111214"}
        />
        <Text
          style={{
            ...prevNextButtons.previousBtnText,
            color: step === 1 ? "#1C1D21" : "#111214",
          }}
        >
          Предыдущий
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={
          checkStatus === "Этот номер не зарегестрирован" ? false : true
        }
        onPress={() => (step === 3 ? validate() : handleNext())}
        style={{
          ...prevNextButtons.nextBtn,
          backgroundColor:
            checkStatus === "Этот номер не зарегестрирован"
              ? "white"
              : "#696969",
        }}
      >
        <Text
          style={{
            ...prevNextButtons.nextBtnText,
            color:
              checkStatus === "Этот номер не зарегестрирован"
                ? "#111214"
                : "white",
          }}
        >
          {step === 3 ? "Завершить" : "Cледующий"}{" "}
        </Text>
        <FontAwesome
          name="caret-right"
          size={24}
          color={
            checkStatus === "Этот номер не зарегестрирован"
              ? "#111214"
              : "white"
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrevNextButtons;
