import { StyleSheet } from "react-native";

export const onboardingStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export const onboardingItemStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  imgStyle: {
    width: 70,
    height: 50,
    marginBottom: 20,
  },
  titleStyle: {
    color: "white",
    fontSize: 32,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: "TTNormsPro-Bold",
  },
});

export const paginatorStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 30,
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#BC994A",
    marginHorizontal: 8,
  },
});

export const nextButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "black",
    width: "100%",
  },
  button: {
    backgroundColor: "#BC994A",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "90%",
    borderRadius: 20,
    shadowColor: "white",
    shadowOpacity: 3,
    shadowRadius: 3,
    shadowOffset: 2,
    padding: 5,
  },
});
