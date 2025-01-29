import axios from "axios"
import qs from "qs"

  export const deletePhoto = (phone_number, setIsLoading) => {
        setIsLoading(true)
        const data = qs.stringify({
            'phone_number': phone_number
        })
        const config = {
            method: 'post',
            url: 'https://portmaster.kz/api/fitness/v1/deletePhoto',
            headers: { 
                'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data : data  
        }
        axios(config)
        .then(function(response){
            const deleted = response.data
            console.log(deleted)
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        })  
    }