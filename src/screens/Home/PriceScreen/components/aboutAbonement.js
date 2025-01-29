import { Image } from "expo-image";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { textStyles } from "../../../../styles/globalStyles";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";
import { getPrice } from "../api/getAllPrice";
import AboutAbonementLoader from "../loader/aboutAbonementLoader";
import { MaterialIndicator } from "react-native-indicators";
// import {
//   image1,
//   image2,
//   image3,
//   image4,
//   image5,
//   image6,
//   image7,
//   image8,
//   image9,
// } from "../img/imgs";

const AboutAbonement = ({
  isVisibleBottomSheet,
  setIsVisibleBottomSheet,
  isLoadingPrice,
  abonementName,
  price,
  imgId,
  setImgId,
  isGroup,
}) => {
  //   console.log(imgId === 1);
  return (
    <BottomSheet visible={isVisibleBottomSheet}>
      <View style={[styles.bottomNavigationView]}>
        {isLoadingPrice ? (
          <MaterialIndicator color="#BC994A" />
        ) : (
          <>
            <Image
              style={{
                width: "100%",
                height: 200,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                marginBottom: 35,
                zIndex: 3,
              }}
              source={{
                uri: price[0].photo,
              }}
            />
            <View
              style={{
                width: "100%",
                height: 250,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                ...StyleSheet.absoluteFillObject,
                zIndex: 4,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  padding: 20,
                  paddingBottom: 15,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() => {
                    setIsVisibleBottomSheet(false), setImgId("");
                  }}
                >
                  <AntDesign
                    name="closecircle"
                    size={30}
                    color="white"
                    style={{ opacity: 0.9 }}
                  />
                </TouchableOpacity>

                <Text style={{ ...textStyles.bold22pxWhite, fontSize: 30 }}>
                  {abonementName}
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", padding: 20 }}>
              {price && price[0].days !== null && (
                <Text style={{ ...textStyles.bold18pxWhite, marginBottom: 10 }}>
                  Срок действия:{" "}
                  <Text
                    style={{
                      ...textStyles.medium18pxWhite,
                      color: "white",
                      opacity: 0.8,
                    }}
                  >
                    {price && price[0].days}{" "}
                    {price && price[0].days === "1 год" ? "" : "дней"}
                  </Text>
                </Text>
              )}

              {price && price[0].freezeDay !== null && !isGroup && (
                <Text style={{ ...textStyles.bold18pxWhite, marginBottom: 10 }}>
                  Замарозка:{" "}
                  <Text
                    style={{
                      ...textStyles.medium18pxWhite,
                      color: "white",
                      opacity: 0.8,
                    }}
                  >
                    {price && price[0].freezeDay} дней
                  </Text>
                </Text>
              )}

              {price && price[0].count_lessons && isGroup && (
                <Text style={{ ...textStyles.bold18pxWhite, marginBottom: 10 }}>
                  Количества занятии:{" "}
                  <Text
                    style={{
                      ...textStyles.medium18pxWhite,
                      color: "white",
                      opacity: 0.8,
                    }}
                  >
                    {price && price[0].count_lessons}
                  </Text>
                </Text>
              )}

              {price && price[0].trial_lesson_count && isGroup && (
                <Text style={{ ...textStyles.bold18pxWhite, marginBottom: 10 }}>
                  Стоимость пробного занятия:{" "}
                  <Text
                    style={{
                      ...textStyles.medium18pxWhite,
                      color: "white",
                      opacity: 0.8,
                    }}
                  >
                    {price && price[0].trial_lesson_count}₸
                  </Text>
                </Text>
              )}

              {price && price[0].activationDay !== null && !isGroup && (
                <Text style={{ ...textStyles.bold18pxWhite, marginBottom: 10 }}>
                  Активация:{" "}
                  <Text
                    style={{
                      ...textStyles.medium18pxWhite,
                      color: "white",
                      opacity: 0.8,
                    }}
                  >
                    в течении {price && price[0].activationDay} дней
                  </Text>
                </Text>
              )}
              {price && price[0].includes !== null && !isGroup && (
                <Includes price={price && price} />
              )}

              <View style={{ width: "100%" }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...textStyles.bold20pxWhite, fontSize: 20 }}>
                    Цена:
                  </Text>
                  <Text
                    style={{
                      ...textStyles.bold20pxWhite,
                      fontSize: 20,
                      marginLeft: 5,
                    }}
                  >
                    {price && price[0].price}{" "}
                    <Text style={textStyles.bold20pxWhite}>₸</Text>
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:+77059719220`)}
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "#BC994A",
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={textStyles.bold20pxWhite}>Записаться</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: "90%",
    paddingBottom: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
});

const Includes = ({ price }) => {
  return (
    <>
      <Text
        style={{
          ...textStyles.bold22pxWhite,
          marginBottom: 5,
          marginTop: 15,
        }}
      >
        Что входит?
      </Text>

      <View
        style={{
          width: "100%",
          // flexDirection: "row",
          // justifyContent: "space-between",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        {/* <View style={{ width: "33%", alignItems: "center" }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#BC994A",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <FontAwesome name="group" size={24} color="white" />
          </View>
          <Text
            style={{
              ...textStyles.regular14pxWhite,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {price && price[0].includes}
          </Text>
        </View>
        <View style={{ width: "33%", alignItems: "center" }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#BC994A",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Entypo
              name="creative-commons-attribution"
              size={28}
              color="white"
            />
          </View>
          <Text
            style={{
              ...textStyles.regular14pxWhite,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            Гостевые визиты: {price && price[0].guestVisit}
          </Text>
        </View>
        <View style={{ width: "33%", alignItems: "center" }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#BC994A",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons
              name="clock-time-five"
              size={28}
              color="white"
            />
          </View>
          <Text
            style={{
              ...textStyles.regular14pxWhite,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            Временное ограничение:{"\n"}
            {price && price[0].timeLimits}
          </Text>
        </View> */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#2B2D30",
            padding: 10,
            flexDirection: "row",
            borderRadius: 15,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#384455",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
            }}
          >
            <FontAwesome
              name="group"
              size={15}
              color="white"
              style={{ opacity: 0.9 }}
            />
          </View>
          <View
            style={{ width: "70%", justifyContent: "center", marginLeft: 10 }}
          >
            <Text style={textStyles.regular15pxWhite}>
              {price && price[0].includes}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#2B2D30",
            padding: 10,
            flexDirection: "row",
            borderRadius: 15,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#384455",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
            }}
          >
            <Entypo
              name="creative-commons-attribution"
              size={20}
              color="white"
              style={{ opacity: 0.9 }}
            />
          </View>
          <View
            style={{ width: "70%", justifyContent: "center", marginLeft: 10 }}
          >
            <Text style={textStyles.regular15pxWhite}>
              Гостевые визиты: {price && price[0].guestVisit}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "#2B2D30",
            padding: 10,
            flexDirection: "row",
            borderRadius: 15,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#384455",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
            }}
          >
            <MaterialCommunityIcons
              name="clock-time-five"
              size={18}
              color="white"
              style={{ opacity: 0.9 }}
            />
          </View>
          <View
            style={{ width: "70%", justifyContent: "center", marginLeft: 10 }}
          >
            <Text style={textStyles.regular15pxWhite}>
              Временное ограничение:{"\n"}
              {price && price[0].timeLimits}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default AboutAbonement;
