import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { storeAccount } from "../../util/http";

function CreateAccount() {
  return (
    <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
      <View>
        
      </View>
    </ScrollView>
  );
}

export default CreateAccount;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "black",
    flex: 1,
  },
});
