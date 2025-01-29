import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";
import { textStyles } from "../../../../styles/globalStyles";
import { Image } from "expo-image";
import { theme } from "../../../../styles/theme";

const UpdateVersion = ({ visible }) => {
  return (
    <BottomSheet visible={visible}>
      <View style={[styles.bottomNavigationView]}>
        <Image
          style={{ width: "100%", height: "70%" }}
          source={require("../../../../../assets/update.png")}
        />
        <Text style={{ ...textStyles.bold20pxWhite, textAlign: "center" }}>
          Доступная новая версия приложения
        </Text>
        <TouchableOpacity style={styles.updateBtn}>
          <Text
            style={{ ...textStyles.bold18pxWhite, textTransform: "uppercase" }}
          >
            Обновить
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: "80%",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#111214",
    shadowColor: "grey",
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowOffset: 2,
  },
  updateBtn: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UpdateVersion;
