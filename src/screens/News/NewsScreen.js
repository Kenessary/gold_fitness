import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { textStyles } from "../../styles/globalStyles";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { profileScreen } from "../Profile/styles/profileStyle";
import { MaterialIndicator } from "react-native-indicators";
import { getAllNews } from "./api";

const NewsScreen = () => {
  const navigation = useNavigation();
  const { news, phone } = useContext(AuthContext);
  const [newsList, setNewsList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = useCallback(() => {
    getAllNews(setIsLoading, setNewsList);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNews();
    }, [fetchNews])
  );

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

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
        backgroundColor: "#111214",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "#202226",
          height: 110,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ ...textStyles.bold22pxWhite }}>Новости</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddNews")}
            style={{
              padding: 7,
              backgroundColor: "#BC994A",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              display:
                news === "Yes" || phone === "87000020202" ? "flex" : "none",
            }}
          >
            <Text style={textStyles.bold16pxWhite}>Добавить новости</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {newsList.message === "Нет никаких новостей)" ? (
          <View>
            <Text style={{ ...textStyles.bold20pxWhite, marginTop: 15 }}>
              Нет никаких новостей
            </Text>
          </View>
        ) : (
          <View>
            {newsList.length !== 0 &&
              newsList.map((oneNew) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("OneNewScreen", { oneNew });
                  }}
                  key={Math.random()}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    backgroundColor: "#202225",
                    marginTop: 15,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ ...textStyles.medium18pxWhite, width: "78%" }}
                    >
                      {oneNew.title}
                    </Text>
                    <View
                      style={{
                        width: "20%",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text style={textStyles.medium12pxWhite}>
                        {oneNew.date}
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: `data:image/png;base64,${oneNew.photo}` }}
                    style={{
                      width: 295,
                      height: 160,
                      marginTop: 12,
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewsScreen;
