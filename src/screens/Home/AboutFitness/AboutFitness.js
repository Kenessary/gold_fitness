import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { profileScreen } from "../../Profile/styles/profileStyle";
import { Image } from "react-native";
import axios from "axios";
import { MaterialIndicator } from "react-native-indicators";
import { textStyles } from "../../../styles/globalStyles";
import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const AboutFitness = () => {
  const [aboutFitness, setAboutFitness] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(aboutFitness[0].photo);

  useEffect(() => {
    getAboutFitness();
  }, []);

  const getAboutFitness = () => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `https://portmaster.kz/api/fitness/v1/getInfoAboutZal`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data;
        setAboutFitness(info);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={profileScreen.loaderContainer}>
        <MaterialIndicator color="#BC994A" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",

        backgroundColor: "#202226",
      }}
    >
      <Image
        style={{ height: 236, width: "90%", marginTop: 20, borderRadius: 25 }}
        source={{
          uri: `data:image/png;base64,${aboutFitness && aboutFitness[0].photo}`,
        }}
      />
      <View style={{ width: "90%", marginTop: 20 }}>
        <Text style={textStyles.bold22pxWhite}>
          {aboutFitness && aboutFitness[0].title}
        </Text>
        <Text style={{ ...textStyles.regular14pxWhite, marginTop: 12 }}>
          {aboutFitness && aboutFitness[0].text}
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          marginTop: 35,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="location-pin" size={18} color="#CFA953" />
          <Text style={{ ...textStyles.regular14pxWhite, marginLeft: 5 }}>
            {aboutFitness && aboutFitness[0].adress}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(aboutFitness && aboutFitness[0].linktoadress)
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#544A33",
            borderRadius: 10,
          }}
        >
          <FontAwesome5 name="location-arrow" size={18} color="#148F00" />
          <Text style={{ ...textStyles.medium14pxWhite, marginLeft: 5 }}>
            2GIS карта
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", marginTop: 15 }}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              aboutFitness &&
                `tel:${aboutFitness[0].phone_number.replace(/\s+/g, "")}`
            )
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome6 name="phone-flip" size={14} color="#CFA953" />
          <Text
            style={{
              ...textStyles.regular14pxWhite,
              marginLeft: 5,
              textDecorationLine: "underline",
            }}
          >
            {aboutFitness && aboutFitness[0].phone_number}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.instagram.com/gold_fitness_aktobe")
          }
          style={{
            padding: 15,
            width: "31%",
            backgroundColor: "#393C43",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <Fontisto name="instagram" size={30} color="#CFA953" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.tiktok.com/@gold.fitness.aqtobe")
          }
          style={{
            padding: 15,
            width: "31%",
            backgroundColor: "#393C43",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <FontAwesome5 name="tiktok" size={30} color="#CFA953" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://goldfitness.kz")}
          style={{
            padding: 15,
            width: "31%",
            backgroundColor: "#393C43",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <MaterialCommunityIcons name="web" size={30} color="#CFA953" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutFitness;
