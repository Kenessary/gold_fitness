import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIndicator } from "react-native-indicators";
import { Octicons } from "@expo/vector-icons";
import { getPersonal, getPersonalClient } from "../api/GetPersonal";
import { AuthContext } from "../../../../context/AuthContext";
import { textStyles } from "../../../../styles/globalStyles";
import EmptyMessage from "./personalScreenComponents/emptyMessage";
import ClientsTrainList from "./personalScreenComponents/clientsTrainList";
import { personalSchedule } from "../styles/personalScreenStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import TrainList from "./personalScreenComponents/trainList";

export default function PersonalClientSchedule({
  isLoading,
  setIsLoading,
  personal,
  setPersonal,
}) {
  const { phone } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    getPersonalClient(setIsLoading, setPersonal, phone);
  }, []);

  return (
    <>
      <View style={personalSchedule.scheduleContainer}>
        <View style={{ width: "90%", marginTop: 15 }}>
          <View style={personalSchedule.titleContainer}>
            <Text style={{ ...textStyles.medium18pxWhite, marginLeft: 15 }}>
              Расписание
            </Text>

            {personal.message !== "Нет персональных тренировок" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("TrainersListScreen")}
                style={{
                  padding: 7,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#544A33",
                  marginRight: 15,
                }}
              >
                <Text style={textStyles.bold16pxWhite}>
                  Тренеры Gold Fitness
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoading ? (
            <View style={personalSchedule.scheduleContainerLoad}>
              <MaterialIndicator color="#BC994A" style={{ marginTop: 150 }} />
            </View>
          ) : (
            personal && (
              <View>
                <ScrollView
                  style={personalSchedule.scrollViewContent}
                  showsVerticalScrollIndicator={false}
                >
                  {personal.message === "Нет персональных тренировок" ? (
                    <View style={{ alignItems: "center" }}>
                      <EmptyMessage clientsPersonal={personal} />

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("TrainersListScreen")
                        }
                        style={{
                          paddingVertical: 15,
                          width: "95%",
                          backgroundColor: "#BC994A",
                          marginTop: 25,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 15,
                        }}
                      >
                        <Text style={textStyles.bold18pxWhite}>
                          Выбрать тренера
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TrainList personal={personal} />
                  )}
                </ScrollView>
              </View>
            )
          )}
        </View>
      </View>
    </>
  );
}
