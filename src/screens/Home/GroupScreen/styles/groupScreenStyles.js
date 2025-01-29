import { StyleSheet } from "react-native";

export const groupScheduleStyle = StyleSheet.create({
  scheduleContainer: {
    width: "100%",
    height: "90%",
    top: 0,
    alignItems: "center",
    borderRadius: 0,
    backgroundColor: "#111214",
  },

  cardContainer: {
    width: "100%",
    marginTop: 0,
    height: "90%",
    zIndex: 2,
  },
  innerElements: {
    flexDirection: "row",
    alignItems: "center",
  },
  clienCard: {
    backgroundColor: "#393C43",
    borderRadius: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  trainTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  time: {
    width: "20%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    height: 30,
    backgroundColor: "#BC994A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  loader: {
    height: "100%",
    zIndex: 5,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#111214",
    opacity: 0.8,
  },
  emptyContainer: {
    height: "100%",
    justifyContent: "center",
  },
  img: {
    width: "40%",
    height: 70,
    borderRadius: 10,
  },
  infoContainer: {
    width: "60%",
    marginLeft: 10,
  },
});

export const weekDescription = StyleSheet.create({
  container: {
    width: "95%",
    height: "15%",
  },
  todayContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  calendarContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 35,
    marginTop: 5,
  },
  dayBtn: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 6,
    paddingTop: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDayNumText: {
    fontSize: 18,
    color: "white",
    textTransform: "capitalize",
  },
});

export const groupScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#202226",
  },
});
