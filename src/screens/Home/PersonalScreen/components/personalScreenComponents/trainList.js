import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../../../../styles/globalStyles";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { clientsTrain } from "../../styles/personalScreenStyle";

const TrainList = ({ personal }) => {
  return (
    <View style={clientsTrain.cardContainer}>
      {personal.map((el) => (
        <View key={Math.random()} style={clientsTrain.card}>
          <View style={clientsTrain.innerElementsClient}>
            <View style={clientsTrain.infoContainerClient}>
              <View style={clientsTrain.clientNameContainer}>
                <Text style={textStyles.medium18pxWhite}>{el.type}</Text>
              </View>
              <View style={clientsTrain.trainTypeContainer}>
                <Text style={clientsTrain.trainType}>
                  Тренер: {el.LastName} {el.Name}
                </Text>
              </View>
              <View style={clientsTrain.statusContainer}>
                {el.status_planing === "planned" ? (
                  <MaterialCommunityIcons
                    name="clock"
                    size={14}
                    color="#B8B8B6"
                  />
                ) : (
                  <FontAwesome5 name="check-circle" size={14} color="#00BD13" />
                )}

                <Text style={{ ...textStyles.regular14pxWhite, marginLeft: 5 }}>
                  {el.status_planing === "planned"
                    ? "Запланированно"
                    : "Завершено"}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "20%" }}>
            <View style={clientsTrain.time}>
              <Text style={textStyles.bold18pxWhite}>{el.time}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TrainList;
