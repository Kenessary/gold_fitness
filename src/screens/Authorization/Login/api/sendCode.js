import axios from "axios";
import qs from "qs";

export const sendCode = (phone, setSuccessSendCode, code) => {
  const text = "- Kод Gold Fitness. Никому не показывайте его";
  const chatId = "7" + phone + "@c.us";
  const message = `${JSON.parse(code)} ${text}`;

  const data = {
    chatId: chatId,
    message: message,
  };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://7103.api.greenapi.com/waInstance7103121506/sendMessage/4c3fc93c45b24597a85fe6dd4393f2ff580763953df3424fbb",
    // url: "https://7103.api.greenapi.com/waInstance7103843536/sendMessage/9b4b62a22d4f46eaa6598d12b8a1a69a1293ab4375eb47fbbc",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      if (JSON.stringify(response.data).length === 32) {
        setSuccessSendCode(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCode = (
  phone,
  setSuccessSendCode,
  setCode,
  setIsLoadingSend
) => {
  setIsLoadingSend(true);
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/getCode?trainer_phone_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setCode(info);
      sendCode(phone, setSuccessSendCode, JSON.stringify(info));
      // setIsLoadingSend(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoadingSend(false);
    });
};

export const sendCodeRetry = (phone, code) => {
  const text = "- Kод Gold Fitness. Никому не показывайте его";
  const chatId = "7" + phone + "@c.us";
  const message = `${JSON.parse(code)} ${text}`;

  const data = {
    chatId: chatId,
    message: message,
  };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://7103.api.greenapi.com/waInstance7103121506/sendMessage/4c3fc93c45b24597a85fe6dd4393f2ff580763953df3424fbb",
    // url: "https://7103.api.greenapi.com/waInstance7103843536/sendMessage/9b4b62a22d4f46eaa6598d12b8a1a69a1293ab4375eb47fbbc",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {})
    .catch((error) => {
      console.log(error);
    });
};

export const getCodeRetry = (phone, setCode) => {
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/getCode?trainer_phone_number=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setCode(info);
      sendCodeRetry(phone, JSON.stringify(info));
    })
    .catch(function (error) {
      console.log(error);
    });
};
