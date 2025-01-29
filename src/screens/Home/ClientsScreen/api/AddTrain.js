import axios from "axios"
import qs from "qs"

export const addTrain = (date_plan, time, status_plan, type, phone_number, setIsLoading, setResultAdding, phone ) => {
    setIsLoading(true)
    const data = qs.stringify({
        'date_plan': date_plan,
        'time': time,
        'status_plan': status_plan,
        'type': type,
        'phone_number': phone_number,
        'phone_number_trainer': phone,
    })
    const config = {
        method: 'post',
        url: 'https://portmaster.kz/api/fitness/v1/trainingplanning',
        headers: { 
            'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        data : data  
    }
    axios(config)
    .then(function(response){
        const res = response.data
        setResultAdding(res)
        setIsLoading(false)
    })
    .catch(function(error){
        console.log(error)
        setIsLoading(false)
    })  
}

export const changeTrain = (id, date_plan, time, status_plan, type, phone_number, setIsLoading, setResultAdding, phone ) => {
    setIsLoading(true)
    const data = qs.stringify({
        'id': id,
        'date_plan': date_plan,
        'time': time,
        'status_plan': status_plan,
        'type': type,
        'phone_number': phone_number,
        'phone_number_trainer': phone,
    })
    const config = {
        method: 'post',
        url: 'https://portmaster.kz/api/fitness/v1/trainingplanning',
        headers: { 
            'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        data : data  
    }
    axios(config)
    .then(function(response){
        const res = response.data
        setResultAdding(res)
        setIsLoading(false)
    })
    .catch(function(error){
        console.log(error)
        setIsLoading(false)
    })  
}