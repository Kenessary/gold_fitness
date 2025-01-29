import React from "react";
import { View, Text } from "react-native";

export default function NotesScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111214",
      }}
    >
      <Text style={{ color: "white" }}>Notes Page</Text>
    </View>
  );
}
