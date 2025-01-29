import { useContext, useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  TextInput,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { BottomSheet } from "react-native-btr";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../../../component/Input";
import { loginStyles } from "./styles/loginStyles";
import PhoneInput from "../../../component/PhoneInput";
import { AuthContext } from "../../../context/AuthContext";
import { convertToDesiredFormat } from "../../../helpers/helpers";
import { textStyles } from "../../../styles/globalStyles";

import { MaterialIndicator } from "react-native-indicators";

import { getProfile } from "../../Profile/api/GetProfile";
import CheckAccount from "./components/CheckAccount";
import OtpWithTime from "./components/OtpWithTime";
import ChangePassword from "./components/ChangePassword";
import { changePassword } from "./api/changePassword";

const imgSource = require("../../../../assets/preview/logo.png");

export default function LoginScreen({ visible, setVisible }) {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [animation] = useState(new Animated.Value(0));
  const [inputs, setInputs] = useState({ password: "" });
  const [inputsForRestore, setInputsForRestore] = useState({
    password: "",
    confirm_password: "",
  });
  const [errorsForRestore, setErrorsForRestore] = useState({});

  const [phoneNumber, setPhoneNumber] = useState("");
  const [restorePasswordPhone, setRestorePasswordPhone] = useState("");

  // console.log(restorePasswordPhone);
  const [errors, setErrors] = useState({});
  const [switchIsForgotPass, setSwitchIsForgotPass] = useState(false);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedInput, setFocusedInput] = useState(-1);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const [isLoadingExist, setIsLoadingExist] = useState(false);
  const [isExistWhatsApp, setIsExistWhatsApp] = useState("");
  const [successSendCode, setSuccessSendCode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [profile, setProfile] = useState("");
  const [notMyAccount, setNotMyAccount] = useState(false);
  const [code, setCode] = useState("");

  // console.log(profile);
  const [isMatched, setIsMatched] = useState(false);
  const [warning, setWarning] = useState(false);

  const [tokenForRestore, setTokenForRestore] = useState("");
  const [isLoadingForRestore, setIsLoadingForRestore] = useState(false);
  // console.log(tokenForRestore);

  // console.log(parseInt(otp.join(""), 10));

  const goBackAfterChangePassword = () => {
    setSwitchIsForgotPass(false);
    backToLoginPart();
  };

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

  useEffect(() => {
    // Check focus when component mounts
    inputRefs.forEach((ref, index) => {
      if (ref.current && ref.current.isFocused()) {
        setFocusedInput(index);
      }
    });
  }, []);

  useEffect(() => {
    if (switchIsForgotPass) {
      // Start the smooth appearance animation when the component mounts or isVisible becomes true
      Animated.timing(animation, {
        toValue: 1, // End value for the animation
        duration: 400, // Duration of the animation in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start();
    } else {
      // Reset the animation when switchIsForgotPass becomes false
      animation.setValue(0); // Reset the animation value to 0
    }
  }, [switchIsForgotPass]);

  const smoothAppearance = () => {
    setSwitchIsForgotPass(true);
    setFocusedInput(0); // Set isVisible to true to trigger the animation
  };

  const animatedStyles = {
    opacity: animation, // Use animated value for opacity
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1], // Interpolate scale from 0.8 to 1
        }),
      },
    ],
  };

  // console.log(restorePasswordPhone);

  const resetInputarray = () => {
    const updatedInputs = { ...inputs, password: "" };
    setInputs(updatedInputs);
    setPhoneNumber("");
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    const desiredFormatNumber = convertToDesiredFormat(phoneNumber);
    setPhoneNumber(desiredFormatNumber);
  };
  const handleRestorePhoneNumberChange = (phoneNumber) => {
    const desiredFormatNumber = convertToDesiredFormat(phoneNumber);
    setRestorePasswordPhone(desiredFormatNumber);
    if (desiredFormatNumber.slice(1).length === 10) {
      Keyboard.dismiss();
      getProfile(
        desiredFormatNumber,
        setProfile,
        setIsLoading,
        setTokenForRestore
      );
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    if (phoneNumber.length !== 11) {
      Alert.alert("Вы не ввели номер телефона!");
      return;
    }
    if (!inputs.password) {
      handleError("Вы не ввели пароль", "password");
      return;
    }
    login(phoneNumber, inputs.password);
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
      tokenForRestore,
      restorePasswordPhone,
      inputsForRestore.password,
      inputsForRestore.confirm_password,
      setIsLoadingForRestore,
      goBackAfterChangePassword
    );
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
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

  const closeBottomSheet = () => {
    setVisible(false), resetInputarray();
  };

  const resetOtp = () => {
    {
      setOtp(["", "", "", ""]);
      setFocusedInput(-1);
      Keyboard.dismiss();
    }
  };

  const backToLoginPart = () => {
    setSwitchIsForgotPass(false);
    setIsExistWhatsApp("");
    setSuccessSendCode(false);
    resetOtp();
    setProfile("");
    setIsLoadingSend(false);
    setWarning(false);
    setIsLoadingForRestore(false);
    setInputsForRestore({
      password: "",
      confirm_password: "",
    });
  };

  return (
    <BottomSheet visible={visible}>
      <View style={[styles.bottomNavigationView]}>
        <View style={styles.bottomTopContainer}>
          <TouchableOpacity
            style={{ padding: 15, paddingLeft: 0 }}
            onPress={() =>
              switchIsForgotPass ? backToLoginPart() : closeBottomSheet()
            }
          >
            <AntDesign
              name={switchIsForgotPass ? "closecircle" : "leftcircle"}
              size={26}
              color="#696969"
            />
          </TouchableOpacity>
          <Image style={styles.img} source={imgSource} />

          <AntDesign
            name={switchIsForgotPass ? "closecircle" : "leftcircle"}
            size={26}
            color="#1C1D21"
            style={{ padding: 15, paddingRight: 0 }}
          />
        </View>
        {!switchIsForgotPass ? (
          <View>
            <View style={{ marginTop: 20 }}>
              <PhoneInput
                editable={true}
                iconName="account"
                label="Логин"
                onPhoneNumberChange={handlePhoneNumberChange}
                placeholder="+7"
                fontSize={16}
                maxLength={18}
                checkPhone={false}
              />

              <Input
                iconName="lock"
                label="Пароль"
                error={errors.password}
                onFocus={() => {
                  handleError(null, "password");
                }}
                placeholder="Пароль"
                fontSize={16}
                value={inputs.password}
                password
                onChangeText={(text) => handleOnChange(text, "password")}
              />
            </View>

            <TouchableOpacity
              onPress={() => validate()}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Вход</Text>
            </TouchableOpacity>

            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>У вас нет учетной записи?</Text>
              <TouchableOpacity
                onPress={() => (
                  navigation.navigate("RegistrationScreen"), setVisible(false)
                )}
                style={styles.registrationBtn}
              >
                <Text style={styles.registrationBtnText}>Регистрация</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.isForgotContainer}>
              <TouchableOpacity
                onPress={smoothAppearance}
                style={styles.isForgotBtn}
              >
                <Text style={styles.isForgotText}>Забыли пароль?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text style={{ ...textStyles.bold18pxWhite, marginBottom: 10 }}>
              {isMatched ? "Восстановление пароля" : "Подтверждение личности"}
            </Text>
            {successSendCode ? (
              isMatched ? (
                <ChangePassword
                  errors={errorsForRestore}
                  handleError={handleErrorForRestore}
                  inputs={inputsForRestore}
                  handleOnChange={handleOnChangeForRestore}
                  validate={validateForRestore}
                  isLoading={isLoadingForRestore}
                />
              ) : (
                <OtpWithTime
                  inputRefs={inputRefs}
                  otp={otp}
                  setOtp={setOtp}
                  setFocusedInput={setFocusedInput}
                  focusedInput={focusedInput}
                  restorePasswordPhone={restorePasswordPhone}
                  setSuccessSendCode={setSuccessSendCode}
                  setCode={setCode}
                  setWarning={setWarning}
                  warning={warning}
                />
              )
            ) : (
              <Animated.View
                style={[{ width: "100%", marginTop: 30 }, animatedStyles]}
              >
                <PhoneInput
                  editable={!isLoadingExist}
                  iconName="account"
                  label="WhatsApp номер"
                  onPhoneNumberChange={handleRestorePhoneNumberChange}
                  placeholder="+7"
                  fontSize={16}
                  maxLength={18}
                  autoFocus={true}
                  checkPhone={isLoading}
                  notMyAccount={notMyAccount}
                  setNotMyAccount={setNotMyAccount}
                />
                {profile && (
                  <CheckAccount
                    restorePasswordPhone={restorePasswordPhone}
                    setIsExistWhatsApp={setIsExistWhatsApp}
                    setSuccessSendCode={setSuccessSendCode}
                    setProfile={setProfile}
                    setRestorePasswordPhone={setRestorePasswordPhone}
                    setNotMyAccount={setNotMyAccount}
                    profile={profile}
                    setCode={setCode}
                    setIsLoadingSend={setIsLoadingSend}
                  />
                )}
                {isLoadingSend ? (
                  <>
                    <Text
                      style={{
                        ...textStyles.medium16pxGrey,
                        textAlign: "center",
                        marginTop: 30,
                      }}
                    >
                      Отправка кода
                    </Text>
                    <MaterialIndicator
                      color="#BC994A"
                      style={{ marginTop: 30 }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Animated.View>
            )}
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create(loginStyles);

const otpStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    width: 50,
    textAlign: "center",
    marginHorizontal: 5,
    color: "white",
  },
  firstInput: {
    // Add special styles for the first input field
  },
  focusedInput: {
    // Change border color and width when focused
    borderColor: "#BC994A",
    borderWidth: 3,
  },
});
