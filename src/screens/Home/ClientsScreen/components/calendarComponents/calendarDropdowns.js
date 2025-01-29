import React from "react";
import { View } from "react-native";
import DropdownList from "../../../../../component/DropdownList";
import monts from "../../data/monts";
import moment from "moment";
import { dropdownsContainerStyle } from "../../styles/clientScreenStyles";

const CalendarDropdowns = ({
  selected,
  onChangeMonth,
  selectedYear,
  onChangeYear,
}) => {
  const currentYear = moment().format("YYYY");
  const currentYearNum = JSON.parse(currentYear);

  const dataYears = [
    { label: `${currentYearNum - 1}`, value: `${currentYearNum - 1}` },
    { label: `${currentYearNum}`, value: `${currentYearNum}` },
    { label: `${currentYearNum + 1}`, value: `${currentYearNum + 1}` },
    { label: `${currentYearNum + 2}`, value: `${currentYearNum + 2}` },
    { label: `${currentYearNum + 3}`, value: `${currentYearNum + 3}` },
    { label: `${currentYearNum + 4}`, value: `${currentYearNum + 4}` },
  ];

  return (
    <View style={dropdownsContainerStyle.dropdownsContainer}>
      <DropdownList
        data={monts}
        placeholder={"Выберите месяц"}
        value={selected}
        onChange={(item) => onChangeMonth(item)}
        width={"48%"}
        height={30}
      />

      <DropdownList
        data={dataYears}
        placeholder={"Выберите год"}
        value={selectedYear}
        onChange={(item) => onChangeYear(item)}
        width={"48%"}
        height={30}
      />
    </View>
  );
};

export default CalendarDropdowns;
