import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1D21",
    flex: 1,
    alignItems: "center",
  },
  imgLogoContianer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgLogo: {
    width: 100,
    height: 80,
    marginTop: 15,
  },
  paginationLabel: {
    fontSize: 16,
    color: "white",
    fontFamily: "TTNormsPro-Medium",
    marginTop: 10,
  },
  paginationContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  inactive: {
    width: "32%",
    backgroundColor: "#696969",
    height: 3,
  },
  active: {
    width: "32%",
    backgroundColor: "#BC994A",
    height: 3,
  },
});

export const registerMessage = StyleSheet.create({
  bottomNavigationView1: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#1C1D21",
    shadowColor: "white",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "TTNormsPro-Bold",
    marginTop: 10,
  },
  backBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 50,
    backgroundColor: "#BC994A",
    borderRadius: 15,
    marginTop: 10,
  },
  backBtnText: {
    color: "white",
    fontSize: 16,
    fontFamily: "TTNormsPro-Bold",
  },
});

export const prevNextButtons = StyleSheet.create({
  prevNextContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  previousBtn: {
    width: "45%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  previousBtnText: {
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
    marginLeft: 5,
  },
  nextBtn: {
    width: "45%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  nextBtnText: {
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
    marginRight: 5,
  },
});

export const calendarBtn = StyleSheet.create({
  formLabel: {
    color: "white",
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
    marginBottom: 8,
  },
  calendarBtn: {
    backgroundColor: "#24262B",
    height: 42,
    borderWidth: 2,
    borderColor: "#696969",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  calendarBtnText: {
    fontFamily: "TTNormsPro-Regular",
    fontSize: 16,
    marginLeft: 5,
  },
});

export const bottomLogin = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  text: {
    color: "#9EA0A5",
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
  },
  button: {
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#BC994A",
    paddingBottom: 2,
  },
  buttonText: {
    color: "#BC994A",
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
  },
});

export const secondStep = StyleSheet.create({
  bottomForms: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  dropdown: {
    margin: 0,
    height: 42,
    backgroundColor: "#24262B",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#696969",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#696969",
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
  containerStyle: {
    backgroundColor: "#393C43",
    borderWidth: 0,
    marginTop: 5,
    borderRadius: 10,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontFamily: "TTNormsPro-Medium",
    marginBottom: 8,
  },
  itemTextStyle: {
    color: "white",
    fontFamily: "TTNormsPro-Medium",
  },
});

export const firstStep = StyleSheet.create({
  inputBottomLabel: {
    color: "#9EA0A5",
    fontSize: 14,
    fontFamily: "TTNormsPro-Regular",
  },
});
