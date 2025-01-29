import { StyleSheet } from "react-native";

export const mainMenu = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 25,
  },
  btnContainer: {
    backgroundColor: "#BC994A",
    width: "48%",
    height: 160,
    borderRadius: 20,
    justifyContent: "space-between",
    paddingTop: 15,
    shadowColor: "#BC994A",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    paddingBottom: 5,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    width: "88%",
    fontSize: 19,
    color: "white",
    fontWeight: "700",
    fontFamily: "TTNormsPro-Bold",
  },
  imgRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clientBtn: {
    backgroundColor: "#BC994A",
    borderRadius: 20,
    height: 100,
    width: "90%",
    marginTop: 15,
    shadowColor: "#BC994A",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
  },
  clientBtnTitleContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    ...StyleSheet.absoluteFillObject,
  },
  clientTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    fontFamily: "TTNormsPro-Bold",
  },
  crossovki: {
    height: 80,
    width: 70,
  },
  gantel: {
    height: 90,
    width: 80,
  },
  calendarImg: { height: 70, width: 60, marginRight: 10 },
  priceImg: { height: 50, width: 45, marginRight: 10 },
  clientImg: { height: "100%", width: "100%", borderRadius: 20 },
});

export const topContainer = StyleSheet.create({
  topContainer: {
    backgroundColor: "#202226",
    width: "100%",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    alignItems: "center",
    paddingBottom: 15,
    // height:'30%'
  },
  container: {
    width: "90%",
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todayContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  helloText: {
    fontSize: 24,
    color: "white",
    fontFamily: "TTNormsPro-Bold",
  },
  dataText: {
    color: "#B8B8B6",
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 5,
    fontFamily: "TTNormsPro-Medium",
  },
  profileInfo: {
    width: "90%",
    alignItems: "flex-start",
  },
  todayProfile: {
    width: "90%",
    height: 35,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifyBtn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#393C43",
    borderRadius: 10,
  },
});

export const homeScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111214",
  },
});
