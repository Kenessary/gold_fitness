import axios from "axios";
import qs from "qs";
import { Alert } from "react-native";

export const getClient = (setIsLoading, setClient, phone) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/gymmembership?client_phone_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setClient(info);
      // console.log(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
