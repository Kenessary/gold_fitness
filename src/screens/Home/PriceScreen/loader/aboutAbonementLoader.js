import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";
import { Text } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";

const AboutAbonementLoader = () => {
  const Length = Array.from({ length: 3 });

  return (
    <View style={{ width: "100%", padding: 20 }}>
      {Length.map((_, index) => (
        <Skeleton
          key={index}
          animation="pulse"
          style={{
            backgroundColor: "#393C43",
            borderRadius: 10,
            marginBottom: 10,
          }}
          skeletonStyle={{ backgroundColor: "#616369" }}
          width={"80%"}
          height={20}
        />
      ))}

      <Skeleton
        animation="pulse"
        style={{
          backgroundColor: "#393C43",
          borderRadius: 10,
          marginTop: 30,
          marginBottom: 10,
        }}
        skeletonStyle={{ backgroundColor: "#616369" }}
        width={"50%"}
        height={22}
      />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 40,
          marginTop: 10,
        }}
      >
        {Length.map((_, index) => (
          <Skeleton
            key={index}
            animation="pulse"
            style={{
              backgroundColor: "#393C43",
              borderRadius: 20,
              marginTop: 10,
            }}
            skeletonStyle={{ backgroundColor: "#616369" }}
            width={"28%"}
            height={105}
          />
        ))}
      </View>

      <View style={{ width: "100%" }}>
        <Skeleton
          animation="pulse"
          style={{
            backgroundColor: "#393C43",
            borderRadius: 20,
            marginTop: 10,
          }}
          skeletonStyle={{ backgroundColor: "#616369" }}
          width={"40%"}
          height={22}
        />
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#BC994A",
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
          }}
        >
          <Text style={textStyles.bold20pxWhite}>Купить</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutAbonementLoader;
