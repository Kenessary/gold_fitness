import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Linking,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { settings } from "../../../Profile/styles/profileStyle";
import { textStyles } from "../../../../styles/globalStyles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { groupScheduleStyle } from "../styles/groupScreenStyles";
import {
  cycle,
  pilates,
  smartfitness,
  stretching,
  wellness,
  yoga,
} from "../img/groupTrainsImages";
import {
  cancelCycle,
  checkForPossibilityApi,
  checkRecord,
  getCycle,
  getCycleListOfClients,
  getCycleReserveListOfClients,
  groupLessonsToday,
  groupLessonsTodayNoLoad,
  recordCycle,
} from "../api/GroupApi";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const CircleGrid = ({ redCount, numberRecordsLoading }) => {
  const totalCircles = 14; // Total number of circles
  const rows = [5, 5, 3]; // Number of circles per row

  const renderCircles = (rowStartIndex, rowCount) => {
    return Array.from({ length: rowCount }).map((_, index) => {
      const circleIndex = rowStartIndex + index + 1;
      return (
        <View
          key={circleIndex}
          style={[styles.circle, circleIndex <= redCount && styles.redCircle]}
        >
          <Ionicons name="bicycle" size={20} color="white" />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {numberRecordsLoading ? (
        <ActivityIndicator color={"#BC994A"} size={"large"} />
      ) : (
        <>
          {rows.map((rowCount, rowIndex) => {
            const rowStartIndex = rows
              .slice(0, rowIndex)
              .reduce((sum, r) => sum + r, 0);
            return (
              <View key={rowIndex} style={styles.row}>
                {renderCircles(rowStartIndex, rowCount)}
              </View>
            );
          })}

          <View
            style={{
              width: "90%",
              flexDirection: "row",
              padding: 8,
              backgroundColor: "#393C43",
              borderRadius: 15,
            }}
          >
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 20,
                  backgroundColor: "#168C4B",
                  marginRight: 5,
                }}
              />
              <Text style={{ ...textStyles.medium16pxWhite }}>Свободно</Text>
            </View>
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 20,
                  backgroundColor: "#AB3333",
                  marginRight: 5,
                }}
              />
              <Text style={{ ...textStyles.medium16pxWhite }}>Занято</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const TakeGroupTrain = ({
  selectedDay,
  groupTrain,
  takeGroupWindow,
  setTakeGroupWindow,
  checkForPossibility,
  setIsLoading,
  setGroupLessons,
  setCheckForPossibility,
}) => {
  const transformDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };
  const imageSource = require("../../../../../assets/typestrain/backgr.png");
  // console.log(groupTrain);

  const [statusRecord, setStatusRecord] = useState("");
  // console.log(statusRecord);
  // console.log(checkForPossibility.ostatok);

  const [statusLoading, setStatusLoading] = useState(false);
  const { phone } = useContext(AuthContext);
  // console.log(phone);
  const [recordLoad, setRecordLoad] = useState(false);
  const [cancelLoad, setCancelLoad] = useState(false);
  const [numberRecords, setNumberRecords] = useState("");
  const [numberRecordsLoading, setNumberRecordsLoading] = useState(false);

  const [timer, setTimer] = useState(0); // Start with 60 seconds
  const [isRunning, setIsRunning] = useState(false); // State to check if the timer is running

  const [lastActivityId, setLastActivityId] = useState("");

  const [isReserve, setIsReserve] = useState(false);

  const [listLoading, setListLoading] = useState(false);
  const [confirmedClients, setsetConfirmedClients] = useState("");

  // console.log(confirmedClients, "con");
  console.log(confirmedClients);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrease the timer
          } else {
            clearInterval(interval); // Stop the timer when it reaches 0
            setIsRunning(false);
            return prev;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [isRunning]); // Dependency array includes isRunning

  useEffect(() => {
    if (isRunning === false) {
      setLastActivityId("");
    }
  }, [isRunning]);

  const handlePress = () => {
    setTimer(60); // Reset to 60 seconds
    setIsRunning(true); // Start the timer
    setLastActivityId(groupTrain.ActivityID);
    recordCycle(
      groupTrain.ActivityID,
      setRecordLoad,
      setCheckForPossibility,

      setTakeGroupWindow,
      setStatusRecord,
      setStatusLoading,
      phone
    );
  };

  useEffect(() => {
    if (groupTrain.Nomenclature === "Cycle" && takeGroupWindow) {
      checkRecord(
        groupTrain.ActivityID,
        setStatusRecord,
        setStatusLoading,
        phone
      );
      getCycle(
        groupTrain.ActivityID,
        setNumberRecords,
        setNumberRecordsLoading
      );
      // setTimeout(() => {
      //   groupLessonsTodayNoLoad(setGroupLessons, selectedDay);
      // }, 3000);
    }
  }, [groupTrain, takeGroupWindow]);

  useEffect(() => {
    if (
      takeGroupWindow &&
      phone === "87000020202" &&
      groupTrain.Nomenclature === "Cycle"
    ) {
      if (isReserve) {
        getCycleReserveListOfClients(
          groupTrain.ActivityID,
          setListLoading,
          setsetConfirmedClients
        );
      } else {
        getCycleListOfClients(
          groupTrain.ActivityID,
          setListLoading,
          setsetConfirmedClients
        );
      }
    }
  }, [groupTrain, takeGroupWindow, phone, isReserve]);

  // console.log(statusRecord.message);

  return (
    <BottomSheet visible={takeGroupWindow}>
      <ImageBackground
        source={imageSource}
        style={[
          styles.bottomNavigationView,
          { height: phone === "87000020202" && "98%" },
        ]}
        imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
      >
        <View style={[styles.viewr, { paddingHorizontal: 20 }]}>
          <View style={settings.titleContainer}>
            <TouchableOpacity
              onPress={() => {
                setTakeGroupWindow(false);
              }}
            >
              <AntDesign name="closecircle" size={26} color="#696969" />
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                marginBottom: phone === "87000020202" ? 10 : 0,
              }}
            >
              <Text style={{ ...textStyles.bold22pxWhite }}>
                {groupTrain.Nomenclature}
              </Text>
              <Text
                style={{
                  ...textStyles.bold16pxWhite,
                  color: "#BABABA",
                  marginTop: 5,
                }}
              >
                {transformDate(selectedDay)}
              </Text>
              <Text style={textStyles.bold16pxWhite}>
                {groupTrain && groupTrain.DateNach.slice(0, -3)}
              </Text>
            </View>

            <TouchableOpacity
              disabled={true}
              onPress={() => {
                setTakeGroupWindow(false);
              }}
            >
              <AntDesign name="closecircle" size={26} color="transparent" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              ...textStyles.bold20pxWhite,
              marginTop: 10,
              display: phone === "87000020202" ? "none" : "flex",
            }}
          >
            <Text style={textStyles.medium16pxWhite}>
              Остаток по абонементу:
            </Text>{" "}
            {checkForPossibility.ostatok}
          </Text>

          <View
            style={{
              ...groupScheduleStyle.clienCard,
              borderRadius: 15,
              marginTop: 15,
              display:
                phone === "87000020202" && groupTrain.Nomenclature === "Cycle"
                  ? "none"
                  : "flex",
            }}
          >
            <View style={{ width: "70%" }}>
              <View style={groupScheduleStyle.innerElements}>
                <Image
                  style={groupScheduleStyle.img}
                  source={
                    (groupTrain.Nomenclature === "Pilates" && pilates) ||
                    (groupTrain.Nomenclature === "Cycle" && cycle) ||
                    (groupTrain.Nomenclature === "Йога" && yoga) ||
                    (groupTrain.Nomenclature === "Stretching" && stretching) ||
                    (groupTrain.Nomenclature === "Умный фитнес" &&
                      smartfitness) ||
                    (groupTrain.Nomenclature === "Wellness" && wellness)
                  }
                />
                <View style={groupScheduleStyle.infoContainer}>
                  <Text style={textStyles.medium12pxGreyUppercase}>Тренер</Text>
                  <Text style={textStyles.medium18pxWhite}>
                    {groupTrain.Trainer}
                  </Text>
                  <View style={groupScheduleStyle.trainTypeContainer}>
                    <Ionicons name="location-sharp" size={14} color="#B8B8B6" />
                    <Text
                      style={{
                        ...textStyles.bold14pxGrey,
                        marginLeft: 2,
                      }}
                    >
                      {groupTrain.Room}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ ...groupScheduleStyle.time, width: "25%" }}>
              <Text style={textStyles.bold16pxWhite}>
                {groupTrain && groupTrain.DateNach.slice(0, -3)}
              </Text>
            </View>
          </View>

          {/* <View
            style={{
              backgroundColor: "grey",
              borderRadius: 20,
              width: "100%",
              height: 100,
              padding: 10,
            }}
          >

          </View> */}
          {groupTrain.Nomenclature === "Cycle" ? (
            <CircleGrid
              redCount={parseInt(numberRecords, 10)}
              numberRecordsLoading={numberRecordsLoading}
            />
          ) : (
            <></>
          )}

          <View
            style={{
              backgroundColor: "#4A4D53",
              width: "100%",
              padding: 10,
              borderRadius: 15,
              marginTop: 10,
              display: phone === "87000020202" ? "flex" : "none",
            }}
          >
            <View
              style={{
                backgroundColor: "#393C43",
                width: "100%",
                borderRadius: 10,
                padding: 3,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => setIsReserve(false)}
                style={{
                  backgroundColor: !isReserve ? "#4A4D53" : "transparent",
                  borderRadius: 10,
                  padding: 3,
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...textStyles.medium14pxWhite }}>
                  Записанные
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsReserve(true)}
                style={{
                  backgroundColor: isReserve ? "#4A4D53" : "transparent",
                  borderRadius: 10,
                  padding: 3,
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...textStyles.medium14pxWhite }}>Резерв</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  ...textStyles.bold18pxWhite,
                  marginLeft: 5,
                  marginRight: 10,
                }}
              >
                {isReserve ? "Резервные клиенты" : "Записанные клиенты"}
              </Text>
            </View>

            {listLoading ? (
              <View
                style={{
                  width: "100%",
                  height: 250,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={"#BC994A"} />
              </View>
            ) : (
              <ScrollView style={{ height: 250 }} showsVerticalScrollIndicator>
                {confirmedClients && confirmedClients.length === 0 ? (
                  <View
                    style={{
                      width: "100%",
                      padding: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ ...textStyles.bold16pxWhite }}>
                      Список пустой
                    </Text>
                  </View>
                ) : (
                  confirmedClients &&
                  confirmedClients.map((el) => (
                    <View
                      key={Math.random()}
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        padding: 7,
                        paddingHorizontal: 15,
                        borderRadius: 15,
                        marginBottom: 5,
                      }}
                    >
                      <Text style={textStyles.bold16pxWhite}>
                        {el.Name} {el.LastName}
                      </Text>
                      <Text
                        style={{ ...textStyles.medium12pxWhite, marginTop: 3 }}
                      >
                        {el.NomerTel}
                      </Text>
                    </View>
                  ))
                )}

                <View
                  style={{
                    marginBottom: 30,
                  }}
                ></View>
              </ScrollView>
            )}
          </View>

          {/* <Text style={textStyles.bold18pxWhite}> {timer}</Text> */}

          {phone === "87000020202" ? (
            <></>
          ) : statusLoading ? (
            <TouchableOpacity
              onPress={() => ""}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                borderRadius: 15,
                height: 50,
                backgroundColor: "transparent",
                marginTop: 50,
              }}
            >
              <ActivityIndicator color={"#BC994A"} size={"large"} />
            </TouchableOpacity>
          ) : statusRecord.message === "Записан" &&
            groupTrain.Nomenclature === "Cycle" ? (
            <TouchableOpacity
              disabled={isRunning}
              onPress={() =>
                cancelCycle(
                  groupTrain.ActivityID,
                  setCancelLoad,
                  setCheckForPossibility,
                  setTakeGroupWindow,
                  setStatusRecord,
                  setStatusLoading,
                  phone
                )
              }
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                height: 50,
                borderRadius: 15,
                backgroundColor: isRunning ? "grey" : "#AB3333",
                marginTop: 50,
              }}
            >
              {isRunning && lastActivityId === groupTrain.ActivityID ? (
                <Text style={textStyles.medium14pxWhite}>
                  Отменить доступно через: {timer} секунд
                </Text>
              ) : (
                <Text style={textStyles.bold18pxWhite}>Отменить запись</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={
                checkForPossibility.message === "Нет" || numberRecords === "13"
              }
              onPress={() =>
                groupTrain.Nomenclature === "Cycle"
                  ? handlePress()
                  : Linking.openURL(`tel:+77059719220`)
              }
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                height: 50,
                borderRadius: 15,
                backgroundColor:
                  checkForPossibility.message === "Нет" ||
                  numberRecords === "13"
                    ? "grey"
                    : "#BC994A",
                marginTop: 50,
              }}
            >
              {recordLoad ? (
                <ActivityIndicator color={"white"} size={"large"} />
              ) : (
                <Text style={textStyles.bold18pxWhite}>Записаться</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",

    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
  viewr: {
    width: "100%",
    // height: "50%",
    //   justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // backgroundColor: "#111214",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A4D53",
    borderRadius: 20,
    width: "100%",
    height: 250,
    // padding: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 40,
    backgroundColor: "#168C4B",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  redCircle: {
    backgroundColor: "#AB3333",
  },
});

export default TakeGroupTrain;
