import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import "moment/locale/ru";
import AddPersonalTrain from "../../ClientsScreen/components/AddPersonalTrain";
import CalendarDropdowns from "./calendarComponents/calendarDropdowns";
import { renderDay, showCalendar } from "./calendarComponents/renderDayButton";
import { calendarStyle } from "../styles/clientScreenStyles";

export default function Calendar({
  clientNumber,
  clientPlan,
  setIsLoadingClient,
  setClient,
}) {
  const currentMonth1 = moment().format("M");
  const currentYear = moment().format("YYYY");
  const currentMonthDesc = moment().format("MMMM");

  const [calendar, setCalendar] = useState([]);
  const [selected, setSelected] = useState(`${currentMonth1}`);
  const selectedNumMonth = JSON.parse(selected);
  const [selectedYear, setSelectedYear] = useState(`${currentYear}`);
  const selectedNumYear = JSON.parse(selectedYear);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonthDesc, setSelectedMonthDesc] = useState(
    `${currentMonthDesc}`
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const [selectedDaysDesc, setSelectedDaysDesc] = useState("");

  const [trainDate, setTrainDate] = useState("");
  const [oneDayTrain, setOneDayTrain] = useState("");
  // console.log(oneDayTrain);
  const [visible, setVisible] = useState(false);

  const handleTouchableOpacityPress = (date) => {
    const matchingItems = clientPlan.find((item) => item.date_plan === date);
    setOneDayTrain(matchingItems);

    const selectedMoment = moment(date);
    const selectedDayOfWeek = selectedMoment.day();
    const firstSelectedDay = selectedMoment
      .startOf("month")
      .day(selectedDayOfWeek);
    const allSelectedDays = [...Array(5).keys()].map((occurrence) =>
      firstSelectedDay.clone().add(occurrence, "weeks").format("YYYY-MM-DD")
    );

    const monthString = selectedNumMonth
      ? selectedNumMonth.toString().padStart(2, "0")
      : "";
    setSelectedDays(
      allSelectedDays.filter((date) => date.startsWith(`2024-${monthString}`))
    );

    const dayNameShort = moment(date).locale("ru").format("dd");
    const dayNameFull = moment(date).locale("ru").format("dddd");

    setSelectedDaysDesc({
      full: dayNameFull,
      short: dayNameShort,
      monthDesc: selectedMonthDesc,
    });
  };

  useEffect(() => {
    showCalendar(selectedNumMonth, selectedNumYear, setCalendar);
  }, []);

  const onChangeMonth = (itemMonth) => {
    setSelected(itemMonth.value),
      showCalendar(JSON.parse(itemMonth.value), selectedNumYear, setCalendar),
      setSelectedMonthDesc(itemMonth.label);
  };

  const onChangeYear = (itemYear) => {
    setSelectedYear(itemYear.value),
      showCalendar(selectedNumMonth, JSON.parse(itemYear.value), setCalendar);
  };

  return (
    <View style={calendarStyle.container}>
      <Text style={calendarStyle.title}>Планировать тренировки</Text>

      <CalendarDropdowns
        selected={selected}
        onChangeMonth={onChangeMonth}
        selectedYear={selectedYear}
        onChangeYear={onChangeYear}
      />

      <View style={calendarStyle.daysRow}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
          <View key={Math.random()} style={calendarStyle.weekDays}>
            <Text style={calendarStyle.dayText}>{day}</Text>
          </View>
        ))}
      </View>
      {calendar.map((week, weekIndex) => (
        <View key={Math.random()} style={calendarStyle.weekRow}>
          {week.map((dayInfo, dayIndex) =>
            renderDay(
              dayInfo,
              dayInfo !== null,
              setSelectedDate,
              selectedMonthDesc,
              selectedNumMonth,
              clientPlan,
              selectedYear,
              setTrainDate,
              handleTouchableOpacityPress,
              setVisible
            )
          )}
        </View>
      ))}

      <AddPersonalTrain
        visible={visible}
        setVisible={setVisible}
        selectedData={selectedDate}
        trainDate={trainDate}
        clientNumber={clientNumber}
        setIsLoadingClient={setIsLoadingClient}
        setClient={setClient}
        oneDayTrain={oneDayTrain}
        selectedDays={selectedDays}
        selectedDaysDesc={selectedDaysDesc}
      />
    </View>
  );
}
