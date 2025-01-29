import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { profileImage } from "../styles/profileStyle";

export const ProfileImage = ({ image, setModalVisible }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 0 }}>
      <View style={profileImage.profileImageContainer}>
        {image ? (
          <Image
            source={{ uri: `data:image/png;base64,${image}` }}
            style={profileImage.imgStyle}
          />
        ) : (
          <>
            <Image
              source={require("../../../../assets/profileImgs/profile.png")}
              style={{ ...profileImage.imgStyle, zIndex: 2 }}
            />
          </>
        )}

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={profileImage.addImgBtn}
        >
          <MaterialIcons name="add-a-photo" size={18} color="#D2D2D2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImage;
