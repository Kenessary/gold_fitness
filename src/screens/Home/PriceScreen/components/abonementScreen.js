import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import AboutAbonement from "./aboutAbonement";
import { getAllPrice, getPrice, getPriceGroup } from "../api/getAllPrice";
import { MaterialIndicator } from "react-native-indicators";

const AbonementScreen = ({ isOneTime, isGroup, isAbonement }) => {
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [allPrice, setAllPrice] = useState("");
  // console.log(allPrice);

  let idsToRemove = ["11", "12", "13"];

  let nameGroup = ["CYCLE/CYCLEWOMEN", "YOGA", "PILATES", "СТРЕТЧИНГ"];

  const oneTimeTrain =
    allPrice &&
    allPrice.filter((abonement) => idsToRemove.includes(abonement.id));

  const abonements =
    allPrice &&
    allPrice.filter((abonement) => !idsToRemove.includes(abonement.id));

  const abonementss =
    allPrice &&
    abonements.filter((abonement) => !nameGroup.includes(abonement.abonement));

  const grouptTrain =
    allPrice &&
    allPrice.filter((abonement) => nameGroup.includes(abonement.abonement));

  const [abonementName, setAbonementName] = useState("");
  const [imgId, setImgId] = useState("");
  // console.log(imgId === "1");
  const [price, setPrice] = useState([
    {
      abonement: "",
      activationDay: "",
      days: "",
      freezeDay: "",
      guestVisit: "",
      includes: "",
      price: "",
      timeLimits: "",
    },
  ]);

  useEffect(() => {
    getAllPrice(setIsLoading, setAllPrice);
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialIndicator color="#BC994A" />
        </View>
      ) : (
        <View
          style={{
            width: "90%",
            alignItems: "center",
            marginTop: 15,
            height: "89%",
          }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {allPrice &&
              (isAbonement
                ? abonementss
                : isGroup
                ? grouptTrain
                : oneTimeTrain
              ).map((el) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsVisibleBottomSheet(true);
                    setAbonementName(el.abonement);
                    // setImgId(el.id);
                    isGroup
                      ? getPriceGroup(
                          setIsLoadingPrice,
                          setPrice,
                          el.id,
                          setImgId
                        )
                      : getPrice(setIsLoadingPrice, setPrice, el.id, setImgId);
                  }}
                  key={Math.random()}
                  style={styles.button}
                >
                  <Text style={styles.btnText}>{el.abonement}</Text>
                  <AntDesign
                    name="rightcircle"
                    size={24}
                    color="white"
                    style={{ opacity: 0.6, width: "10%" }}
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>

          <AboutAbonement
            isVisibleBottomSheet={isVisibleBottomSheet}
            setIsVisibleBottomSheet={setIsVisibleBottomSheet}
            isLoadingPrice={isLoadingPrice}
            abonementName={abonementName}
            price={price}
            imgId={imgId}
            setImgId={setImgId}
            isGroup={isGroup}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 13,
    backgroundColor: "#393C43",
    width: "100%",
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnText: {
    ...textStyles.bold18pxWhite,
    opacity: 0.8,
    width: "85%",
  },
});

export default AbonementScreen;
