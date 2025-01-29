import React, { useContext, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { addTrain, changeTrain } from "../api/AddTrain";
import { getClient } from "../api/GetClient";
import { AuthContext } from "../../../../context/AuthContext";
import ConfirmButton from "./addPersonalTrainingComponents/ConfirmButton";
import FormsTrainAdd from "./addPersonalTrainingComponents/FormsTrainAdd";
import ResultMessage from "./addPersonalTrainingComponents/ResultMessage";
import BottomSheetTitle from "./addPersonalTrainingComponents/BottomSheetTitle";
import { addPersonalTrain } from "../styles/clientScreenStyles";
import { StyleSheet } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";
import { Image } from "expo-image";
import { trainTypes } from "../data/staticData";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DeleteButton from "./addPersonalTrainingComponents/DeleteButton";
import { deleteTrain } from "../api/DeleteTrain";

export default function AddPersonalTrain(props) {
  const { phone } = useContext(AuthContext);
  const {
    visible,
    setVisible,
    selectedData,
    trainDate,
    clientNumber,
    setIsLoadingClient,
    setClient,
    oneDayTrain,
    selectedDays,
    selectedDaysDesc,
  } = props;

  const labelsArray = trainTypes.map((type) => type.label);

  // console.log(oneDayTrain);

  const [dateShow, setDateShow] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("planned");
  const [selectedTypes, setSelectedTypes] = useState("");
  const [isSameDayInMonth, setIsSameDayInMonth] = useState(false);
  const [resultAdding, setResultAdding] = useState("");
  const [resultDelete, setResultDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalDelShow, setModalDelShow] = useState(false);

  // console.log(resultDelete.message);

  // Handle selection toggle
  const toggleSelection = (index, label) => {
    const currentIndex = selectedTypes.indexOf(label);
    const newSelectedTypes = [...selectedTypes];

    if (currentIndex === -1) {
      if (newSelectedTypes.length < 6) {
        // Check if the limit of 6 is not reached
        newSelectedTypes.push(label); // Add if not in the array and limit not reached
      } // add if not in the array
    } else {
      newSelectedTypes.splice(currentIndex, 1); // remove if in the array
    }

    setSelectedTypes(newSelectedTypes);
  };

  const reset = () => {
    setDateShow("");
    setSelectedTypes("");
    setIsSameDayInMonth(false);
  };

  const validate = () => {
    Keyboard.dismiss();
    if (!dateShow) return Alert.alert("Выберите дату");
    if (!selectedStatus) return Alert.alert("Выберите статус");
    if (!selectedTypes) return Alert.alert("Выберите тип тренировок");
    addTrain(
      isSameDayInMonth ? selectedDays : trainDate,
      dateShow,
      selectedStatus,
      selectedTypes.join(", "),
      clientNumber,
      setIsLoading,
      setResultAdding,
      phone
    );
  };

  const deleteOneTraining = () => {
    deleteTrain(
      setIsLoadingDel,
      oneDayTrain.id,
      setResultDelete,
      setModalDelShow
    );
  };

  const changeTraining = () => {
    Keyboard.dismiss();
    const { id, time, status_plan, type } = oneDayTrain || {};
    const timeToUpdate = dateShow.length === 0 ? time : dateShow;
    const statusToUpdate =
      selectedStatus.length === 0 ? status_plan : selectedStatus;
    const typeToUpdate =
      selectedTypes.length === 0 ? type : selectedTypes.join(", ");
    // if (typeToUpdate.length === 0) {
    //   Alert.alert("DDDDD");
    // }

    changeTrain(
      id,
      trainDate,
      timeToUpdate,
      statusToUpdate,
      typeToUpdate,
      clientNumber,
      setIsLoading,
      setResultAdding,
      phone
    );
  };

  const close = () => {
    setVisible(false);
    setResultAdding("");
    reset();
  };

  const close1 = () => {
    setVisible(false);
    setResultAdding("");
    setResultDelete("");
    reset();
    getClient(setIsLoadingClient, setClient, clientNumber);
  };

  return (
    <BottomSheet visible={visible}>
      <View style={addPersonalTrain.bottomNavigationView}>
        <View
          style={{
            ...addPersonalTrain.bottomSheetHeight,
            opacity: modalShow || modalDelShow ? 0.3 : 1,
          }}
        >
          <BottomSheetTitle close={close} resultAdding={resultAdding} />

          {resultAdding.message ? (
            <ResultMessage resultAdding={resultAdding} />
          ) : (
            <FormsTrainAdd
              selectedData={selectedData}
              setSelectedStatus={setSelectedStatus}
              setSelectedTypes={setSelectedTypes}
              dateShow={dateShow}
              setDateShow={setDateShow}
              oneDayTrain={oneDayTrain}
              selectedDaysDesc={selectedDaysDesc}
              selectedDays={selectedDays}
              setIsSameDayInMonth={setIsSameDayInMonth}
              isSameDayInMonth={isSameDayInMonth}
              selectedStatus={selectedStatus}
              selectedTypes={selectedTypes}
              setModalShow={setModalShow}
              deleteOneTraining={deleteOneTraining}
              isLoadingDel={isLoadingDel}
            />
          )}
        </View>

        <ConfirmButton
          resultAdding={resultAdding}
          close1={close1}
          changeTraining={changeTraining}
          validate={validate}
          isLoading={isLoading}
          oneDayTrain={oneDayTrain}
          modalShow={modalShow}
          modalDelShow={modalDelShow}
        />

        <Modal animationType="slide" transparent={true} visible={modalShow}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "column",
                  // justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 10,
                  // alignItems: "center",
                }}
              >
                <Text style={textStyles.bold18pxWhite}>
                  Выберите тип тренировок
                </Text>
                <Text
                  style={{
                    ...textStyles.regular14pxWhite,
                    color: "white",
                    marginTop: 10,
                  }}
                >
                  Вы можете выбрать только 6 тип тренировок
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                  width: "100%",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {trainTypes.map((types, index) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      if (
                        selectedTypes.includes(types.label) ||
                        selectedTypes.length < 6
                      ) {
                        toggleSelection(index, types.label); // Call the function only if selected or limit not reached
                      }
                    }}
                    key={index}
                    style={{
                      width: "32%",
                      padding: 10,
                      backgroundColor: "#202226",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      borderRadius: 15,
                      position: "relative",
                      opacity:
                        selectedTypes.includes(types.label) ||
                        selectedTypes.length < 6
                          ? 1
                          : 0.5, // Dim the button if it's untouchable
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: 5,
                      }}
                    >
                      {selectedTypes.includes(types.label) && ( // Show icon only if selected
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#3DBA29"
                        />
                      )}
                    </View>
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={types.img}
                    />
                    <Text
                      style={{ ...textStyles.medium14pxWhite, marginTop: 5 }}
                    >
                      {types.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => setModalShow(false)}
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor:
                    selectedTypes.length !== 0 ? "#BC994A" : "#393C43",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 16 }}
                >
                  {selectedTypes.length !== 0 ? "Подтвердить" : "Закрыть"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalDelShow}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 15,
                }}
              >
                {resultDelete.message}
              </Text>
              <MaterialCommunityIcons
                name="delete-empty"
                size={55}
                color="#F14635"
              />
              <TouchableOpacity
                onPress={() => {
                  setModalDelShow(false);
                  close1();
                }}
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "#393C43",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 16 }}
                >
                  Закрыть
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#2C3037",
    borderRadius: 20,
    width: "95%",
    padding: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    textAlign: "center",
    color: "white",
  },
});
