import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { textStyles } from "../../styles/globalStyles";
import { ScrollView } from "react-native";

const OneNewForMainPage = ({ route }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#111214",
        width: "100%",
      }}
    >
      <Image
        source={{ uri: `data:image/png;base64,${route.params.item.photo}` }}
        style={{
          height: 200,
          width: "100%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />
      <View style={{ width: "90%", marginTop: 15 }}>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <Text style={{ ...textStyles.medium12pxGrey, marginBottom: 10 }}>
            {route.params.item.date}
          </Text>
        </View>
        <Text style={textStyles.bold20pxWhite}>{route.params.item.title}</Text>
        <View style={{ height: "75%" }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={{ ...textStyles.regular15pxWhite, marginTop: 10 }}>
              {route.params.item.text}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OneNewForMainPage;
