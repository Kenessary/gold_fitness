import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { textStyles } from "../../../../styles/globalStyles";
import ProfileCard from "./ProfileCard";
import { existWhatsApp, getCode, sendCode } from "../api/sendCode";
import { convertToDesiredFormat } from "../../../../helpers/helpers";

const CheckAccount = ({
  restorePasswordPhone,
  setSuccessSendCode,
  setProfile,
  setRestorePasswordPhone,
  setNotMyAccount,
  profile,
  setCode,
  setIsLoadingSend,
}) => {
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    if (profile) {
      // Start the smooth appearance animation when the component mounts or isVisible becomes true
      Animated.timing(animation, {
        toValue: 1, // End value for the animation
        duration: 400, // Duration of the animation in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start();
    } else {
      // Reset the animation when switchIsForgotPass becomes false
      animation.setValue(0); // Reset the animation value to 0
    }
  }, [profile]);

  // console.log(profile);

  const animatedStyles = {
    opacity: animation, // Use animated value for opacity
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1], // Interpolate scale from 0.8 to 1
        }),
      },
    ],
  };
  // console.log(convertToDesiredFormat(restorePasswordPhone).slice(1));

  const whatsAppCheck = () => {
    getCode(
      convertToDesiredFormat(restorePasswordPhone).slice(1),
      setSuccessSendCode,
      setCode,
      setIsLoadingSend
    );
    setProfile("");
  };

  const rejectCheck = () => {
    setRestorePasswordPhone(""), setProfile(""), setNotMyAccount(true);
  };

  return (
    <>
      {profile === "Такого пользователя не существует" ? (
        <Text
          style={{
            ...textStyles.bold18pxWhite,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Такого пользователя не существует
        </Text>
      ) : (
        <Animated.View
          style={[
            { width: "100%", alignItems: "center", marginTop: 40 },
            animatedStyles,
          ]}
        >
          <Text
            style={{
              ...textStyles.medium16pxGrey,
              ...styles.title,
            }}
          >
            Проверьте, правильность выбранной учетной записи
          </Text>
          <ProfileCard profile={profile} />
          <TouchableOpacity
            style={{ ...styles.btn, marginTop: 20 }}
            onPress={() => whatsAppCheck()}
          >
            <Text style={textStyles.medium16pxWhite}>Да, это мой аккаунт</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.btn, backgroundColor: "#696969" }}
            onPress={() => rejectCheck()}
          >
            <Text style={textStyles.medium16pxWhite}>Это не мой аккаунт</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#BC994A",
    marginTop: 10,
    alignItems: "center",
    borderRadius: 8,
  },
});

export default CheckAccount;
