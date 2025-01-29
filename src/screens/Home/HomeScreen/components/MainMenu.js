import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  calendarImg,
  clientImg,
  crossovki,
  gantel,
  price,
} from "../img/homeScreenImg";
import { mainMenu } from "../styles/homeScreenStyles";

export default function MainMenu() {
  const navigation = useNavigation();
  return (
    <>
      <View style={mainMenu.menuContainer}>
        <TouchableOpacity
          style={mainMenu.btnContainer}
          onPress={() => {
            navigation.navigate("PersonalScreen");
          }}
        >
          <View style={mainMenu.textContainer}>
            <Text style={mainMenu.title}>Персональные{"\n"}занятии</Text>
          </View>
          <View style={mainMenu.imgRow}>
            <Image style={mainMenu.crossovki} source={crossovki} />
            <Image style={mainMenu.gantel} source={gantel} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={mainMenu.btnContainer}
          onPress={() => {
            navigation.navigate("GroupScreen");
          }}
        >
          <View style={mainMenu.textContainer}>
            <Text style={mainMenu.title}>
              Расписание{"\n"}групповых{"\n"}программ
            </Text>
          </View>
          <View style={{ ...mainMenu.imgRow, justifyContent: "flex-end" }}>
            <Image style={mainMenu.calendarImg} source={calendarImg} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={mainMenu.clientBtn}
        onPress={() => {
          navigation.navigate("ClientsScreen");
        }}
      >
        <Image style={mainMenu.clientImg} source={clientImg} />
        <View style={mainMenu.clientBtnTitleContainer}>
          <Text style={mainMenu.clientTitle}>Клиенты</Text>
          <Entypo name="chevron-right" size={30} color="white" />
        </View>
      </TouchableOpacity>
      {/* <View style={{ ...mainMenu.menuContainer, marginTop: 15 }}>
        <TouchableOpacity
          style={{ ...mainMenu.btnContainer, height: 120 }}
          onPress={() => {
            navigation.navigate("PriceScreen");
          }}
        >
          <View style={mainMenu.textContainer}>
            <Text style={mainMenu.title}>Прайс-лист{`\n`}Абонементы</Text>
          </View>
          <View style={{ ...mainMenu.imgRow, justifyContent: "flex-end" }}>
            <Image
              style={mainMenu.priceImg}
              source={require("../../../../../assets/profileImgs/pricecard.png")}
            />
          </View>
        </TouchableOpacity>
      </View> */}
    </>
  );
}
