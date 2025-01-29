import axios from "axios";
import qs from "qs";

export const getTodayNumberTrain = (setIsLoading, setCountToday, phone) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/findTrainingDay?user_tel_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setCountToday(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getNowClientsCount = (setLoading, setNowClients) => {
  setLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/findCountVisitClients`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setNowClients(info);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
};
