import { Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/ru";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";
import { topContainer } from "../styles/homeScreenStyles";
import { LinearGradient } from "expo-linear-gradient";
import { textStyles } from "../../../../styles/globalStyles";

export default function TopContainer({ abonement }) {
  const navigation = useNavigation();
  const { name, position, phone } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    moment.locale("ru");
    const formattedDate = moment().format("D MMMM, YYYY");
    setCurrentDate(formattedDate);
  }, []);

  return (
    <View style={topContainer.topContainer}>
      <View style={topContainer.container}>
        {position === "trainer" ? (
          <View style={topContainer.todayContainer}>
            <MaterialCommunityIcons
              name="calendar-month"
              size={18}
              color="#B8B8B6"
            />
            <Text style={topContainer.dataText}>{currentDate}</Text>
          </View>
        ) : abonement === "Клиенты не найдены" ? (
          <LinearGradient
            colors={["#8c8c8c", "#2b2b2b"]} // Define your gradient colors
            start={[0, 0]}
            end={[1, 1]}
            style={{
              // width: "80%",
              padding: 5,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Text
              style={{
                ...textStyles.bold14pxGrey,
                color: "white",
                fontWeight: "400",
              }}
            >
              {abonement}
            </Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={["#8c8c8c", "#2b2b2b"]} // Define your gradient colors
            start={[0, 0]}
            end={[1, 1]}
            style={{
              // width: "80%",
              padding: 5,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Text
              style={{
                ...textStyles.bold14pxGrey,
                color: "white",
                fontWeight: "400",
              }}
            >
              {abonement && abonement.info[0].Subscription}
            </Text>
          </LinearGradient>
        )}

        <TouchableOpacity
          style={topContainer.notifyBtn}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={topContainer.todayProfile}>
        <View style={topContainer.profileInfo}>
          <Text style={topContainer.helloText}>Привет, {name}!</Text>
        </View>
      </View>
    </View>
  );
}
