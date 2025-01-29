import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import moment from "moment";
import "moment/locale/ru";
import {
  getPersonalSelected,
  getPersonalSelectedClient,
} from "../api/GetPersonal";
import { AuthContext } from "../../../../context/AuthContext";
import { textStyles } from "../../../../styles/globalStyles";
import { weekCalendar } from "../styles/personalScreenStyle";

export default function WeekCalendar({
  setIsLoading,
  setClientsPersonal,
  setPersonal,
}) {
  const { phone, position } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState("");
  const [monthDays, setMonthDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment().format("D"));
  const scrollViewRef = useRef(null);

  useEffect(() => {
    moment.locale("ru");
    const formattedDate = moment().format("D MMMM, dddd");
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const currentMonth = moment();
    const daysInMonth = currentMonth.daysInMonth();

    const monthDaysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDay = currentMonth.clone().startOf("month").add(i, "days");
      return {
        dayOfMonth: currentDay.format("D"),
        dayOfWeek: currentDay.format("dd"),
        shortDescription: currentDay.format("dddd"),
        isToday: currentDay.isSame(moment(), "day"),
        date: currentDay.format("YYYY-MM-DD"),
      };
    });
    setMonthDays(monthDaysArray);
  }, []);

  const handleDayPress = (day) => {
    // console.log(day.date);
    setSelectedDay(day.dayOfMonth);
    position === "trainer"
      ? getPersonalSelected(setIsLoading, setClientsPersonal, day.date, phone)
      : getPersonalSelectedClient(setIsLoading, setPersonal, day.date, phone);
  };

  useEffect(() => {
    setTimeout(() => {
      const index = monthDays.findIndex(
        (day) => day.dayOfMonth === selectedDay
      );
      if (index !== -1 && scrollViewRef.current) {
        const screenWidth = Dimensions.get("window").width;
        const contentWidth = monthDays.length * 70;
        const scrollToX = index * 70 - screenWidth + -70;
        scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
      }
    }, 100);
  }, [monthDays]);

  return (
    <View style={weekCalendar.container}>
      <View style={weekCalendar.todayContainer}>
        <Text style={textStyles.medium16pxWhite}>Сегодня: </Text>
        <Text style={textStyles.medium16pxGrey}>{currentDate}</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        style={weekCalendar.scrollViewStyle}
        showsHorizontalScrollIndicator={false}
      >
        <View style={weekCalendar.calendarContainer}>
          {monthDays.map((day) => (
            <TouchableOpacity
              key={day.dayOfMonth}
              onPress={() => handleDayPress(day)}
              style={{
                ...weekCalendar.dayBtn,
                backgroundColor:
                  day.dayOfMonth === selectedDay ? "#BC994A" : "#393C43",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    ...weekCalendar.calendarDayNumText,
                    fontFamily:
                      day.dayOfMonth === selectedDay
                        ? "TTNormsPro-Bold"
                        : "TTNormsPro-Medium",
                  }}
                >
                  {day.dayOfMonth}
                </Text>
                <Text
                  style={{
                    ...weekCalendar.calendarDayText,
                    fontFamily:
                      day.dayOfMonth === selectedDay
                        ? "TTNormsPro-Bold"
                        : "TTNormsPro-Medium",
                    color: day.dayOfMonth === selectedDay ? "white" : "#B8B8B6",
                  }}
                >
                  {day.dayOfWeek}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
