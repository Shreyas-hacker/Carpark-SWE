import { StyleSheet, Text, Pressable, View } from "react-native";

function LongButton({ text, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={styles.buttonInnerContainer} onPress={onPress}>
        <Text style={{ fontFamily: "OpenSans_600SemiBold", fontSize: 12 }}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 8,
    borderColor: "#C0D1DD",
    borderWidth: 2,
    overflow: "hidden",
    width: "90%",
    alignSelf: "center",
    marginVertical: 8,
  },
  buttonInnerContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});

export default LongButton;
