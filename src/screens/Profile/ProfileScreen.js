import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { MaterialIndicator } from "react-native-indicators";
import Settings from "./components/Settings";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import { addPhoto } from "./api/AddPhoto";
import { deletePhoto } from "./api/DeletePhoto";
import { textStyles } from "../../styles/globalStyles";
import PersonalData, { PersonalStatistics } from "./components/PersonalData";
import PhotoAddModal from "./components/PhotoAddModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileImage from "./components/ProfileImage";
import TopProfileMenu from "./components/TopProfileMenu";
import { profileScreen } from "./styles/profileStyle";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ClientProfilePage from "./components/ClientProfilePage";
import { findClientsInADay, getTokenForRestore } from "./api/GetProfile";
import { BottomSheet } from "react-native-btr";

export default function ProfileScreen({ navigation }) {
  const { phone, position } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState("");

  // console.log(profile);

  const [tokenForRestore, setTokenForRestore] = useState("");
  const [todayVisible, setTodayVisible] = useState(false);

  // console.log(tokenForRestore);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [todayClients, setTodayClients] = useState("");
  const [todayClientsLoading, setTodayClientsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("setHasGalleryPermission").then((value) => {
      const hasPermission = value;
      setHasGalleryPermission(hasPermission);
    });
  }, []);

  const getAccessToPhoto = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (galleryStatus.status === "denied") {
      Alert.alert(
        "Нет доступа к медиа файлам",
        "Разрешите доступ к медиа файлам в настройках"
      );
      setHasGalleryPermission(false);
      AsyncStorage.setItem("setHasGalleryPermission", "false");
    }
    if (galleryStatus.status === "granted") {
      setHasGalleryPermission(true);
      AsyncStorage.setItem("setHasGalleryPermission", "true");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 16],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setModalVisible(false);
      addPhoto(phone, result.assets[0].base64, setAddLoading);
      setImage(result.assets[0].base64);
    }

    if (result.canceled) {
      setAddLoading(false);
    }
  };

  const getProfile = (setIsLoading, setProfile) => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `http://portmaster.kz/api/fitness/v1/infoabouttrainer?user_tel_number=${phone}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data;
        setProfile(info);
        setImage(info.photo_users[0].photo_path);
        getTokenForRestore(phone, setTokenForRestore);

        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProfile(setIsLoading, setProfile);
  }, []);

  const addProfileImage = () => {
    !hasGalleryPermission &&
      hasGalleryPermission === null &&
      getAccessToPhoto();
    hasGalleryPermission && pickImage();
    hasGalleryPermission && setAddLoading(true);
  };

  const deleteProfileImage = () => {
    deletePhoto(phone, setDeleteLoading),
      setImage(null),
      setModalVisible(false);
  };

  if (!profile) {
    return (
      <View style={profileScreen.loaderContainer}>
        <MaterialIndicator color="#BC994A" />
      </View>
    );
  }

  // useEffect(() => {
  //   if (todayVisible) {
  //     findClientsInADay();
  //   }
  // }, [todayVisible]);

  return (
    <View
      style={{ ...profileScreen.container, opacity: modalVisible ? 0.85 : 1 }}
    >
      <BottomSheet visible={todayVisible}>
        <View style={[styles.bottomNavigationView]}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
              height: "5%",
            }}
          >
            <Text style={textStyles.bold20pxWhite}>Сегодня</Text>
            <TouchableOpacity onPress={() => setTodayVisible(false)}>
              <AntDesign name="closecircle" size={22} color={"grey"} />
            </TouchableOpacity>
          </View>

          {todayClientsLoading ? (
            <ActivityIndicator color={"#BC994A"} size={"large"} />
          ) : (
            <ScrollView style={{ height: "95%" }}>
              {todayClients &&
                todayClients.map((el) => (
                  <View
                    key={Math.random()}
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      backgroundColor: "#393C43",
                      borderRadius: 15,
                      padding: 5,
                      paddingVertical: 10,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View style={{ width: "15%", alignItems: "center" }}>
                      <MaterialIcons
                        name="account-circle"
                        size={24}
                        color="white"
                      />
                    </View>
                    <View style={{ width: "82%" }}>
                      <Text style={{ ...textStyles.bold16pxWhite }}>
                        {el.client}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          )}
        </View>
      </BottomSheet>

      {position === "trainer" ? (
        <>
          <View style={profileScreen.centeredContainer}>
            <TopProfileMenu setVisible={setVisible} navigation={navigation} />
            {profile.message === "Тренер не найден" ? (
              <Text style={{ ...textStyles.bold18pxWhite, marginTop: 50 }}>
                Вы не являетесь тренером
              </Text>
            ) : (
              <View style={profileScreen.profileContainer}>
                <ProfileImage image={image} setModalVisible={setModalVisible} />
                <Text style={{ ...textStyles.bold20pxWhite, marginTop: 10 }}>
                  {profile.info_users.LastName} {profile.info_users.Name}
                </Text>

                <View style={{ width: "100%" }}>
                  <PersonalData profile={profile} />
                  <PersonalStatistics
                    profile={profile}
                    setIsLoading1={setIsLoading1}
                    isLoading1={isLoading1}
                    setProfile={setProfile}
                    phone={phone}
                    setTodayVisible={setTodayVisible}
                    setTodayClients={setTodayClients}
                    setTodayClientsLoading={setTodayClientsLoading}
                  />
                </View>
              </View>
            )}
          </View>
        </>
      ) : (
        <ClientProfilePage
          image={image}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          profile={profile}
          visible={visible}
          setVisible={setVisible}
        />
      )}

      <Settings
        visible={visible}
        setVisible={setVisible}
        tokenForRestore={tokenForRestore}
      />
      <PhotoAddModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addLoading={addLoading}
        addProfileImage={addProfileImage}
        deleteProfileImage={deleteProfileImage}
        image={image}
        deleteLoading={deleteLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: "80%",
    //   justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
});
