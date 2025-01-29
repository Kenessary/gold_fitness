import { View } from "react-native";
import React, { useEffect, useState } from "react";
import WeekDescription from "./components/WeekDescription";
import GroupSchedule from "./components/GroupSchedule";
import moment from "moment";
import "moment/locale/ru";
import { groupScreenStyle } from "./styles/groupScreenStyles";
import TakeGroupTrain from "./components/TakeGroupTrain";
import { groupLessonsTodayNoLoad } from "./api/GroupApi";

export default function GroupScreen() {
  const today = moment().format(`YYYY-MM-D`);
  const [selectedDay, setSelectedDay] = useState(today);

  const [groupLessons, setGroupLessons] = useState("");
  const [groupTrain, setGroupTrain] = useState("");
  const [checkForPossibility, setCheckForPossibility] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [takeGroupWindow, setTakeGroupWindow] = useState(false);

  useEffect(() => {
    if (takeGroupWindow) {
      groupLessonsTodayNoLoad(setGroupLessons, selectedDay);
    }
  }, [takeGroupWindow]);

  const [updateData, setUpdateData] = useState(false);

  return (
    <View style={groupScreenStyle.container}>
      <WeekDescription
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setGroupLessons={setGroupLessons}
        setIsLoading={setIsLoading}
      />
      <GroupSchedule
        selectedDay={selectedDay}
        setGroupLessons={setGroupLessons}
        groupLessons={groupLessons}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setTakeGroupWindow={setTakeGroupWindow}
        setGroupTrain={setGroupTrain}
        setCheckForPossibility={setCheckForPossibility}
      />
      <TakeGroupTrain
        selectedDay={selectedDay}
        groupTrain={groupTrain}
        takeGroupWindow={takeGroupWindow}
        setTakeGroupWindow={setTakeGroupWindow}
        checkForPossibility={checkForPossibility}
        setGroupLessons={setGroupLessons}
        setIsLoading={setIsLoading}
        setCheckForPossibility={setCheckForPossibility}
      />
    </View>
  );
}
