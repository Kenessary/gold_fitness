import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../../../../styles/globalStyles";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { clientsTrain } from "../../styles/personalScreenStyle";

const ClientsTrainList = ({ clientsPersonal }) => {
  // console.log(clientsPersonal);
  return (
    <View style={clientsTrain.cardContainer}>
      {clientsPersonal.map((el) => (
        <View key={Math.random()} style={clientsTrain.clienCard}>
          <View style={clientsTrain.innerElements}>
            <View
              style={{
                ...clientsTrain.imageContainer,
                borderColor: el.status === "Не в зале" ? "#E53D3D" : "#00BD13",
              }}
            >
              <MaterialIcons name="account-circle" size={50} color="#BDBDBD" />
            </View>

            <View style={clientsTrain.infoContainer}>
              <View style={clientsTrain.clientNameContainer}>
                <Text style={textStyles.medium18pxWhite}>
                  {el.LastName} {el.Name}
                </Text>
              </View>
              <View style={clientsTrain.trainTypeContainer}>
                <Text style={clientsTrain.trainType}>{el.type}</Text>
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
          <View style={clientsTrain.time}>
            <Text style={textStyles.bold18pxWhite}>{el.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ClientsTrainList;
