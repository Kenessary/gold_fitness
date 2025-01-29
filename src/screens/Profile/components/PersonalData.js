import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { textStyles } from "../../../styles/globalStyles";
import { DotIndicator } from "react-native-indicators";
import axios from "axios";
import { personalData } from "../styles/profileStyle";
import { BottomSheet } from "react-native-btr";
import { findClientsInADay } from "../api/GetProfile";
import { AuthContext } from "../../../context/AuthContext";

const PersonalData = ({ profile }) => {
  const statusIcon = (
    <MaterialCommunityIcons name="shield-account" size={15} color="white" />
  );
  const birthdayIcon = <Ionicons name="calendar" size={15} color="white" />;
  const phoneIcon = <FontAwesome name="phone" size={15} color="white" />;

  return (
    <View style={{ width: "100%", marginTop: 20 }}>
      <Text
        style={{
          ...textStyles.regular15pxWhite,
          marginLeft: 5,
          marginBottom: 10,
        }}
      >
        Персональные данные
      </Text>

      <PersonalUserData
        stylesForContainer={{
          ...personalData.container,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        icons={statusIcon}
        title="Статус"
        label={profile.info_users.Doljnost}
      />

      <PersonalUserData
        stylesForContainer={personalData.container}
        icons={birthdayIcon}
        title="Дата рождения"
        label={profile.info_users.DateRozh}
      />

      <PersonalUserData
        stylesForContainer={{
          ...personalData.container,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
        icons={phoneIcon}
        title="Номер телефона"
        label={profile.info_users.NomerTel}
      />
    </View>
  );
};

const PersonalUserData = ({ stylesForContainer, title, label, icons }) => {
  return (
    <View style={stylesForContainer}>
      <View style={personalData.rowCenter}>
        {icons}
        <Text style={{ ...textStyles.medium16pxWhite, marginLeft: 5 }}>
          {title}
        </Text>
      </View>
      <View>
        <Text style={textStyles.regular14pxWhite}>{label}</Text>
      </View>
    </View>
  );
};

export const PersonalStatistics = ({
  profile,
  setIsLoading1,
  isLoading1,
  setProfile,
  phone,
  setTodayVisible,
  setTodayClients,
  setTodayClientsLoading,
}) => {
  const getProfile = (setIsLoading1, setProfile) => {
    setIsLoading1(true);
    const config = {
      method: "get",
      url: `http://portmaster.kz/api/fitness/v1/infoabouttrainer?user_tel_number=${phone}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data;
        setProfile(info);

        setIsLoading1(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading1(false);
      });
  };

  const todayIcon = (
    <View style={{ ...personalData.iconBg, backgroundColor: "#027AE8" }}>
      <Ionicons name="today" size={18} color="white" />
    </View>
  );
  const endedHoursIcon = (
    <View style={{ ...personalData.iconBg, backgroundColor: "#E8022B" }}>
      <Entypo name="calendar" size={18} color="white" />
    </View>
  );
  const plannedIcon = (
    <View style={{ ...personalData.iconBg, backgroundColor: "#747474" }}>
      <MaterialCommunityIcons name="timeline-clock" size={18} color="white" />
    </View>
  );

  return (
    <View style={{ width: "100%", marginTop: 15 }}>
      <View style={personalData.statisticContainer}>
        <Text style={textStyles.regular15pxWhite}>Статистика за месяц</Text>
        <TouchableOpacity
          onPress={() => getProfile(setIsLoading1, setProfile)}
          style={personalData.reloadBtn}
        >
          <Text style={{ ...textStyles.medium14pxWhite, marginRight: 5 }}>
            Обновить
          </Text>
          <Feather name="refresh-ccw" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <PersonalUserStatistic
        stylesForContainer={{
          ...personalData.container,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        icons={todayIcon}
        title="Сегодня"
        label={
          profile.clients_day.length === 0
            ? "0"
            : profile.clients_day[0].kol_den
        }
        isLoading1={isLoading1}
        setTodayVisible={setTodayVisible}
        setTodayClients={setTodayClients}
        setTodayClientsLoading={setTodayClientsLoading}
      />

      <PersonalUserStatistic
        stylesForContainer={personalData.container}
        icons={endedHoursIcon}
        title="Запланированные тренировки"
        label={profile.clients_coplete_count}
        isLoading1={isLoading1}
        setTodayVisible={setTodayVisible}
        setTodayClients={setTodayClients}
        setTodayClientsLoading={setTodayClientsLoading}
      />

      <PersonalUserStatistic
        stylesForContainer={{
          ...personalData.container,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
        icons={plannedIcon}
        title={"Количество отработанных\nтренировок"}
        label={
          profile.clients_count.length === 0
            ? "0"
            : profile.clients_count[0].kol_den
        }
        isLoading1={isLoading1}
        setTodayVisible={setTodayVisible}
        setTodayClients={setTodayClients}
        setTodayClientsLoading={setTodayClientsLoading}
      />
    </View>
  );
};

const PersonalUserStatistic = ({
  stylesForContainer,
  title,
  label,
  icons,
  isLoading1,
  setTodayVisible,
  setTodayClients,
  setTodayClientsLoading,
}) => {
  const { phone } = useContext(AuthContext);
  return (
    <TouchableOpacity
      disabled={title !== "Сегодня"}
      style={stylesForContainer}
      onPress={() => {
        setTodayVisible(true),
          findClientsInADay(phone, setTodayClientsLoading, setTodayClients);
      }}
    >
      <View style={personalData.rowCenter}>
        {icons}
        <Text style={{ ...textStyles.medium16pxWhite, marginLeft: 5 }}>
          {title}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        {isLoading1 ? (
          <DotIndicator color="grey" size={5} />
        ) : (
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontFamily: "TTNormsPro-Bold",
            }}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PersonalData;

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    // height: "50%",
    //   justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
});
