import axios from "axios";

export const getContactsTrainers = (setIsLoading, setContacts) => { 
  setIsLoading(true)
  const config = {
    method:'get',
    url: `http://portmaster.kz/api/fitness/v1/findContactsEmployees?phone_number=87779942424`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data

    info.forEach(item => {
      if (item.NomerTel && item.NomerTel.length > 0) {
        item.NomerTel = '7' + item.NomerTel.slice(1);
      }
    });
    setContacts(info)


    setIsLoading(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoading(false)
  })
}