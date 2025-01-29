import axios from "axios";
import qs from "qs"
import { Alert } from "react-native";

export const getAllClients = (setIsLoading, setClientsList, phone) => { 
  setIsLoading(true)
  const config = {
    method:'get',
    url: `http://portmaster.kz/api/fitness/v1/personalTrainingAll?trainer_phone_number=${phone}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data
    if(info.message === 'Не найдены персональные тренировки!'){
      setClientsList(info.message)
    } else {
      setClientsList(info)
    }


    setIsLoading(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoading(false)
  })
}