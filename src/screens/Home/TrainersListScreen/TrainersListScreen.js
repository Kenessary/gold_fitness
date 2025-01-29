import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { textStyles } from "../../../styles/globalStyles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { profileScreen } from "../../Profile/styles/profileStyle";
import axios from "axios";
import { MaterialIndicator } from "react-native-indicators";

const TrainersListScreen = ({ navigation }) => {
  // const navigation = useNavigation();

  const [trainersList, setTrainersList] = useState("");
  console.log(trainersList);
  const [isLoading, setIsLoading] = useState(false);

  const noPhoto = "https://portmaster.kz/trainersphoto";

  useEffect(() => {
    getTrainersList();
  }, []);

  const getTrainersList = () => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `https://portmaster.kz/api/fitness/v1/getTrainersForRecord`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data;
        setTrainersList(info);
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
    <View style={{ flex: 1, backgroundColor: "#202226", alignItems: "center" }}>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ width: "100%", alignItems: "center" }}>
          {trainersList.length !== 0 &&
            trainersList.map((trainer) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TrainerScreen", { trainer })
                }
                key={Math.random()}
                style={{
                  width: "95%",
                  padding: 12,
                  backgroundColor: "#393C43",
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      {trainer.photo === noPhoto ? (
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 14,
                            marginRight: 15,
                            backgroundColor: "#202226",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="account"
                            size={30}
                            color="grey"
                          />
                        </View>
                      ) : (
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 14,
                            marginRight: 15,
                            aspectRatio: 1,
                          }}
                          source={{
                            uri: trainer.photo,
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{ justifyContent: "space-between", width: "82%" }}
                    >
                      <View>
                        <Text style={textStyles.bold20pxWhite}>
                          {trainer.LastName} {trainer.Name}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{ ...textStyles.medium12pxGrey, marginTop: 3 }}
                        >
                          {trainer.Doljnost}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Entypo name="chevron-thin-right" size={16} color="#F0C157" />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrainersListScreen;
