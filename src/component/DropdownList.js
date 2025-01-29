import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownList = ({ data, placeholder, value, onChange, width }) => {
  return (
    <Dropdown
      style={[styles.dropdown, { width: width }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle}
      activeColor="#BC994A"
      containerStyle={styles.containerStyle}
      itemContainerStyle={{ borderRadius: 10 }}
      confirmSelectItem={false}
      autoScroll={true}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 36,
    width: "100%",
    margin: 0,
    backgroundColor: "#393C43",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "TTNormsPro-Regular",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "TTNormsPro-Regular",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    color: "white",
    fontFamily: "TTNormsPro-Medium",
  },
  containerStyle: {
    backgroundColor: "#393C43",
    borderWidth: 0,
    marginTop: 5,
    borderRadius: 10,
  },
});

export default DropdownList;
