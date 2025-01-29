import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet, View, Image } from "react-native";
import { textStyles } from "../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import InputForNews from "../../component/InputForNews";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIndicator } from "react-native-indicators";
import axios from "axios";
import qs from "qs";
import { useNavigation } from "@react-navigation/native";

const AddNews = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({ title: "", bodyText: "" });
  const [imageForNew, setImageForNew] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

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
      setImageForNew(result.assets[0].base64);
    }

    if (result.canceled) {
      setAddLoading(false);
    }
  };

  const addNewsImage = () => {
    !hasGalleryPermission &&
      hasGalleryPermission === null &&
      getAccessToPhoto();
    hasGalleryPermission && pickImage();
    hasGalleryPermission && setAddLoading(true);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const addNews = async (title, text, date, photo) => {
    setIsLoading(true);
    const data = qs.stringify({
      title: title,
      text: text,
      date: date,
      photo: photo,
    });
    const config = {
      method: "post",
      url: "https://portmaster.kz/api/fitness/v1/addNews",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let info = response.data;
        if (info.message === "Новость добавлена!") {
          Alert.alert(
            info.message,
            "Нажмите 'OK'",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ alignItems: "center", flex: 1, backgroundColor: "#111214" }}
      >
        {imageForNew ? (
          <>
            <Image
              source={{ uri: `data:image/png;base64,${imageForNew}` }}
              style={{ height: 200, width: "100%" }}
            />
            <TouchableOpacity
              onPress={() => {
                setImageForNew(""), setAddLoading(false);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                width: "90%",
                height: 40,
                backgroundColor: "#FF5D4D",
                borderRadius: 10,
              }}
            >
              <Text style={textStyles.bold16pxWhite}>Удалить обложку</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => addNewsImage()}
            style={{
              width: "100%",
              backgroundColor: "#202225",
              height: 200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {addLoading ? (
              <MaterialIndicator color="#BC994A" />
            ) : (
              <>
                <MaterialIcons name="add-a-photo" size={50} color="grey" />
                <Text
                  style={{
                    ...textStyles.bold16pxGrey,
                    marginTop: 5,
                    textAlign: "center",
                  }}
                >
                  Добавить обложку
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
        <View style={{ width: "90%", marginTop: 15 }}>
          <InputForNews
            label="Заголовок"
            fontSize={16}
            value={inputs.title}
            onChangeText={(text) => handleOnChange(text, "title")}
            height={42}
          />
          <InputForNews
            label="Основной текст"
            fontSize={16}
            value={inputs.bodyText}
            onChangeText={(text) => handleOnChange(text, "bodyText")}
            height={200}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            imageForNew
              ? addNews(
                  inputs.title,
                  inputs.bodyText,
                  formattedDate,
                  imageForNew
                )
              : Alert.alert("Добавьте обложку");
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            height: 45,
            borderRadius: 15,
            marginTop: 30,
            backgroundColor: "#BC994A",
          }}
        >
          {isLoading ? (
            <MaterialIndicator color="white" />
          ) : (
            <Text style={textStyles.bold18pxWhite}>Добавить новости</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default AddNews;
