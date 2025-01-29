import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { useNavigation } from "@react-navigation/native";
import Calendar from "./Calendar";
import { MaterialIndicator } from "react-native-indicators";
import { textStyles } from "../../../../styles/globalStyles";
import {
  convertToWhatsapp,
  transformDateFormat,
} from "../../../../helpers/helpers";
import { clientInfoStyles } from "../styles/clientScreenStyles";

export default function ClientInfo({
  visible,
  setVisible,
  isLoading,
  client,
  setIsLoadingClient,
  setClient,
}) {
  const navigation = useNavigation();

  return (
    <BottomSheet visible={visible}>
      <View style={[clientInfoStyles.bottomNavigationView]}>
        {isLoading ? (
          <View style={clientInfoStyles.loader}>
            <MaterialIndicator color="#BC994A" />
          </View>
        ) : (
          client && (
            <View style={{ height: "90%", padding: 10 }}>
              <View style={clientInfoStyles.clientInfoContainer}>
                <View style={clientInfoStyles.bio}>
                  <View style={clientInfoStyles.imageContainerWidth}>
                    <MaterialIcons
                      name="account-circle"
                      size={100}
                      color="#BDBDBD"
                    />
                  </View>
                  <View style={clientInfoStyles.bioContainerWidth}>
                    <Text
                      style={{ ...textStyles.medium20pxWhite, marginBottom: 5 }}
                    >
                      {client.info[0].FIO}
                    </Text>
                    <Text
                      style={{ ...textStyles.medium14pxWhite, marginBottom: 5 }}
                    >
                      {transformDateFormat(client.info[0].DateRozh)}
                    </Text>
                    <Text
                      style={{ ...textStyles.medium14pxWhite, marginBottom: 5 }}
                    >
                      {client.info[0].Subscription}
                    </Text>
                    <Text style={textStyles.medium14pxWhite}>
                      Когда купил:{" "}
                      {transformDateFormat(client.info[0].DateActiv)}
                    </Text>
                  </View>
                </View>

                <View style={clientInfoStyles.statusContainer}>
                  <Text style={textStyles.medium14pxWhite}>
                    Истекает: {transformDateFormat(client.info[0].Srok)}
                  </Text>
                  <View
                    style={{
                      ...clientInfoStyles.status,
                      backgroundColor:
                        client.info[0].Status === "Закрыт"
                          ? "#E53D3D"
                          : "#1A9627",
                    }}
                  >
                    <Text style={{ ...textStyles.medium14pxWhite }}>
                      {client.info[0].Status === "Закрыт"
                        ? "Не активен"
                        : "Активен"}
                    </Text>
                  </View>
                </View>

                <View style={clientInfoStyles.callContainer}>
                  <TouchableOpacity
                    onPress={() => convertToWhatsapp(client.info[0].NomerTel)}
                    style={clientInfoStyles.whatsAppBtn}
                  >
                    <FontAwesome name="whatsapp" size={20} color="white" />
                    <Text
                      style={{ ...textStyles.medium16pxWhite, marginLeft: 10 }}
                    >
                      WhatsApp
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Calendar
                clientNumber={client.info[0].NomerTel}
                clientPlan={client.plan}
                setIsLoadingClient={setIsLoadingClient}
                setClient={setClient}
              />
            </View>
          )
        )}

        <View
          style={{
            ...clientInfoStyles.closeContainer,
            display: isLoading ? "none" : "flex",
          }}
        >
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={clientInfoStyles.closeBtn}
          >
            <Text style={textStyles.medium16pxWhite}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}
