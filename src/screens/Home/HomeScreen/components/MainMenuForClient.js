import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ImageCarousel from "./ImageCarousel";
import { textStyles } from "../../../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import { getNowClientsCount } from "../api/GetTodayNumberTrain";

const MainMenuForClient = () => {
  const navigation = useNavigation();
  const { phone } = useContext(AuthContext);

  const [nowClients, setNowClients] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (phone === "87000020202") {
      getNowClientsCount(setLoading, setNowClients);
    }
  }, [phone]);

  return (
    <View style={{ alignItems: "center", width: "100%", height: "100%" }}>
      <ScrollView style={styles.safeArea}>
        <ImageCarousel />
        <View style={{ alignItems: "center", width: "100%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalScreen")}
            style={{
              width: "95%",
              paddingVertical: 10,
              paddingLeft: 15,
              paddingRight: 10,
              paddingBottom: 0,
              backgroundColor: "#393C43",
              borderRadius: 20,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              display: phone === "87000020202" ? "none" : "flex",
            }}
          >
            <Text style={textStyles.bold18pxWhite}>
              Мои персональные{"\n"}тренировки
            </Text>
            <Image
              source={require("../../../../../assets/menuClient/train.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RealTimeClients");
            }}
            style={{
              width: "95%",
              paddingVertical: 10,
              paddingLeft: 15,
              paddingRight: 10,
              paddingBottom: 0,
              backgroundColor: "#393C43",
              borderRadius: 20,
              marginTop: 10,
              height: 85,
              // flexDirection: "row",
              // justifyContent: "space-between",
              display: phone === "87000020202" ? "flex" : "none",
            }}
          >
            <Text style={textStyles.bold18pxWhite}>Сейчас в зале</Text>

            {loading ? (
              <ActivityIndicator
                color={"#BC994A"}
                size={"small"}
                style={{ marginTop: 5 }}
              />
            ) : (
              <Text
                style={{
                  ...textStyles.medium18pxWhite,
                  fontSize: 30,
                  marginTop: 5,
                }}
              >
                {nowClients}{" "}
                <Text style={{ ...textStyles.medium18pxWhite, marginLeft: 3 }}>
                  человек
                </Text>
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GroupScreen");
            }}
            style={{
              width: "95%",
              paddingVertical: 10,
              paddingLeft: 15,
              paddingRight: 10,
              paddingBottom: 0,
              backgroundColor: "#393C43",
              borderRadius: 20,
              marginTop: 10,
              height: 85,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={textStyles.bold18pxWhite}>
              Групповые{"\n"}тренировки
            </Text>
            <Image
              source={require("../../../../../assets/menuClient/group.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: "95%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PriceScreen");
              }}
              style={{
                width: "48%",
                paddingVertical: 10,
                paddingLeft: 15,
                paddingRight: 10,
                paddingBottom: 0,
                backgroundColor: "#393C43",
                borderRadius: 20,
                marginTop: 10,
                position: "relative",
                display: phone === "87000020202" ? "none" : "flex",
              }}
            >
              <Text style={textStyles.bold18pxWhite}>
                Абонементы{"\n"}Прайс-лист
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Image
                  source={require("../../../../../assets/menuClient/price.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("AboutFitness")}
              style={{
                width: "48%",
                paddingVertical: 10,
                paddingLeft: 15,
                paddingRight: 10,
                paddingBottom: 0,
                backgroundColor: "#393C43",
                borderRadius: 20,
                marginTop: 10,
                position: "relative",
                display: phone === "87000020202" ? "none" : "flex",
              }}
            >
              <Text style={textStyles.bold18pxWhite}>О зале</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Image
                  source={require("../../../../../assets/menuClient/zal.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    height: Platform.OS === "android" && "77%",
    // alignItems: "center",
  },
});

export default MainMenuForClient;
