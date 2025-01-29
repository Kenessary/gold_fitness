import axios from "axios";
import qs from "qs"
import { Alert } from "react-native";

export const checkMember = (phone, setCheckStatus, setIsLoading) => { 
  setIsLoading(true)
  const config = {
    method:'get',
    url: `http://portmaster.kz/api/fitness/v1/checkmember?phone_number=${phone}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data
    if(info.message === 'Этот номер уже зарегестрирован'){
      Alert.alert(info.message)
    }
    setCheckStatus(info.message)
    setIsLoading(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoading(false)
  })
}