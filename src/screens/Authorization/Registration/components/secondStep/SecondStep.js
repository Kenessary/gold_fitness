import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../../../../../component/Input";
import CalendarBtn from "../calendarBtn";
import { Dropdown } from "react-native-element-dropdown";
import { secondStep } from "../../styles/registrationStyles";

const SecondStep = ({
  inputs,
  errors,
  handleOnChange,
  handleError,
  setBirthDate,
  selectedGender,
  setSelectedGender,
}) => {
  const [dateShow, setDateShow] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const dataGender = [
    { label: `Мужской`, value: "male" },
    { label: "Женский", value: "female" },
  ];

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    const formattedDate1 = `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year}`;

    setBirthDate(formattedDate);
    setDateShow(formattedDate1);

    hideDatePicker();
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Input
        iconName="account"
        label="Имя"
        value={inputs.first_name}
        error={errors.phone}
        onFocus={() => {
          handleError(null, "first_name");
        }}
        placeholder="Имя"
        fontSize={16}
        onChangeText={(text) => handleOnChange(text, "first_name")}
      />
      <Input
        iconName="account"
        label="Фамилия"
        value={inputs.last_name}
        error={errors.phone}
        onFocus={() => {
          handleError(null, "last_name");
        }}
        placeholder="Фамилия"
        fontSize={16}
        onChangeText={(text) => handleOnChange(text, "last_name")}
      />

      <View style={secondStep.bottomForms}>
        <CalendarBtn
          dateShow={dateShow}
          showDatePicker={showDatePicker}
          isDatePickerVisible={isDatePickerVisible}
          handleConfirm={handleConfirm}
          hideDatePicker={hideDatePicker}
        />
        <View style={{ width: "48%" }}>
          <Text style={secondStep.label}>Пол</Text>
          <Dropdown
            style={secondStep.dropdown}
            placeholderStyle={secondStep.placeholderStyle}
            selectedTextStyle={secondStep.selectedTextStyle}
            inputSearchStyle={secondStep.inputSearchStyle}
            itemTextStyle={secondStep.itemTextStyle}
            activeColor="#BC994A"
            containerStyle={secondStep.containerStyle}
            confirmSelectItem={false}
            itemContainerStyle={{ borderRadius: 10 }}
            data={dataGender}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Выберите пол"
            value={selectedGender}
            onChange={(item) => {
              setSelectedGender(item.value);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SecondStep;
