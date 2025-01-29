import moment from "moment";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { renderDayStyle } from "../../styles/clientScreenStyles";

export const showCalendar = (month, year, setCalendar) => {
  const currentMonth = month - 1;

  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, currentMonth, 1).getDay();
  const emptySlotsBefore = (firstDayOfWeek + 6) % 7;
  const emptySlotsAfter = 42 - (emptySlotsBefore + daysInMonth);

  const emptySlotsBeforeArray = Array(emptySlotsBefore).fill(null);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlotsAfterArray = Array(emptySlotsAfter).fill(null);

  const combinedArray = [
    ...emptySlotsBeforeArray,
    ...daysArray,
    ...emptySlotsAfterArray,
  ];

  const calendarData = Array.from({ length: 6 }, (_, weekIndex) =>
    combinedArray.slice(7 * weekIndex, 7 * (weekIndex + 1))
  );

  setCalendar(calendarData);
};

export const renderDay = (
  day,
  active,
  setSelectedDate,
  selectedMonthDesc,
  selectedNumMonth,
  clientPlan,
  selectedYear,
  setTrainDate,
  handleTouchableOpacityPress,
  setVisible
) => {
  if (day === null) {
    return <View key={Math.random()} style={renderDayStyle.dayButton} />;
  }

  const dayStr = day.toString().padStart(2, "0");
  const monthStr = selectedNumMonth.toString().padStart(2, "0");
  const formattedDate = `${selectedYear}-${monthStr}-${dayStr}`;

  const datePlanItem = clientPlan.find(
    (item) => item.date_plan === formattedDate
  );
  let dayColor;

  if (datePlanItem) {
    switch (datePlanItem.status_plan) {
      case "planned":
        dayColor = renderDayStyle.orange;
        break;
      case "canceled":
        dayColor = renderDayStyle.red;
        break;
      case "completed":
        dayColor = renderDayStyle.green;
        break;
      default:
        break;
    }
  }

  const currentDate = moment();
  const currentSelectedDate = moment(formattedDate, "YYYY-MM-DD");
  const isPastDay = currentSelectedDate.isBefore(currentDate, "day");
  const pastdaysStyle =
    isPastDay &&
    dayColor !== renderDayStyle.orange &&
    dayColor !== renderDayStyle.green &&
    renderDayStyle.pastDays;

  const dayStyle = [
    renderDayStyle.dayButton,
    active ? renderDayStyle.activeDay : renderDayStyle.inactiveDay,
    dayColor,
    pastdaysStyle,
  ];

  return (
    <TouchableOpacity
      key={Math.random()}
      style={dayStyle}
      disabled={
        isPastDay &&
        dayColor !== renderDayStyle.orange &&
        dayColor !== renderDayStyle.green
      }
      onPress={() => {
        setSelectedDate(
          `${day + " " + selectedMonthDesc + ", " + selectedYear}`
        );
        setTrainDate(`${selectedYear + "-" + monthStr + "-" + dayStr}`);
        handleTouchableOpacityPress(
          `${selectedYear + "-" + monthStr + "-" + dayStr}`
        );
        setVisible(true);
      }}
    >
      <Text style={renderDayStyle.dayText}>{day}</Text>
    </TouchableOpacity>
  );
};
