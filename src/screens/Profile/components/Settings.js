import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { BottomSheet } from "react-native-btr";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../../context/AuthContext";
// import { deleteProfile } from "../api/DeleteProfile/";
// deleteProfile
import { MaterialIndicator } from "react-native-indicators";
import { textStyles } from "../../../styles/globalStyles";
import { settings } from "../styles/profileStyle";
import { useNavigation } from "@react-navigation/native";
import { deleteProfile } from "../api/DeleteProfile";

export default function Settings({ visible, setVisible, tokenForRestore }) {
  const { logout } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [deleteResult, setDeleteResult] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <BottomSheet visible={visible}>
      {!modalVisible ? (
        <MainSettings
          setVisible={setVisible}
          logout={logout}
          setModalVisible={setModalVisible}
          tokenForRestore={tokenForRestore}
        />
      ) : !deleteResult ? (
        <Choice
          isLoading={isLoading}
          deleteProfile={deleteProfile}
          setModalVisible={setModalVisible}
        />
      ) : (
        <DeletedResult logout={logout} />
      )}
    </BottomSheet>
  );
}

const MainSettings = ({
  setVisible,
  logout,
  setModalVisible,
  tokenForRestore,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[settings.bottomNavigationView]}>
      <View style={settings.titleContainer}>
        <Text style={{ ...textStyles.bold22pxWhite, marginLeft: 5 }}>
          Настройки
        </Text>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
        >
          <AntDesign name="closecircle" size={26} color="#696969" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RestorePassword", tokenForRestore),
            setVisible(false);
        }}
        style={settings.restoreBtn}
      >
        <Text style={{ ...textStyles.bold18pxWhite, marginLeft: 5 }}>
          Изменить пароль
        </Text>
        <Entypo name="chevron-right" size={18} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => logout()} style={settings.exitBtn}>
        <Ionicons name="exit" size={24} color="white" />
        <Text style={{ ...textStyles.bold18pxWhite, marginLeft: 5 }}>
          Выйти
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={settings.deleteAccountBtn}
      >
        <MaterialIcons name="delete" size={24} color="white" />
        <Text style={{ ...textStyles.bold18pxWhite, marginLeft: 5 }}>
          Удалить аккаунт
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Choice = ({ isLoading, deleteProfile, setModalVisible }) => {
  return (
    <View style={[settings.bottomNavigationView]}>
      <View style={settings.deleteResultContainer}>
        <Text style={{ ...textStyles.bold22pxWhite, marginLeft: 5 }}>
          Настройки
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <AntDesign name="leftcircle" size={26} color="#696969" />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ ...textStyles.bold18pxWhite, marginTop: 50 }}>
          Вы точно хотите удалить аккаунт?
        </Text>
        <View style={settings.choiceContainer}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => deleteProfile(phone, setDeleteResult, setIsLoading)}
            style={settings.yesBtn}
          >
            {isLoading ? (
              <MaterialIndicator size={20} color="white" />
            ) : (
              <Text style={textStyles.bold18pxWhite}>Да</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => setModalVisible(false)}
            style={settings.noBtn}
          >
            <Text style={textStyles.bold18pxWhite}>Нет</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DeletedResult = ({ logout }) => {
  return (
    <View style={[settings.bottomNavigationView]}>
      <View style={settings.deletedResultContainer}>
        <Text style={{ ...textStyles.bold22pxWhite, marginLeft: 5 }}>
          Настройки
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ ...textStyles.bold20pxWhite, marginTop: 50 }}>
          Аккаунт успешно удален
        </Text>
        <View style={settings.resultContainer}>
          <TouchableOpacity onPress={() => logout()} style={settings.submitBtn}>
            <Text style={textStyles.bold18pxWhite}>Хорошо</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
