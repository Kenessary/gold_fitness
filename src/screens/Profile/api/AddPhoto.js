import axios from "axios"
import qs from "qs"

  export const addPhoto = (phone_number, photo_path, setIsLoading) => {
        // setIsLoading(true)
        const data = qs.stringify({
            'phone_number': phone_number,
            'photo_path': photo_path
        })
        const config = {
            method: 'post',
            url: 'https://portmaster.kz/api/fitness/v1/addPhoto',
            headers: { 
                'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data : data  
        }
        axios(config)
        .then(function(response){
            const added = response.data
            // console.log(added)
            setIsLoading(false)
        })
        .catch(function(error){
            console.log(error)
            setIsLoading(false)
        })  
    }