import axios from "axios";

export const getPersonal = (setIsLoading, setClientsPersonal, phone) => {
  // console.log(phone)
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/personalTraining?trainer_phone_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      if (info.message === "Нет персональных тренировок") {
        setClientsPersonal(info.message);
      }
      setClientsPersonal(info);
      console.log(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getPersonalSelected = (
  setIsLoading,
  setClientsPersonal,
  selectedDate,
  phone
) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/personalTraining?trainer_phone_number=${phone}&date_nach=${selectedDate}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      if (info.message === "Нет персональных тренировок") {
        setClientsPersonal(info.message);
      }
      // console.log(info)
      setClientsPersonal(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getPersonalSelectedClient = (
  setIsLoading,
  setPersonal,
  selectedDate,
  phone
) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/personalTrainingClient?client_phone_number=${phone}&date_nach=${selectedDate}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      if (info.message === "Нет персональных тренировок") {
        setPersonal(info.message);
      }
      // console.log(info)
      setPersonal(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getPersonalClient = (setIsLoading, setPersonal, phone) => {
  // console.log(phone)
  setIsLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/personalTrainingClient?client_phone_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      if (info.message === "Нет персональных тренировок") {
        setPersonal(info.message);
      }
      setPersonal(info);
      console.log(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
