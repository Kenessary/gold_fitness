import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { ScrollView } from "react-native";
import { groupLessonsToday } from "../api/GroupApi";
import { textStyles } from "../../../../styles/globalStyles";
import { weekDescription } from "../styles/groupScreenStyles";

export default function WeekDescription({
  selectedDay,
  setSelectedDay,
  setGroupLessons,
  setIsLoading,
}) {
  const [currentDate, setCurrentDate] = useState("");
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    moment.locale("ru");
    const formattedDate = moment().format("D MMMM, dddd");
    setCurrentDate(formattedDate);
  }, []);

  const updateWeek = () => {
    const currentWeek = moment();
    const today = moment();

    const firstDayOfWeek = currentWeek.clone().startOf("isoWeek");
    const lastDayOfWeek = currentWeek.clone().endOf("isoWeek");
    const daysInWeek = lastDayOfWeek.diff(firstDayOfWeek, "days") + 1;

    const weekDaysArray = Array.from({ length: daysInWeek }, (_, i) => {
      const currentDay = firstDayOfWeek.clone().add(i, "days");
      return {
        dayOfWeekNumber: currentDay.format("YYYY-MM-D"),
        dayOfWeek: currentDay.format("dd"),
        shortDescription: currentDay.format("dddd"),
        isToday: currentDay.isSame(today, "day"),
      };
    });
    setWeekDays(weekDaysArray);
  };

  useEffect(() => {
    updateWeek();
    const intervalId = setInterval(() => {
      updateWeek();
    }, 7 * 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={weekDescription.container}>
      <View style={weekDescription.todayContainer}>
        <Text style={textStyles.medium16pxWhite}>Сегодня: </Text>
        <Text style={textStyles.medium16pxGrey}>{currentDate}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={weekDescription.calendarContainer}>
          {weekDays.map((day) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedDay(day.dayOfWeekNumber);

                groupLessonsToday(
                  setIsLoading,
                  setGroupLessons,
                  day.dayOfWeekNumber
                );
              }}
              key={day.dayOfWeekNumber}
              style={{
                ...weekDescription.dayBtn,
                backgroundColor:
                  day.dayOfWeekNumber === selectedDay ? "#BC994A" : "#393C43",
                shadowColor:
                  day.dayOfWeekNumber === selectedDay ? "#BC994A" : "",
                shadowOffset: {
                  width: day.dayOfWeekNumber === selectedDay ? 0 : "",
                  height: day.dayOfWeekNumber === selectedDay ? 0 : "",
                },
                shadowOpacity: day.dayOfWeekNumber === selectedDay ? 0.9 : "",
                shadowRadius: day.dayOfWeekNumber === selectedDay ? 8 : "",
              }}
            >
              <Text
                style={{
                  ...weekDescription.calendarDayNumText,
                  fontFamily:
                    day.dayOfWeekNumber === selectedDay
                      ? "TTNormsPro-Bold"
                      : "TTNormsPro-Medium",
                }}
              >
                {day.dayOfWeek}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
