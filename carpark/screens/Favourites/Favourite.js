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
  },[])

  function goBack(){
    navigation.goBack();
  }

  function removeFavourite(carpark,email){
    const newFavourites = favourites.filter((fav) => fav !== carpark);
    setFavourites(newFavourites);
    updateFavorite(newFavourites,email);
  }

  function goMap(carpark){
    navigation.navigate("DisplayCarpark", { searchTerm: carpark });
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
        <Text style={styles.title}>Favourites</Text>
      </View>
      {
        !hasFavourites ? (<LoadingScreen/> ) : (favourites.length > 0 ? (
          <FlatList
            data={favourites}
            renderItem={({ item }) => <FavouriteCard favCarpark={item} removeFavourite={removeFavourite.bind(this,item,authCtx.email)}  goMap={goMap.bind(this,item.car_park_no)}/>}
            keyExtractor={(item) => item._id}
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
              You have not favourited any car parks yet
            </Text>
          </View>
      ))}
    </View>
  )
}
    


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F0F5F6' ,
  },
  topContent:{
    flexDirection:'row',
    marginTop: height/13,
    marginLeft: width/20,
  },
  title:{
    marginLeft: width/6,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'OpenSans_700Bold',
    fontSize: 24,
  },
  imageContainer:{
    marginTop: height/3,
  },
  noReportsText:{
    alignSelf: "center",
    fontSize: 18
  }
});

export default Favourite;
  
  
  