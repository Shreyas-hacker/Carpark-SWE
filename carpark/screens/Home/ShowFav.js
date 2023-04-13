import { Dimensions, View, StyleSheet, FlatList, Text } from "react-native";

import FaultCard from "./FaultCard";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchSevereFaults } from "../../util/realtime/realTimeStorage";
import { useEffect, useState } from "react";

const width = Dimensions.get("window").width;

function ShowFavs() {
  const [isSearching, setIsSearching] = useState(false);
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function getFavorites() {
      try {
        const response = await fetchFavorites();
        setFavorites(response);
        setIsSearching(true);
      } catch (error) {
        console.log(error);
      }
    }
    getFavorites();
    console.log(Favorites);
  }, []);
  return (
    <View style={styles.container}>
      {!isSearching ? (
        <LoadingScreen />
      ) : Favorites.length > 0 ? (
        <FlatList
          data={Favorites}
          renderItem={({ item }) => <FaultCard Favorites={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={true}
        />
      ) : (
        <Text>No Favorites</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default ShowFavs;
