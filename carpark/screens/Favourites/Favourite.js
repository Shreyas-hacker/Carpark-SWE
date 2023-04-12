import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList
} from "react-native";
import { React, useEffect, useState, useContext } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import IconButton from "../../components/IconButton";
import { AuthContext } from "../../store/context/user-context";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchFavs,updateFavorite } from "../../util/realtime/realTimeFav";
import FavouriteCard from "./FavouriteCard";

function Favourite({ navigation }) {
  const [hasFavourites, setHasFavourites] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const authCtx = useContext(AuthContext);


  useEffect(() => {
    async function getFavourites() {
      try{
        var email = authCtx.email;
        const response = await fetchFavs(email);
        setFavourites(response);
        setHasFavourites(true);
      }catch(error){
        console.log(error);
      }
    }
    getFavourites();
  })

  function goBack(){
    navigation.goBack();
  }

  function removeFavourite(carpark,email){
    const newFavourites = favourites.filter((fav) => fav !== carpark);
    setFavourites(newFavourites);
    updateFavorite(newFavourites,email);
  }

  function goMap(carpark){
    navigation.navigate("DisplayCarpark", { carpark: carpark });
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <IconButton
          onPress={goBack}
          icon="arrow-back"
          size={28}
          color="black"
        />
      </View>
      <Text style={styles.title}>Favourites</Text>
      {
        !hasFavourites ? (<LoadingScreen/> ) : (favourites.length > 0 ? (
          <FlatList
            data={favourites}
            renderItem={({ item }) => <FavouriteCard favCarpark={item} removeFavourite={removeFavourite.bind(this,item,authCtx.email)}  goMap={goMap.bind(this,item)}/>}
            keyExtractor={(item) => item[item]}
          />
        ) : (
          <View style={styles.imageContainer}>
            <MaterialIcons
              name="favorite"
              color="plum"
              size={100}
              style={{ alignSelf: "center" }}
            />
            <Text style={styles.noReportsText}>
              You have not favourite any car parks yet
            </Text>
          </View>
      ))}
    </View>
  )
}
    


const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F0F5F6' ,
  },
  topContent:{
    flexDirection:'row',
    marginTop: 40,
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer:{
    marginTop: deviceHeight/3,
  },
  noReportsText:{
    alignSelf: "center",
    fontSize: 18
  }
});

export default Favourite;
  
  
  