import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { MaterialIndicator } from "react-native-indicators";
import { Octicons } from "@expo/vector-icons";
import { getPersonal } from "../api/GetPersonal";
import { AuthContext } from "../../../../context/AuthContext";
import { textStyles } from "../../../../styles/globalStyles";
import EmptyMessage from "./personalScreenComponents/emptyMessage";
import ClientsTrainList from "./personalScreenComponents/clientsTrainList";
import { personalSchedule } from "../styles/personalScreenStyle";

export default function PersonalSchedule({
  isLoading,
  clientsPersonal,
  setIsLoading,
  setClientsPersonal,
}) {
  const { phone } = useContext(AuthContext);

  useEffect(() => {
    getPersonal(setIsLoading, setClientsPersonal, phone);
  }, []);

  return (
    <>
      <View style={personalSchedule.scheduleContainer}>
        <View style={{ width: "90%", marginTop: 15 }}>
          <View style={personalSchedule.titleContainer}>
            <Text style={{ ...textStyles.medium18pxWhite, marginLeft: 15 }}>
              Расписание
            </Text>
            <View style={personalSchedule.online}>
              <Octicons name="dot-fill" size={24} color="#00BD13" />
              <Text style={{ ...textStyles.medium14pxWhite, marginLeft: 3 }}>
                В зале
              </Text>
            </View>
            <View style={personalSchedule.offline}>
              <Octicons name="dot-fill" size={24} color="#E53D3D" />
              <Text style={{ ...textStyles.medium14pxWhite, marginLeft: 3 }}>
                Не в зале
              </Text>
            </View>
          </View>
          {isLoading ? (
            <View style={personalSchedule.scheduleContainerLoad}>
              <MaterialIndicator color="#BC994A" style={{ marginTop: 150 }} />
            </View>
          ) : (
            clientsPersonal && (
              <View>
                <ScrollView
                  style={personalSchedule.scrollViewContent}
                  showsVerticalScrollIndicator={false}
                >
                  {clientsPersonal.message === "Нет персональных тренировок" ? (
                    <EmptyMessage clientsPersonal={clientsPersonal} />
                  ) : (
                    <ClientsTrainList clientsPersonal={clientsPersonal} />
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
