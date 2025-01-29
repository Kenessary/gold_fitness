import axios from "axios";

export const getAllPrice = (setIsLoading, setAllPrice) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/getAllPrice`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setAllPrice(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const getPrice = (setIsLoadingPrice, setPrice, priceId, setImgId) => {
  setIsLoadingPrice(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/getPrice?id=${priceId}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setImgId(info[0].photo);
      setPrice(info);
      setIsLoadingPrice(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoadingPrice(false);
    });
};

export const getPriceGroup = (
  setIsLoadingPrice,
  setPrice,
  priceId,
  setImgId
) => {
  setIsLoadingPrice(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/getGroupPrice?id=${priceId}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      console.log(info);
      setPrice(info);
      setIsLoadingPrice(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoadingPrice(false);
    });
};
