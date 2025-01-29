import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { dataStatus, trainTypes } from "../../data/staticData";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SameDays from "./SameDays";
import { formsTrainAdd } from "../../styles/clientScreenStyles";
import DropdownList from "../../../../../component/DropdownList";
import DeleteButton from "./DeleteButton";

const FormsTrainAdd = ({
  selectedData,
  setSelectedStatus,
  setSelectedTypes,
  dateShow,
  setDateShow,
  oneDayTrain,
  selectedDaysDesc,
  selectedDays,
  setIsSameDayInMonth,
  isSameDayInMonth,
  selectedStatus,
  selectedTypes,
  setModalShow,
  deleteOneTraining,
  isLoadingDel,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // console.log(oneDayTrain.id);
  useEffect(() => {
    oneDayTrain !== undefined && setSelectedTypes(oneDayTrain.type.split(", "));
  }, []);

  // console.log(oneDayTrain.type.split(", "));

  const numbers =
    selectedDays &&
    selectedDays.map((date) => parseInt(date.split("-").pop(), 10).toString());

  const minTime = new Date();
  minTime.setHours(7, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(24, 0, 0);

  const statusReturn = () => {
    if (oneDayTrain?.status_plan === "planned") return "Запланировано";
    if (oneDayTrain?.status_plan === "completed") return "Завершено";
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // console.log(selectedTypes.length);

  const handleConfirm = (date) => {
    const dateObject = new Date(date);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedDate = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    setDateShow(formattedDate);
    hideDatePicker();
  };

  return (
    <>
      <Text
        style={{
          color: "white",
          fontSize: 12,
          fontWeight: 300,
          marginBottom: 5,
          marginLeft: 5,
          marginTop: 10,
        }}
      >
        Дата и время
      </Text>
      <View style={formsTrainAdd.dateContainer}>
        <Text style={formsTrainAdd.selectedDateText}>{selectedData}</Text>
        <View style={{ width: "53%" }}>
          <TouchableOpacity
            onPress={showDatePicker}
            style={formsTrainAdd.timePickerBtn}
          >
            <FontAwesome5 name="clock" size={14} color="white" />
            <Text style={formsTrainAdd.timePickerText}>
              {dateShow.length !== 0
                ? dateShow
                : oneDayTrain !== undefined
                ? oneDayTrain.time
                : "Выберите время"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            locale="ru"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            confirmTextIOS="Подтвердить"
            cancelTextIOS="Отмена"
            minimumDate={minTime}
            maximumDate={maxTime}
          />
        </View>
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 12,
          fontWeight: 300,
          marginBottom: 5,
          marginLeft: 5,
          // marginTop: 10,
        }}
      >
        Статус тренировки
      </Text>
      <DropdownList
        data={dataStatus}
        placeholder={
          oneDayTrain !== undefined ? statusReturn() : "Выберите статус"
        }
        value={selectedStatus}
        onChange={(item) => {
          setSelectedStatus(item.value);
        }}
      />

      <Text
        style={{
          color: "white",
          fontSize: 12,
          fontWeight: 300,
          marginBottom: 5,
          marginLeft: 5,
          // marginTop: 10,
        }}
      >
        Тип тренировок или группа мыщц
      </Text>
      <TouchableOpacity
        onPress={() => setModalShow(true)}
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#393C43",
          borderRadius: 10,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selectedTypes.length !== 0 ? (
          <View style={{ width: "80%" }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {selectedTypes.map((type, index) => (
                <View
                  style={{
                    backgroundColor: "#202226",
                    padding: 5,
                    paddingHorizontal: 10,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    borderRadius: 10,
                  }}
                  key={index}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                  >
                    {type}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text
            style={{
              color: "white",
              fontFamily: "TTNormsPro-Medium",
              fontSize: 16,
            }}
          >
            Выберите тип тренировок
          </Text>
        )}
        <AntDesign name="rightcircle" size={18} color="grey" />
      </TouchableOpacity>

      {oneDayTrain ? (
        <></>
      ) : (
        <SameDays
          selectedDaysDesc={selectedDaysDesc}
          numbers={numbers}
          setIsSameDayInMonth={setIsSameDayInMonth}
          isSameDayInMonth={isSameDayInMonth}
        />
      )}
      {oneDayTrain !== undefined ? (
        <View style={{ width: "100%", alignItems: "flex-end", marginTop: 20 }}>
          <DeleteButton
            deleteOneTraining={deleteOneTraining}
            isLoadingDel={isLoadingDel}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormsTrainAdd;
