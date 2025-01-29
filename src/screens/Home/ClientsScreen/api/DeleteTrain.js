import axios from "axios";
import qs from "qs";

export const deleteTrain = (
  setIsLoadingDel,
  id,
  setResultDelete,
  setModalDelShow
) => {
  setIsLoadingDel(true);
  const data = qs.stringify({
    id: id,
  });
  const config = {
    method: "post",
    url: "https://portmaster.kz/api/fitness/v1/deletePerTraining",
    headers: {
      Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const res = response.data;
      if (res.message === "Тренировка удалена") {
        setModalDelShow(true);
      }
      setResultDelete(res);

      setIsLoadingDel(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoadingDel(false);
    });
};
