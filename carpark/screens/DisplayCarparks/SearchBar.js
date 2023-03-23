import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
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
    marginTop: 10,
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
