import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import WeekCalendar from "./components/WeekCalendar";
import PersonalSchedule from "./components/PersonalSchedule";
import PersonalClientSchedule from "./components/PersonalClientSchedule";
import { AuthContext } from "../../../context/AuthContext";

export default function PersonalScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [clientsPersonal, setClientsPersonal] = useState("");
  const [personal, setPersonal] = useState("");
  const { position } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <WeekCalendar
        setIsLoading={setIsLoading}
        setClientsPersonal={setClientsPersonal}
        setPersonal={setPersonal}
      />
      {position === "trainer" ? (
        <PersonalSchedule
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          clientsPersonal={clientsPersonal}
          setClientsPersonal={setClientsPersonal}
        />
      ) : (
        <PersonalClientSchedule
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          personal={personal}
          setPersonal={setPersonal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#202226",
  },
});
