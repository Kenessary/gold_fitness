import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import PersonalScreen from "../screens/Home/PersonalScreen/PersonalScreen";
import GroupScreen from "../screens/Home/GroupScreen/GroupScreen";
import ClientsScreen from "../screens/Home/ClientsScreen/ClientsScreen";
import NotificationScreen from "../screens/Home/NotificationScreen/NotificationScreen";
import ContactsTrainers from "../screens/Profile/ContactsTrainers";
import { textStyles } from "../styles/globalStyles";
import { options } from "../helpers/helpers";
import PriceScreen from "../screens/Home/PriceScreen/PriceScreen";
import NewsScreen from "../screens/News/NewsScreen";
import TrainersListScreen from "../screens/Home/TrainersListScreen/TrainersListScreen";
import TrainerScreen from "../screens/Home/TrainersListScreen/TrainerScreen";
import AboutFitness from "../screens/Home/AboutFitness/AboutFitness";
import AddNews from "../screens/News/AddNews";
import OneNewScreen from "../screens/News/OneNewScreen";
import OneNewForMainPage from "../screens/News/OneNewForMainPage";
import RestorePassword from "../screens/Profile/RestorePassword";
import RealTimeClients from "../screens/Home/HomeScreen/components/RealTimeClients";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={BottommNavigation}
        options={{
          gestureEnabled: false,
          animation: "fade",
          animationDuration: 300,
        }}
      />

      <Stack.Screen
        name="PersonalScreen"
        component={PersonalScreen}
        options={{ ...options, headerTitle: "Персональные занятии" }}
      />
      <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{ ...options, headerTitle: "Групповые программы" }}
      />
      <Stack.Screen
        name="ClientsScreen"
        component={ClientsScreen}
        options={{ ...options, headerTitle: "Список клиентов" }}
      />
      <Stack.Screen
        name="PriceScreen"
        component={PriceScreen}
        options={{ ...options, headerTitle: "Прайс-лист / Абонементы" }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ ...options, headerTitle: "Уведомление" }}
      />
      <Stack.Screen
        name="ContactsTrainers"
        component={ContactsTrainers}
        options={{ ...options, headerTitle: "Контакты тренера" }}
      />
      <Stack.Screen
        name="TrainersListScreen"
        component={TrainersListScreen}
        options={{ ...options, headerTitle: "Тренеры" }}
      />
      <Stack.Screen
        name="TrainerScreen"
        component={TrainerScreen}
        options={{ ...options, headerTitle: "Тренер" }}
      />
      <Stack.Screen
        name="AboutFitness"
        component={AboutFitness}
        options={{ ...options, headerTitle: "О зале" }}
      />
      <Stack.Screen
        name="AddNews"
        component={AddNews}
        options={{ ...options, headerTitle: "Добавить новости" }}
      />
      <Stack.Screen
        name="OneNewScreen"
        component={OneNewScreen}
        options={{
          ...options,
          headerTitle: "Новости",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="RealTimeClients"
        component={RealTimeClients}
        options={{
          ...options,
          headerTitle: "В данный момент в зале",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="OneNewForMainPage"
        component={OneNewForMainPage}
        options={{
          ...options,
          headerTitle: "Новости",
          animation: "fade_from_bottom",
        }}
      />

      <Stack.Screen
        name="RestorePassword"
        component={RestorePassword}
        options={{ ...options, headerTitle: "Изменить пароль " }}
      />
    </Stack.Navigator>
  );

  function BottommNavigation() {
    return (
      <Tab.Navigator
        labelStyle={{ fontSize: 12 }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#CFA953",
          tabBarActiveBackgroundColor: "#393C43",
          tabBarStyle: {
            height: 80,
            width: "100%",
            borderTopWidth: 0,
            backgroundColor: "#393C43",
          },
        }}
      >
        <Tab.Screen
          name="Основное"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            tabBarShowLabel: false,
            tabBarLabelStyle: {},
            tabBarIcon: ({ color }) => (
              <Foundation name="home" size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Новости"
          component={NewsScreen}
          options={{
            gestureEnabled: false,
            tabBarShowLabel: false,
            tabBarLabelStyle: {},
            tabBarIcon: ({ color }) => (
              <Ionicons name="newspaper" size={28} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Профиль"
          component={ProfileScreen}
          options={{
            gestureEnabled: false,
            tabBarShowLabel: false,
            tabBarLabelStyle: {},
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={32} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
