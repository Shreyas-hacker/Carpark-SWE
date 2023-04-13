import { Dimensions, View, StyleSheet, FlatList, Text } from "react-native";

import FaultCard from "./FaultCard";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchSevereFaults } from "../../util/realtime/realTimeStorage";
import { useEffect, useState } from "react";

const width = Dimensions.get("window").width;

function ShowFaults() {
  const [isSearching, setIsSearching] = useState(false);
  const [SevereFaults, setSevereFaults] = useState([]);

  useEffect(() => {
    async function getSevereFaults() {
      try {
        const response = await fetchSevereFaults();
        setSevereFaults(response);
        setIsSearching(true);
      } catch (error) {
        console.log(error);
      }
    }
    getSevereFaults();
  }, []);
  return (
    <View style={styles.container}>
      {!isSearching ? (
        <LoadingScreen />
      ) : SevereFaults.length > 0 ? (
        <FlatList
          data={SevereFaults}
          renderItem={({ item }) => <FaultCard fault={item} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={true}
        />
      ) : (
        <Text>No Severe Faults</Text>
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

export default ShowFaults;
