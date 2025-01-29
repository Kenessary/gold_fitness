import axios from "axios";
import qs from "qs";
import { Alert } from "react-native";

export const changePassword = (
  token,
  phone_number,
  password,
  password_confirmation,
  setIsLoading,
  goBack
) => {
  setIsLoading(true);
  const data = qs.stringify({
    token: token,
    phone_number: phone_number,
    password: password,
    password_confirmation: password_confirmation,
  });
  const config = {
    method: "post",
    url: "https://portmaster.kz/api/fitness/v1/resetpasswordconfirm",
    headers: {
      Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const info = response.data;
      Alert.alert(
        `${info.message}`, // Only the title
        "Войдите с новым паролем", // Empty message, so it won't show any message
        [{ text: "OK", onPress: () => goBack() }],
        { cancelable: true }
      );

      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(true);
    });
};
