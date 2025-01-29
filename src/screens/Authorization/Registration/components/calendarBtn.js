import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { calendarBtn } from "../styles/registrationStyles";

const CalendarBtn = ({
  dateShow,
  showDatePicker,
  isDatePickerVisible,
  handleConfirm,
  hideDatePicker,
}) => {
  return (
    <View style={{ width: "48%" }}>
      <Text style={calendarBtn.formLabel}>День рождения</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={calendarBtn.calendarBtn}
      >
        <AntDesign
          name="calendar"
          size={18}
          color={dateShow.length !== 0 ? "white" : "#696969"}
        />
        <Text
          style={{
            ...calendarBtn.calendarBtnText,
            color: dateShow.length !== 0 ? "white" : "#696969",
          }}
        >
          {dateShow.length !== 0 ? dateShow : "Выберите дату"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="ru"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Подтвердить"
        cancelTextIOS="Отмена"
      />
    </View>
  );
};

export default CalendarBtn;
