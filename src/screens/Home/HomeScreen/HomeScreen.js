import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import TopContainer from "./components/TopContainer";
import MainMenu from "./components/MainMenu";
import { StatusBar } from "expo-status-bar";
import { homeScreen } from "./styles/homeScreenStyles";
import UpdateVersion from "./components/UpdateVersion";
import MainMenuForClient from "./components/MainMenuForClient";
import { AuthContext } from "../../../context/AuthContext";
import { profileScreen } from "../../Profile/styles/profileStyle";
import { MaterialIndicator } from "react-native-indicators";
import axios from "axios";

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const { position, phone } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [abonement, setAbonement] = useState("");

  // useEffect(() => {
  //   getAboutAbonement();
  // }, []);

  // const getAboutAbonement = () => {
  //   setIsLoading(true);
  //   const config = {
  //     method: "get",
  //     url: `https://portmaster.kz/api/fitness/v1/gymmembershipsecond?client_phone_number=${phone}`,
  //     headers: {},
  //   };
  //   axios(config)
  //     .then(function (response) {
  //       let info = response.data;
  //       // console.log(info, "sddddddd");
  //       if (info.message === "Клиенты не найдены") {
  //         setAbonement("Клиенты не найдены");
  //       } else {
  //         setAbonement(info);
  //       }

  //       setIsLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // };

  // if (isLoading) {
  //   return (
  //     <View style={profileScreen.loaderContainer}>
  //       <MaterialIndicator color="#BC994A" />
  //     </View>
  //   );
  // }

  return (
    <View style={homeScreen.container}>
      <StatusBar style="light" />
      <TopContainer abonement={abonement} />
      {position === "trainer" ? <MainMenu /> : <MainMenuForClient />}
      {/* <MainMenuForClient /> */}
      {/* <MainMenu /> */}
      <UpdateVersion visible={visible} />
    </View>
  );
}
