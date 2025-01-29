import React, { useContext, useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import OtpWithTime from "../Authorization/Login/components/OtpWithTime";
import { AuthContext } from "../../context/AuthContext";
import { UIActivityIndicator } from "react-native-indicators";
import { getCode } from "../Authorization/Login/api/sendCode";
import { convertToDesiredFormat } from "../../helpers/helpers";
import { changePassword } from "../Authorization/Login/api/changePassword";
import ChangePassword from "../Authorization/Login/components/ChangePassword";

const RestorePassword = ({ route }) => {
  const { phone, logout } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [focusedInput, setFocusedInput] = useState(-1);
  const [restorePasswordPhone, setRestorePasswordPhone] = useState("");
  const [successSendCode, setSuccessSendCode] = useState(false);
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const [inputsForRestore, setInputsForRestore] = useState({
    password: "",
    confirm_password: "",
  });

  const [errorsForRestore, setErrorsForRestore] = useState({});
  const [isLoadingForRestore, setIsLoadingForRestore] = useState(false);

  const goBackAfterChangePassword = () => {
    logout();
  };

  const validateForRestore = () => {
    Keyboard.dismiss();
    if (inputsForRestore.password && inputsForRestore.confirm_password) {
      if (inputsForRestore.password !== inputsForRestore.confirm_password) {
        Alert.alert("Пароли не совпадают", "Повторите пожалуйста");
        return;
      }
    }
    if (!inputsForRestore.password) {
      handleErrorForRestore("Вы не ввели пароль", "password");
      return;
    }
    if (!inputsForRestore.confirm_password) {
      handleErrorForRestore("Вы не ввели повторный пароль", "confirm_password");
      return;
    }
    // login(phoneNumber, inputs.password);
    changePassword(
      route.params,
      phone,
      inputsForRestore.password,
      inputsForRestore.confirm_password,
      setIsLoadingForRestore,
      goBackAfterChangePassword
    );
  };

  const handleOnChangeForRestore = (text, input) => {
    setInputsForRestore((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleErrorForRestore = (errorMessage, input) => {
    setErrorsForRestore((prevState) => ({
      ...prevState,
      [input]: errorMessage,
    }));
  };

  useEffect(() => {
    getCode(
      convertToDesiredFormat(phone).slice(1),
      setSuccessSendCode,
      setCode,
      setIsLoading
    );
  }, []);

  useEffect(() => {
    if (parseInt(code, 10) === parseInt(otp.join(""), 10)) {
      setIsMatched(true);
    } else {
      setIsMatched(false);
      if (code.length === 4 && otp.join("").length === 4) {
        setWarning(true);
      }
    }
  }, [code, otp]);

  if (!successSendCode) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111214",
        }}
      >
        <UIActivityIndicator color="#BC994A" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#111214",
        paddingTop: 50,
        width: "100%",
      }}
    >
      {isMatched ? (
        <View style={{ width: "90%" }}>
          <ChangePassword
            errors={errorsForRestore}
            handleError={handleErrorForRestore}
            inputs={inputsForRestore}
            handleOnChange={handleOnChangeForRestore}
            validate={validateForRestore}
            isLoading={isLoadingForRestore}
          />
        </View>
      ) : (
        <View style={{ width: "90%" }}>
          <OtpWithTime
            inputRefs={inputRefs}
            otp={otp}
            setOtp={setOtp}
            setFocusedInput={setFocusedInput}
            focusedInput={focusedInput}
            restorePasswordPhone={phone}
            setSuccessSendCode={setSuccessSendCode}
            setCode={setCode}
            setWarning={setWarning}
            warning={warning}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default RestorePassword;
