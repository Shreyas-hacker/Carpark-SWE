import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({ onSearchTermChange, searchTerm }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by car park name"
        onChangeText={onSearchTermChange}
        value={searchTerm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 30,
    marginHorizontal: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 10,
  },
});

export default SearchBar;
