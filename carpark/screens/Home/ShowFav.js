import { Dimensions, View, StyleSheet, FlatList, Text } from "react-native";

import LoadingScreen from "../../components/LoadingScreen";
import { fetchFavs } from "../../util/realtime/realTimeFav";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/context/user-context";
import FavCard from "./FavCard";

const width = Dimensions.get("window").width;

function ShowFavs() {
  const [isSearching, setIsSearching] = useState(false);
  const [Favorites, setFavorites] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getFavorites() {
      try {
        const response = await fetchFavs(authCtx.email);
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
      ) : Favorites && Favorites.length > 0 ? (
        <FlatList
          data={Favorites}
          renderItem={({ item }) => <FavCard Favorites={item} />}
          keyExtractor={(item) => item.id}
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
