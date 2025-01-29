import { StyleSheet } from "react-native";

export const personalData = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#393C43",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2.5,
    marginTop: 2.5,
  },
  phone: {
    width: "100%",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#393C43",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2.5,
    marginTop: 2.5,
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  todayIconBg: {
    backgroundColor: "#027AE8",
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  reloadBtn: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#393C43",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  statisticContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },
});

export const photoAddModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 95,
  },
  modalView: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 35,
    padding: 20,
    borderRadius: 20,
    width: "90%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  photoEditContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  btn: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#393C43",
  },
});

export const profileImage = StyleSheet.create({
  profileImageContainer: {
    flexDirection: "row",
    width: 100,
    height: 100,
    alignItems: "flex-end",
    // marginTop: 25,
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  addImgBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#393C43",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -35,
    zIndex: 2,
  },
});

export const topProfile = StyleSheet.create({
  topButtonsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  contactTrainersBtn: {
    backgroundColor: "#393C43",
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    flexDirection: "row",
    borderRadius: 10,
  },
  logoSize: {
    width: 18,
    height: 18,
  },
});

export const profileScreen = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111214",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111214",
    justifyContent: "space-between",
  },
  centeredContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 60,
  },
  profileContainer: {
    width: "90%",
    alignItems: "center",
  },
});

export const settings = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    // height: "50%",
    //   justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  restoreBtn: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#393C43",
    borderRadius: 15,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exitBtn: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8022B",
    borderRadius: 15,
    marginTop: 50,
    flexDirection: "row",
  },

  deleteAccountBtn: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
  },
  deleteResultContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  choiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 15,
  },
  yesBtn: {
    width: "48%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 15,
  },
  noBtn: {
    width: "48%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 15,
  },
  deletedResultContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 15,
  },
  submitBtn: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 15,
  },
});

export const contactTrainers = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111214",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111214",
  },
  cardContainer: {
    width: "100%",
    backgroundColor: "#393C43",
    padding: 10,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  innerContainer: {
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
  },
  whatsAppBtn: {
    backgroundColor: "#10B83F",
    width: 42,
    height: 42,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
