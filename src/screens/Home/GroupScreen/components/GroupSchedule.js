import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { MaterialIndicator } from "react-native-indicators";
import { Image } from "expo-image";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import {
  checkForPossibility,
  checkForPossibilityApi,
  groupLessonsToday,
} from "../api/GroupApi";
import {
  cycle,
  pilates,
  smartfitness,
  stretching,
  wellness,
  yoga,
} from "../img/groupTrainsImages";
import { textStyles } from "../../../../styles/globalStyles";
import { groupScheduleStyle } from "../styles/groupScreenStyles";
import { AuthContext } from "../../../../context/AuthContext";

export default function GroupSchedule({
  setIsLoading,
  setGroupLessons,
  selectedDay,
  isLoading,
  groupLessons,
  setTakeGroupWindow,
  setGroupTrain,
  setCheckForPossibility,
}) {
  const { position, phone } = useContext(AuthContext);
  useEffect(() => {
    checkForPossibilityApi(setCheckForPossibility, phone);
    groupLessonsToday(setIsLoading, setGroupLessons, selectedDay);
  }, []);

  // console.log(groupLessons[0].DateNach.slice(0, -3));

  return (
    <>
      <View style={groupScheduleStyle.scheduleContainer}>
        <View style={{ width: "100%", alignItems: "center" }}>
          {isLoading && (
            <View style={groupScheduleStyle.loader}>
              <MaterialIndicator color="#BC994A" />
            </View>
          )}
          {groupLessons === "Групповые занятия отсутсвуют!" ? (
            <View style={groupScheduleStyle.emptyContainer}>
              <Text style={textStyles.bold18pxWhite}>
                Групповые занятия отсутсвуют
              </Text>
            </View>
          ) : (
            <ScrollView style={groupScheduleStyle.cardContainer}>
              {groupLessons.length !== 0 &&
                groupLessons.map((el) => (
                  <TouchableOpacity
                    disabled={position === "trainer"}
                    onPress={() => {
                      setTakeGroupWindow(true), setGroupTrain(el);
                    }}
                    key={Math.random()}
                    style={groupScheduleStyle.clienCard}
                  >
                    <View style={{ width: "80%" }}>
                      <View style={groupScheduleStyle.innerElements}>
                        <Image
                          style={groupScheduleStyle.img}
                          source={
                            (el.Nomenclature === "Pilates" && pilates) ||
                            (el.Nomenclature === "Cycle" && cycle) ||
                            (el.Nomenclature === "Йога" && yoga) ||
                            (el.Nomenclature === "Stretching" && stretching) ||
                            (el.Nomenclature === "Умный фитнес" &&
                              smartfitness) ||
                            (el.Nomenclature === "Wellness" && wellness)
                          }
                        />
                        <View style={groupScheduleStyle.infoContainer}>
                          <Text style={textStyles.medium12pxGreyUppercase}>
                            Тренер
                          </Text>
                          <Text style={textStyles.medium18pxWhite}>
                            {el.Trainer}
                          </Text>
                          <View style={groupScheduleStyle.trainTypeContainer}>
                            <Ionicons
                              name="location-sharp"
                              size={14}
                              color="#B8B8B6"
                            />
                            <Text
                              style={{
                                ...textStyles.bold14pxGrey,
                                marginLeft: 2,
                              }}
                            >
                              {el.Room}
                            </Text>
                            <View
                              style={{
                                backgroundColor: "grey",
                                padding: 2,
                                paddingHorizontal: 5,
                                borderRadius: 10,
                                marginLeft: 10,
                                display:
                                  el.Nomenclature === "Cycle" ? "flex" : "none",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  fontFamily: "TTNormsPro-Regular",
                                }}
                              >
                                Записаться
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={groupScheduleStyle.time}>
                      <Text style={textStyles.bold16pxWhite}>
                        {el.DateNach.slice(0, -3)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
}
