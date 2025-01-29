import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;

export const personalSchedule = StyleSheet.create({
  scheduleContainer: {
    width: "100%",
    height: windowHeight,
    top: 15,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#111214",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  online: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  online: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  offline: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  scheduleContainerLoad: {
    width: "100%",
    height: windowHeight,
    flexDirection: "row",
    alignItems: "flex-start",
    top: 20,
    borderRadius: 50,
    backgroundColor: "#111214",
  },
  scrollViewContent: {
    height: windowHeight * 0.65,
    borderStartStartRadius: 20,
    borderStartEndRadius: 20,
  },
});

export const clientsTrain = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 20,
  },
  clienCard: {
    backgroundColor: "#393C43",
    borderRadius: 20,
    padding: 10,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#393C43",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  innerElements: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  innerElementsClient: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  imageContainer: {
    padding: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderRadius: 60,
  },
  infoContainer: {
    width: "70%",
    marginLeft: 10,
  },
  infoContainerClient: {
    width: "70%",
  },
  clientNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trainTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  trainType: {
    fontSize: 15,
    color: "#B8B8B6",
    fontFamily: "TTNormsPro-Regular",
    lineHeight: 20,
  },
  statusContainer: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    width: 70,
    height: 30,
    backgroundColor: "#BC994A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export const weekCalendar = StyleSheet.create({
  container: {
    width: "90%",
  },
  todayContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  todayText: {
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayBtn: {
    width: 40,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  calendarDayNumText: {
    fontSize: 18,
    color: "white",
  },
  calendarDayText: {
    fontSize: 14,
    marginTop: 2,
  },
  scrollViewStyle: {
    borderWidth: 0.2,
    borderColor: "grey",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
    marginTop: 5,
  },
});
