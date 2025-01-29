import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;

export const addPersonalTrain = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: "95%",
    padding: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "white",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
  bottomSheetHeight: {
    height: "90%",
  },
});

export const bottomSheetTitle = StyleSheet.create({
  bottomSheetTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontFamily: "TTNormsPro-Bold",
    width: "80%",
    marginLeft: 5,
  },
  closeButton: {
    marginTop: 3,
    width: "20%",
    alignItems: "flex-end",
  },
});

export const confirmButton = StyleSheet.create({
  addBtnContainer: {
    height: "10%",
    width: "100%",
  },
  addBtn: {
    height: 50,
    width: "100%",
    backgroundColor: "#BC994A",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    // opacity: 0.2,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontFamily: "TTNormsPro-Bold",
  },
});

export const formsTrainAdd = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 40,
    backgroundColor: "#393C43",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  containerStyle: {
    backgroundColor: "#393C43",
    borderWidth: 0,
    marginTop: 5,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "TTNormsPro-Regular",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "TTNormsPro-Regular",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#393C43",
  },
  selectedDateText: {
    fontSize: 16,
    color: "white",
    fontFamily: "TTNormsPro-Regular",
    width: "45%",
  },
  timePickerBtn: {
    backgroundColor: "#24262B",
    height: 42,
    borderWidth: 2,
    borderColor: "#696969",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  timePickerText: {
    color: "white",
    fontFamily: "TTNormsPro-Regular",
    fontSize: 16,
    marginLeft: 5,
  },
  itemTextStyle: {
    color: "white",
    fontFamily: "TTNormsPro-Medium",
  },
});

export const resulMessage = StyleSheet.create({
  resultMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultMessageText: {
    fontSize: 20,
    color: "white",
    fontFamily: "TTNormsPro-Bold",
    marginTop: 15,
  },
});

export const sameDays = StyleSheet.create({
  sameDaysContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#393C43",
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  currentMonthText: {
    color: "white",
    fontSize: 18,
    fontFamily: "TTNormsPro-Bold",
    textTransform: "capitalize",
  },
  daysContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  dayBlock: {
    padding: 10,
    backgroundColor: "#393C43",
    borderRadius: 10,
    margin: 5,
  },
  dayNumber: {
    color: "white",
    fontSize: 18,
    fontFamily: "TTNormsPro-Bold",
    textAlign: "center",
  },
  dayDescriptionShort: {
    color: "white",
    fontSize: 14,
    fontFamily: "TTNormsPro-Medium",
    textAlign: "center",
    marginTop: 3,
  },
  confirmContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontFamily: "TTNormsPro-Regular",
  },
  confirmBtn: {
    borderWidth: 3,
    borderColor: "white",
    width: 36,
    height: 36,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const calendarStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 0,
    backgroundColor: "#111214",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dayText: {
    width: 30,
    textAlign: "center",
    color: "white",
    fontFamily: "TTNormsPro-Medium",
    fontSize: 14,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  weekDays: {
    paddingTop: 5,
    paddingBottom: 5,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: "TTNormsPro-Bold",
    color: "white",
    marginBottom: 10,
  },
});

export const dropdownsContainerStyle = StyleSheet.create({
  dropdownsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export const renderDayStyle = StyleSheet.create({
  dayButton: {
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  orange: {
    backgroundColor: "#0672AF",
  },
  red: {
    backgroundColor: "#E53D3D",
  },
  green: {
    backgroundColor: "#05BA38",
  },
  pastDays: {
    backgroundColor: "#8B8B8B",
    opacity: 0.35,
  },
  activeDay: {
    backgroundColor: "#393C43",
  },
  inactiveDay: {
    backgroundColor: "transparent",
  },
  dayText: {
    width: 30,
    textAlign: "center",
    color: "white",
    fontFamily: "TTNormsPro-Medium",
    fontSize: 14,
  },
});

export const clientInfoStyles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: "96%",
    paddingBottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
  loader: {
    height: "93%",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  clientInfoContainer: {
    padding: 10,
    backgroundColor: "#393C43",
    borderRadius: 30,
  },
  bio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainerWidth: {
    width: "30%",
  },
  bioContainerWidth: {
    width: "65%",
  },

  statusContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginLeft: 15,
  },

  callContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  whatsAppBtn: {
    width: "100%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#00BD13",
    borderRadius: 22,
  },
  closeContainer: {
    height: "10%",
    width: "100%",
  },
  closeBtn: {
    backgroundColor: "#393C43",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    padding: 20,
  },
});

export const clientsScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#1C1D21",
  },
  cardContainer: {
    width: "100%",
  },
  innerElements: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  clienCard: {
    backgroundColor: "#393C43",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  clientName: {
    fontSize: 18,
    fontFamily: "TTNormsPro-Medium",
    color: "white",
  },

  emptyContentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  emptyContentText: {
    fontSize: 18,
    fontFamily: "TTNormsPro-Bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  scrollContainer: {
    width: "90%",
    height: windowHeight,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111214",
  },
});
