import { Linking } from "react-native";
import { textStyles } from "../styles/globalStyles";

export const convertToWhatsapp = (phone) => {
  let numberString = phone.toString();
  numberString = "7" + numberString.slice(1);
  let modifiedNumber = parseInt(numberString, 10);
  let whatsappLink = Linking.openURL(`https://wa.me/${modifiedNumber}`);
  return whatsappLink;
};

export const convertToDesiredFormat = (formattedNumber) => {
  const numericInput = formattedNumber.replace(/\D/g, "");
  let desiredFormatNumber = numericInput;
  if (numericInput.startsWith("7")) {
    desiredFormatNumber = "8" + numericInput.substring(1);
  }

  return desiredFormatNumber;
};

export const transformDateFormat = (date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate1 = `${day < 10 ? "0" + day : day}.${
    month < 10 ? "0" + month : month
  }.${year}`;

  // console.log(formattedDate1);
  return formattedDate1;
};

export const options = {
  animation: "default",
  animationDuration: 300,
  headerShown: true,
  headerTitleStyle: { ...textStyles.bold18pxWhite },
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  headerTintColor: "white",
  headerStyle: { backgroundColor: "#202226" },
};
