import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { MaterialIndicator } from "react-native-indicators";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import ClientInfo from "./components/ClienInfo";
import { getAllClients } from "./api/GetAllClients";
import { getClient } from "./api/GetClient";
import { AuthContext } from "../../../context/AuthContext";
import { clientsScreenStyles } from "./styles/clientScreenStyles";

export default function ClientsScreen() {
  const { phone } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clientsList, setClientsList] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    getAllClients(setIsLoading, setClientsList, phone);
  }, []);

  const handleGetClient = (client) => {
    setVisible(true),
      getClient(setIsLoadingClient, setClient, client.NomerTelClient);
  };

  if (isLoading) {
    return (
      <View style={clientsScreenStyles.loader}>
        <MaterialIndicator color="#BC994A" />
      </View>
    );
  }

  return (
    <View style={clientsScreenStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={clientsScreenStyles.scrollContainer}
      >
        {clientsList === "Не найдены персональные тренировки!" ? (
          <View style={clientsScreenStyles.emptyContentContainer}>
            <FontAwesome5 name="user-times" size={40} color="white" />
            <Text style={clientsScreenStyles.emptyContentText}>
              Не найдены персональные клиенты
            </Text>
          </View>
        ) : (
          <View style={clientsScreenStyles.cardContainer}>
            {clientsList &&
              clientsList.map((el) => (
                <TouchableOpacity
                  onPress={() => handleGetClient(el)}
                  key={Math.random()}
                  style={clientsScreenStyles.clienCard}
                >
                  <View style={clientsScreenStyles.innerElements}>
                    <View style={{ width: "15%" }}>
                      <MaterialIcons
                        name="account-circle"
                        size={50}
                        color="#BDBDBD"
                      />
                    </View>
                    <View style={{ marginLeft: 10, width: "70%" }}>
                      <Text style={clientsScreenStyles.clientName}>
                        {el.Client}
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <AntDesign name="caretright" size={24} color="#626262" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>

      <ClientInfo
        visible={visible}
        setVisible={setVisible}
        isLoading={isLoadingClient}
        client={client}
        setIsLoadingClient={setIsLoadingClient}
        setClient={setClient}
      />
    </View>
  );
}
