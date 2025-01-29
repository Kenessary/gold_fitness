import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { textStyles } from "../../../styles/globalStyles";
import { photoAddModal } from "../styles/profileStyle";

const PhotoAddModal = ({
  modalVisible,
  setModalVisible,
  addLoading,
  addProfileImage,
  deleteProfileImage,
  image,
  deleteLoading,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={photoAddModal.centeredView}>
        <View style={[photoAddModal.modalView, { backgroundColor: "#111214" }]}>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            {!addLoading && (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <AntDesign name="closecircle" size={22} color="#D6D6D6" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={textStyles.bold18pxWhite}>Фото для профиля</Text>
          <View style={photoAddModal.photoEditContainer}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => addProfileImage()}
                style={photoAddModal.btn}
              >
                {addLoading ? (
                  <UIActivityIndicator size={24} color="white" />
                ) : (
                  <Entypo name="camera" size={34} color="#D2D2D2" />
                )}
              </TouchableOpacity>
              <Text style={{ ...textStyles.medium14pxWhite, marginTop: 5 }}>
                Добавить
              </Text>
            </View>
            {image !== null && (
              <View style={{ alignItems: "center", marginLeft: 20 }}>
                <TouchableOpacity
                  onPress={() => deleteProfileImage()}
                  style={photoAddModal.btn}
                >
                  {deleteLoading ? (
                    <UIActivityIndicator size={24} color="white" />
                  ) : (
                    <MaterialIcons name="delete" size={38} color="#FD5F5F" />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    ...textStyles.medium14pxWhite,
                    marginTop: 5,
                  }}
                >
                  Удалить
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PhotoAddModal;
