import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { sameDays } from "../../styles/clientScreenStyles";

const SameDays = ({
  selectedDaysDesc,
  numbers,
  setIsSameDayInMonth,
  isSameDayInMonth,
}) => {
  return (
    <View style={sameDays.sameDaysContainer}>
      <Text style={sameDays.currentMonthText}>
        {selectedDaysDesc && selectedDaysDesc.monthDesc}
      </Text>
      <View style={sameDays.daysContainer}>
        {numbers &&
          numbers.map((number, index) => (
            <View key={index} style={sameDays.dayBlock}>
              <Text style={sameDays.dayNumber}>{number}</Text>
              <Text style={sameDays.dayDescriptionShort}>
                {selectedDaysDesc && selectedDaysDesc.short}
              </Text>
            </View>
          ))}
      </View>
      <View style={sameDays.confirmContainer}>
        <View style={{ width: "80%" }}>
          <Text style={sameDays.confirmText}>
            Добавить план тренировок на все{" "}
            {selectedDaysDesc && selectedDaysDesc.full} этого месяца
          </Text>
        </View>
        <View style={{ width: "20%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setIsSameDayInMonth(!isSameDayInMonth)}
            style={sameDays.confirmBtn}
          >
            {isSameDayInMonth ? (
              <FontAwesome name="check" size={26} color="#00BD13" />
            ) : (
              <FontAwesome name="check" size={26} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SameDays;
