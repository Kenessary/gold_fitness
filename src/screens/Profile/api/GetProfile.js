import axios from "axios";
import qs from "qs";

export const getTokenForRestore = (phone_number, setTokenForRestore) => {
  // setIsLoading(true)
  const data = qs.stringify({
    phone_number: phone_number,
  });
  const config = {
    method: "post",
    url: "https://portmaster.kz/api/fitness/v1/resetpassword",
    headers: {
      Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const info = response.data;
      setTokenForRestore(info.token);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getProfile = (
  phone,
  setProfile,
  setIsLoading,
  setTokenForRestore
) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/infoabouttrainer?user_tel_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      getTokenForRestore(phone, setTokenForRestore);

      setProfile(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getPersonalToday = (setIsLoading, setTodayTrainingCount) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/infoabouttrainer?user_tel_number=87779942424`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setTodayTrainingCount(info.clients_day);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const findClientsInADay = (
  phone,
  setTodayClientsLoading,
  setTodayClients
) => {
  setTodayClientsLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/findClientsInADay?phone_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;

      setTodayClients(info);
      // setTodayTrainingCount(info.clients_day);
      // setTodayClientsLoading(false);
      setTimeout(() => {
        setTodayClientsLoading(false);
      }, 1000);
    })
    .catch(function (error) {
      console.log(error);
      setTodayClientsLoading(false);
    });
};
