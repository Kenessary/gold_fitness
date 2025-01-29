import { Entypo, FontAwesome5, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";
import { textStyles } from "../../../styles/globalStyles";
import { AuthContext } from "../../../context/AuthContext";

const ClientProfilePage = ({
  image,
  modalVisible,
  setModalVisible,
  profile,
  visible,
  setVisible,
}) => {
  // console.log(profile)
  const { phone } = useContext(AuthContext);
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View
        style={{
          width: "100%",
          backgroundColor: "#202226",
          height: 100,
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
          }}
        >
          <Text style={{ ...textStyles.bold22pxWhite }}>Профиль</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Ionicons name="settings-sharp" size={26} color="#BABBBD" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "95%",
          padding: 18,
          backgroundColor: "#202226",
          marginTop: 20,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ProfileImage image={image} setModalVisible={setModalVisible} />
        </View>
        <View style={{ width: "60%" }}>
          <Text style={textStyles.bold22pxWhite}>
            {profile.info_users.LastName} {profile.info_users.Name}
          </Text>
          <Text
            style={{
              ...textStyles.regular14pxWhite,
              fontWeight: "300",

              marginTop: 5,
              color: "#B8B8B6",
            }}
          >
            {profile.info_users.DateRozh}
          </Text>
          <View style={{ width: "100%", marginTop: 10 }}>
            <Text
              style={{
                ...textStyles.regular14pxWhite,
                fontWeight: "300",
                marginTop: 5,
              }}
            >
              {profile.info_users.NomerTel}
            </Text>
            {/* <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "#625537",
                flexDirection: "row",
                marginTop: 8,
                alignItems: "center",
                // justifyContent: "center",
                paddingLeft: 10,
                borderRadius: 5,
              }}
            >
              <FontAwesome5 name="user-edit" size={10} color="white" />
              <Text
                style={{
                  ...textStyles.regular14pxWhite,
                  fontWeight: "600",
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                Редактировать профиль
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      {/* <View
        style={{
          width: "95%",
          paddingVertical: 15,
          paddingHorizontal: 25,
          paddingLeft: 20,
          backgroundColor: "#202226",
          marginTop: 20,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#4E4635",
              borderRadius: 100,
            }}
          >
            <Fontisto name="calendar" size={15} color="#F0C157" />
          </View>
          <Text
            style={{
              ...textStyles.bold18pxWhite,
              marginTop: 5,
              marginLeft: 10,
            }}
          >
            История посещений
          </Text>
        </View>
        <Entypo name="chevron-thin-right" size={16} color="#F0C157" />
      </View> */}

      <View
        style={{
          width: "95%",
          paddingVertical: 15,
          paddingHorizontal: 25,
          backgroundColor: "#202226",
          marginTop: 15,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          display: phone === "87000020202" ? "none" : "flex",
        }}
      >
        {profile.visit_history ===
        "Нет информации о посещении за этот месяц" ? (
          <>
            <View>
              <Text style={{ ...textStyles.regular14pxWhite }}>
                История посещений
              </Text>
              <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
                {profile.visit_history}
              </Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text style={{ ...textStyles.regular14pxWhite }}>
                История посещений
              </Text>
              <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
                Вы посетили фитнес {profile.visit_history.VisitCount} раз
              </Text>
              <Text style={textStyles.bold16pxWhite}>
                Последнее посещение: {profile.visit_history.LastVisit}
              </Text>
            </View>
          </>
        )}
      </View>

      <View
        style={{
          width: "95%",
          paddingVertical: 15,
          paddingHorizontal: 25,
          backgroundColor: "#202226",
          marginTop: 15,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          display: phone === "87000020202" ? "none" : "flex",
        }}
      >
        {profile.gymmembership === "Нет абонемента" ? (
          <>
            <View>
              <Text style={{ ...textStyles.regular14pxWhite }}>Абонемент</Text>
              <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
                {profile.gymmembership}
              </Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text style={{ ...textStyles.regular14pxWhite }}>Абонемент</Text>
              <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
                {profile.gymmembership[0].Subscription}
              </Text>
              <Text style={textStyles.bold16pxWhite}>
                Срок: {profile.gymmembership[0].Srok}
              </Text>
            </View>
            {/* <Entypo name="chevron-thin-right" size={15} color="#F0C157" /> */}
          </>
        )}
      </View>

      <View
        style={{
          width: "95%",
          paddingVertical: 15,
          paddingHorizontal: 25,
          backgroundColor: "#202226",
          marginTop: 15,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          display: phone === "87000020202" ? "none" : "flex",
        }}
      >
        {profile.infoaboutpersonal === "Нет персональных тренировок" ? (
          <>
            <View>
              <Text style={{ ...textStyles.regular14pxWhite }}>
                Персональные тренировки
              </Text>
              <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
                {profile.infoaboutpersonal}
              </Text>
            </View>
            {/* <Entypo name="chevron-thin-right" size={15} color="#F0C157" /> */}
          </>
        ) : (
          <>
            <View>
              <Text style={{ ...textStyles.regular14pxWhite }}>
                Персональные тренировки
              </Text>
              <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
                {profile.infoaboutpersonal[0].Ostatok} занятии
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="user-alt" size={12} color="#B8B8B6" />
                <Text
                  style={{
                    ...textStyles.regular14pxWhite,
                    color: "#B8B8B6",
                    marginLeft: 5,
                  }}
                >
                  Тренер: {profile.infoaboutpersonal[0].Trainer}
                </Text>
              </View>
            </View>
            {/* <Entypo name="chevron-thin-right" size={15} color="#F0C157" /> */}
          </>
        )}
      </View>

      {/* <View
        style={{
          width: "95%",
          paddingVertical: 15,
          paddingHorizontal: 25,
          backgroundColor: "#202226",
          marginTop: 15,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View>
          <Text style={{ ...textStyles.regular14pxWhite }}>
            Групповые тренировки
          </Text>
          <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
            <Text
              style={{
                ...textStyles.regular22pxWhite,
                marginTop: 5,
                // fontWeight: "300",
              }}
            >
              Сегодня у вас:
            </Text>
            {"  "}
            Cycle
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="user-alt" size={12} color="#B8B8B6" />
            <Text
              style={{
                ...textStyles.regular14pxWhite,
                color: "#B8B8B6",
                marginLeft: 5,
              }}
            >
              Тренер: Табнаева Венера
            </Text>
          </View>
        </View>
        <Entypo name="chevron-thin-right" size={15} color="#F0C157" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClientProfilePage;
