import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";
import { Alert } from "react-native";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [news, setNews] = useState("");
  const [token, setToken] = useState("");

  const login = async (phone_number, password) => {
    setIsLoading(true);
    const data = qs.stringify({
      phone_number: phone_number,
      password: password,
    });
    const config = {
      method: "post",
      url: "https://portmaster.kz/api/fitness/v1/login",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data;
        console.log(user);
        if (user.status === "false") {
          Alert.alert("Неправильный пароль или логин");
          setIsLoading(false);
        } else {
          setPhone(user.phone_number);
          AsyncStorage.setItem("userPhone", user.phone_number);
          setNews(user.novosti);
          AsyncStorage.setItem("userNews", user.novosti);
          setName(user.name);
          AsyncStorage.setItem("userName", user.name);
          setPosition(user.position);
          AsyncStorage.setItem("userPosition", user.position);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const registration = (
    phone_number,
    name,
    last_name,
    password,
    date_rozh,
    gender,
    setIsLoading
  ) => {
    setIsLoading(true);
    const data = qs.stringify({
      phone_number: phone_number,
      name: name,
      last_name: last_name,
      password: password,
      date_rozh: date_rozh,
      gender: gender,
    });
    const config = {
      method: "post",
      url: "https://portmaster.kz/api/fitness/v1/register",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const registration = response.data;
        console.log(registration);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setPhone(null);
    AsyncStorage.removeItem("userPhone");
    setNews(null);
    AsyncStorage.removeItem("userNews");
    setName(null);
    AsyncStorage.removeItem("userName");
    setPosition(null);
    AsyncStorage.removeItem("userPosition");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userPhone = await AsyncStorage.getItem("userPhone");
      let userNews = await AsyncStorage.getItem("userNews");
      let userName = await AsyncStorage.getItem("userName");
      let userPosition = await AsyncStorage.getItem("userPosition");
      setPhone(userPhone);
      setNews(userNews);
      setName(userName);
      setPosition(userPosition);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        phone,
        name,
        isLoading,
        logout,
        registration,
        position,
        news,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
