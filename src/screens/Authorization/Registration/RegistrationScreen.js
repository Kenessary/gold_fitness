import { useContext, useState } from "react";
import { Text, View, StyleSheet, Keyboard } from "react-native";
import { Image } from "expo-image";
import { AuthContext } from "../../../context/AuthContext";
import { checkMember } from "./api/CheckMember";

import { useNavigation } from "@react-navigation/native";
import FirstStep from "./components/firstStep/FirstStep";
import SecondStep from "./components/secondStep/SecondStep";
import ThirdStep from "./components/thirdStep/ThirdStep";
import BottomLogin from "./components/bottomLogin";
import RegisterMessage from "./components/registerMessage";
import PrevNextButtons from "./components/prevNextButtons";
import { registerStyles } from "./styles/registrationStyles";

const imgSource = require("../../../../assets/preview/logo.png");

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const { registration } = useContext(AuthContext);
  const [selectedGender, setSelectedGender] = useState("");
  const [inputs, setInputs] = useState({
    phone: "",
    first_name: "",
    last_name: "",
    password: "",
    reply_password: "",
  });
  const [errors, setErrors] = useState({});
  const [isDisplay, setIsDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [checkStatus, setCheckStatus] = useState("");
  const [hideBlock, setHideBlock] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const [step, setStep] = useState(1);

  const handlePrevious = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    const validatePassword = (password, fieldName) => {
      if (!password || password.length < 5) {
        handleError("Пароль должен содержать не менее 5 символов", fieldName);
        valid = false;
      }
    };

    validatePassword(inputs.password, "password");
    validatePassword(inputs.reply_password, "reply_password");

    if (valid && inputs.password !== inputs.reply_password) {
      handleError(
        "Пароли не совпадают. Пожалуйста, повторите ввод",
        "reply_password"
      );
      valid = false;
    }

    if (valid) {
      setHideBlock(true);
      registration(
        inputs.phone,
        inputs.first_name,
        inputs.last_name,
        inputs.password,
        birthDate,
        selectedGender,
        setLoadingRegister
      );
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    if (step === 1 && text.length === 11) {
      checkMember(text, setCheckStatus, setIsLoading);
    } else if (step === 1 && text.length !== 11) {
      setCheckStatus("");
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={registerStyles.container}>
      <View style={{ display: isDisplay ? "none" : "flex", width: "90%" }}>
        <View style={registerStyles.imgLogoContianer}>
          <Image style={registerStyles.imgLogo} source={imgSource} />
        </View>

        <Text style={registerStyles.paginationLabel}>Шаг {step} из 3</Text>
        <View style={registerStyles.paginationContainer}>
          <View
            style={step >= 1 ? registerStyles.active : registerStyles.inactive}
          ></View>
          <View
            style={step >= 2 ? registerStyles.active : registerStyles.inactive}
          ></View>
          <View
            style={step >= 3 ? registerStyles.active : registerStyles.inactive}
          ></View>
        </View>

        {(step === 1 && (
          <FirstStep
            inputs={inputs}
            errors={errors}
            isLoading={isLoading}
            handleOnChange={handleOnChange}
            handleError={handleError}
          />
        )) ||
          (step === 2 && (
            <SecondStep
              inputs={inputs}
              errors={errors}
              handleOnChange={handleOnChange}
              handleError={handleError}
              setBirthDate={setBirthDate}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />
          )) ||
          (step === 3 && (
            <ThirdStep
              errors={errors}
              handleError={handleError}
              handleOnChange={handleOnChange}
            />
          ))}

        <PrevNextButtons
          step={step}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          validate={validate}
          checkStatus={checkStatus}
        />

        <BottomLogin />
      </View>

      <RegisterMessage
        hideBlock={hideBlock}
        setHideBlock={setHideBlock}
        loadingRegister={loadingRegister}
      />
    </View>
  );
}
