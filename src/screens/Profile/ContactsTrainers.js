import { Linking, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MaterialIndicator } from "react-native-indicators";
import { getContactsTrainers } from "./api/GetContactsTrainers";
import { ScrollView } from "react-native";
import { textStyles } from "../../styles/globalStyles";
import { contactTrainers } from "./styles/profileStyle";

export default function ContactsTrainers() {
  const [contacts, setContacts] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getContactsTrainers(setIsLoading, setContacts);
  }, []);

  if (isLoading) {
    return (
      <View style={contactTrainers.loader}>
        <MaterialIndicator color="#BC994A" />
      </View>
    );
  }

  return (
    <View style={contactTrainers.container}>
      <ScrollView style={{ width: "90%" }} showsVerticalScrollIndicator={false}>
        {contacts &&
          contacts.map((el) => (
            <View key={Math.random()} style={contactTrainers.cardContainer}>
              <View style={contactTrainers.innerContainer}>
                <MaterialIcons
                  name="account-circle"
                  size={46}
                  color="#BDBDBD"
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={textStyles.medium18pxWhite}>
                    {el.LastName} {el.Name}
                  </Text>
                  <Text
                    style={{ ...textStyles.regular14pxWhite, marginTop: 2 }}
                  >
                    {el.Doljnost}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://wa.me/${el.NomerTel}`)}
                style={{
                  ...contactTrainers.whatsAppBtn,
                  display: el.NomerTel === "7" ? "none" : "flex",
                }}
              >
                <FontAwesome name="whatsapp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
