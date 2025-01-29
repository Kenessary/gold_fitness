import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { contactTrainers } from "../../../Profile/styles/profileStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { textStyles } from "../../../../styles/globalStyles";

const ProfileCard = ({ profile }) => {
  return (
    <View style={contactTrainers.cardContainer}>
      <View style={contactTrainers.innerContainer}>
        {profile.photo_users[0].photo_path === null ? (
          <MaterialIcons name="account-circle" size={46} color="#BDBDBD" />
        ) : (
          <Image
            source={{
              uri: `data:image/png;base64,${profile.photo_users[0].photo_path}`,
            }}
            style={{ width: 46, height: 46, borderRadius: 50 }}
          />
        )}

        <View style={{ marginLeft: 10 }}>
          <Text style={textStyles.medium18pxWhite}>
            {profile.info_users.LastName} {profile.info_users.Name}
          </Text>
          <Text style={{ ...textStyles.regular14pxWhite, marginTop: 2 }}>
            {profile.info_users.Doljnost}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileCard;
