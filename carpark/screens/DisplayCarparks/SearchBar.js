import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ onSearchTermChange, searchTerm }) => {
  return (
      <View style={styles.backgroundStyle}>
        <Feather name="search" style={styles.iconStyle} />
        <TextInput
          placeholder="Search by car park name"
          style={styles.inputStyle}
          value={searchTerm}
          onChangeText={onSearchTermChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    borderWidth: 2,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
