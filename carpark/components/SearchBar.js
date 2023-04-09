import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ searchTerm, onSearchTermChange, onSearch }) => {
  const handleSearch = () => {
    if (searchTerm) {
      onSearch();
    }
  };

  return (
    <View style={styles.background}>
      <Ionicons name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search carparks here"
        value={searchTerm}
        onChangeText={onSearchTermChange}
        onEndEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
