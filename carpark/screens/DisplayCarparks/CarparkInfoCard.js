import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadingScreen from "../../components/LoadingScreen";
import { AuthContext } from "../../store/context/user-context";
import {
  storeFav,
  fetchFavs,
  updateFavorite,
} from "../../util/realtime/realTimeFav";
import { fetchReport_carparks } from "../../util/realtime/realTimeStorage";

function CarparkInfoCard({ carpark, carparkLots, loading }) {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [arrowDirection, setArrowDirection] = useState("up");
  const [favCarpark, setFavCarpark] = useState([]);
  const [reports, setReports] = useState([]);

  const [isHidden, setIsHidden] = useState(false);
  const [iconColor, setIconColor] = useState(
    favCarpark.findIndex((fav) => fav.car_park_no === carpark.car_park_no) !==
      -1
      ? "orange"
      : "black"
  );

  useEffect(() => {
    async function getReports() {
      try {
        const response = await fetchReport_carparks(carpark);
        setReports(response);
      } catch (error) {
        console.log(error);
      }
    }
    getReports();
  }, [carpark]);

  useEffect(() => {
    async function fetchFav() {
      const fav = await fetchFavs(authCtx.email);
      setFavCarpark(fav);
      const isFavourited =
        fav.findIndex((fav) => fav.car_park_no === carpark.car_park_no) !== -1;
      setIconColor(isFavourited ? "orange" : "black");
    }
    fetchFav();
  }, [authCtx.email, carpark.car_park_no]);

  const toggleCard = () => {
    Animated.timing(slideAnimation, {
      toValue: slideAnimation._value === 0 ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setArrowDirection(arrowDirection === "up" ? "down" : "up");
    setIsHidden(!isHidden);
  };

  const slidePosition = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height / 5, 0],
  });

  const lotsPercentage = carparkLots[0] / carparkLots[1];

  let resultTextColor;
  if (lotsPercentage > 0.5) {
    resultTextColor = "green";
  } else if (lotsPercentage > 0.25) {
    resultTextColor = "orange";
  } else {
    resultTextColor = "red";
  }

  let reportTextColor;
  let report_status = "";
  let report_count = 0;
  let isOrange = 0;
  let reg = 0;

  if (reports.length > 0) {
    report_count = reports[reports.length - 1].count - 1;
    for (let i = report_count; i >= 0; i--) {
      if (reports[i].severity === "1") {
        reportTextColor = "green";
        report_status = "Low";
      } else if (reports[i].severity === "2" && isOrange === 0) {
        reportTextColor = "orange";
        report_status = "Medium";
        isOrange = i;
      } else if (reports[i].severity === "3") {
        reportTextColor = "red";
        report_status = "High";
        reg = i;
        break;
      }
    }
    if (isOrange !== 0) {
      reg = isOrange;
      reportTextColor = "orange";
      report_status = "Medium";
    }
  } else {
    reportTextColor = "green";
  }

  function onFavouritePress() {
    if (iconColor == "black") {
      if (favCarpark.length === 0) {
        setFavCarpark([...favCarpark, carpark.car_park_no]);
        storeFav({ user_id: authCtx.email, favouritedCarpark: [carpark] });
        Alert.alert(
          "Added to Favourites",
          "This carpark has been added to your favourites list!",
          [{ text: "Ok", style: "destructive" }]
        );
      } else if (
        favCarpark.findIndex(
          (fav) => fav.car_park_no === carpark.car_park_no
        ) === -1
      ) {
        setFavCarpark([...favCarpark, carpark]);
        updateFavorite([...favCarpark, carpark], authCtx.email);
        Alert.alert(
          "Added to Favourites",
          "This carpark has been added to your favourites list!",
          [{ text: "Ok", style: "destructive" }]
        );
      }
      setIconColor("orange");
    } else {
      setIconColor("black");
      const index = favCarpark.findIndex(
        (fav) => fav.car_park_no === carpark.car_park_no
      );
      favCarpark.splice(index, 1);
      updateFavorite(favCarpark, authCtx.email);
      Alert.alert(
        "Removed from Favourites",
        "This carpark has been removed from your favourites list!",
        [{ text: "Ok", style: "destructive" }]
      );
    }
  }
  return (
    <>
      <Animated.View
        style={[
          styles.card,
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{ translateY: slidePosition }],
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={[
              styles.slideBar,
              {
                transform: [
                  { rotate: arrowDirection === "up" ? "180deg" : "0deg" },
                ],
              },
            ]}
            onPress={toggleCard}
          >
            <View style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onFavouritePress}>
            <MaterialIcons name={"star"} color={iconColor} size={32} />
          </TouchableOpacity>
        </View>

        {!loading ? (
          <>
            <View style={styles.itemRow}>
              <Text style={[styles.title]}>{carpark.address}</Text>
            </View>

            <Text style={[styles.subtitle_lots]}>
              Total Slots: {carparkLots[1]}
            </Text>
            <Text style={[styles.subtitle_lots, { color: resultTextColor }]}>
              Available Slots: {carparkLots[0]}
            </Text>
            <Text style={[styles.subtitle]}>
              Free Parking Time: {carpark.free_parking}
            </Text>
            <Text style={[styles.subtitle]}>
              Parking Duration: {carpark.short_term_parking}
            </Text>
            <Text style={[styles.subtitle]}>
              Carpark Type: {carpark.car_park_type}
            </Text>
            <Text style={[styles.subtitle]}>
              Gantry Height:{" "}
              {carpark.gantry_height !== "0.00"
                ? carpark.gantry_height + " Metres"
                : "No Limit"}{" "}
            </Text>

            {reports && reports.length > 0 ? (
              <>
                <Text style={[styles.reportHeader]}>
                  Total reports made: {report_count + 1}
                </Text>
                <Text style={[styles.reportSubs, { color: reportTextColor }]}>
                  Reported by: {reports[reg].email}
                </Text>
                <Text style={[styles.reportSubs, { color: reportTextColor }]}>
                  Report status: {report_status}
                </Text>
                <Text style={[styles.reportSubs, { color: reportTextColor }]}>
                  Report description: {reports[reg].description}
                </Text>
              </>
            ) : (
              <Text style={[styles.reportSubs, { color: reportTextColor }]}>
                No Reports Done
              </Text>
            )}

            <View style marginBottom={50}></View>

            {isHidden && (
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  navigation.goBack();
                  navigation.navigate("ReportFault", {
                    carpark: carpark.car_park_no,
                    address: carpark.address,
                  });
                }}
              >
                <MaterialIcons name="report-problem" color="red" size={24} />
                <Text style={[styles.buttonText]}> Report</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <LoadingScreen />
        )}
      </Animated.View>
    </>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingTop: 16,
    paddingBottom: windowHeight * 0.2, // Use 20% of the screen height
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  slideBar: {
    height: 30,
    width: 80,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 150,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  arrow: {
    marginBottom: 5,
    height: 15,
    width: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#717171",
    borderRightWidth: 3,
    borderRightColor: "#717171",
    transform: [{ rotate: "45deg" }],
  },
  itemRow: {
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginLeft: 16,
    marginBottom: 8,
    color: "#5C5B5B",
    fontFamily: "OpenSans_700Bold",
  },
  subtitle_lots: {
    fontSize: 13,
    marginLeft: 16,
    marginBottom: 4,
    color: "#5C5B5B",
    fontFamily: "OpenSans_600SemiBold",
  },
  subtitle: {
    fontSize: 13,
    marginLeft: 16,
    marginBottom: 4,
    color: "#5C5B5B",
    fontFamily: "OpenSans_400Regular",
  },
  reportHeader: {
    marginTop: 10,
    fontSize: 13,
    marginLeft: 16,
    marginBottom: 4,
    color: "#5C5B5B",
    fontFamily: "OpenSans_400Regular",
  },
  reportSubs: {
    fontSize: 13,
    marginLeft: 16,
    marginBottom: 4,
    color: "#5C5B5B",
    fontFamily: "OpenSans_400Regular",
  },
  button2: {
    backgroundColor: "#F0F0F0",
    width: "34%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "OpenSans_700Bold",
  },
  cardHeader: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    marginRight: 20,
  },
});

export default CarparkInfoCard;
