import axios from "axios";
import qs from "qs";
import { Alert } from "react-native";

export const groupLessonsToday = (
  setIsLoading,
  setGroupLessons,
  selectedDay
) => {
  setIsLoading(true);

  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/groupclasses2?date_nach=${selectedDay}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      // console.log(info);
      if (info.message === "Групповые занятия отсутсвуют!") {
        setGroupLessons(info.message);
      } else {
        setGroupLessons(info);
      }
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setIsLoading(false);
    });
};

export const groupLessonsTodayNoLoad = (setGroupLessons, selectedDay) => {
  const config = {
    method: "get",
    url: `http://portmaster.kz/api/fitness/v1/groupclasses2?date_nach=${selectedDay}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      // console.log(info);
      if (info.message === "Групповые занятия отсутсвуют!") {
        setGroupLessons(info.message);
      } else {
        setGroupLessons(info);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const checkForPossibilityApi = (setCheckForPossibility, phone) => {
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/checkForPossibility?phone_number_client=${phone}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setCheckForPossibility(info);
      console.log(info);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const recordCycle = (
  activity_id,
  setRecordLoad,
  setCheckForPossibility,

  setTakeGroupWindow,
  setStatusRecord,
  setStatusLoading,
  phone
) => {
  setRecordLoad(true);
  const data = qs.stringify({
    phone_number_client: phone,
    activity_id: activity_id,
  });
  const config = {
    method: "post",
    url: "https://portmaster.kz/api/fitness/v1/recordForCycle",
    headers: {
      Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const info = response.data;
      if (info.message === "Клиент успешно добавлен") {
        Alert.alert(
          "Вы успешно записались",
          "  ",
          [
            {
              text: "OK",
              onPress: () => {
                checkForPossibilityApi(setCheckForPossibility, phone);
                checkRecord(
                  activity_id,
                  setStatusRecord,
                  setStatusLoading,
                  phone
                );

                setTakeGroupWindow(false);
              },
            },
          ],
          { cancelable: true } // Optional: allows dismissal by tapping outside
        );
      } else {
        Alert.alert(
          "Вы уже записаны",
          "  ",
          [
            {
              text: "OK",
              onPress: () => {
                checkForPossibilityApi(setCheckForPossibility, phone);
                checkRecord(
                  activity_id,
                  setStatusRecord,
                  setStatusLoading,
                  phone
                );

                setTakeGroupWindow(false);
              },
            },
          ],
          { cancelable: true } // Optional: allows dismissal by tapping outside
        );
      }
      // console.log(info);
      setRecordLoad(false);
    })
    .catch(function (error) {
      console.log(error);
      setRecordLoad(false);
    });
};

export const checkRecord = (
  activity_id,
  setStatusRecord,
  setStatusLoading,
  phone
) => {
  setStatusLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/recordedOrNot?phone_number=${phone}&activity_id=${activity_id}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      setStatusRecord(info);
      setStatusLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setStatusLoading(false);
    });
};

// {"message": "Запись отменена"}
// LOG  {"message": "Запись была отменена ранее"}

export const cancelCycle = (
  activity_id,
  setCancelLoad,
  setCheckForPossibility,
  setTakeGroupWindow,
  setStatusRecord,
  setStatusLoading,
  phone
) => {
  setCancelLoad(true);
  const data = qs.stringify({
    phone_number_client: phone,
    activity_id: activity_id,
  });
  const config = {
    method: "post",
    url: "https://portmaster.kz/api/fitness/v1/cancellationForCycle",
    headers: {
      Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      const info = response.data;
      if (info.message === "Запись успешно отменена для указанного клиента.") {
        Alert.alert(
          "Запись успешно отменена для указанного клиента.",
          "  ",
          [
            {
              text: "OK",
              onPress: () => {
                checkForPossibilityApi(setCheckForPossibility, phone);
                checkRecord(
                  activity_id,
                  setStatusRecord,
                  setStatusLoading,
                  phone
                );

                setTakeGroupWindow(false);
              },
            },
          ],
          { cancelable: true } // Optional: allows dismissal by tapping outside
        );
      } else {
        Alert.alert(
          "Запись была отменена ранее",
          "  ",
          [
            {
              text: "OK",
              onPress: () => {
                checkForPossibilityApi(setCheckForPossibility, phone);
                checkRecord(
                  activity_id,
                  setStatusRecord,
                  setStatusLoading,
                  phone
                );

                setTakeGroupWindow(false);
              },
            },
          ],
          { cancelable: true } // Optional: allows dismissal by tapping outside
        );
      }
      setCancelLoad(false);
    })
    .catch(function (error) {
      console.log(error);
      setCancelLoad(false);
    });
};

export const getCycle = (
  activity_id,
  setNumberRecords,
  setNumberRecordsLoading
) => {
  setNumberRecordsLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/kolZapisCycle?activity_id=${activity_id}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;
      // console.log(info[0].kol_zapis);
      setNumberRecords(info.count);
      setNumberRecordsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setNumberRecordsLoading(false);
    });
};

export const getCycleListOfClients = (
  activity_id,
  setListLoading,
  setConfirmedClients
) => {
  // setNumberRecordsLoading(true);
  setListLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/findClientsGroup?activity_id=${activity_id}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;

      if (info[0].client === "Клиенты отсутсвуют") {
        setConfirmedClients([]);
      } else {
        setConfirmedClients(info);
      }
      setListLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setListLoading(false);
    });
};

export const getCycleReserveListOfClients = (
  activity_id,
  setListLoading,
  setConfirmedClients
) => {
  // setNumberRecordsLoading(true);
  setListLoading(true);
  const config = {
    method: "get",
    url: `https://portmaster.kz/api/fitness/v1/findClientsReserv?activity_id=${activity_id}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let info = response.data;

      if (info[0].client === "Клиенты отсутсвуют") {
        setConfirmedClients([]);
      } else {
        setConfirmedClients(info);
      }
      setListLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setListLoading(false);
    });
};
