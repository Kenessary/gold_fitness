import axios from "axios";

export const getAllNews = (setIsLoading, setNewsList) => {
  setIsLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/getAllNews`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setNewsList(info);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};
