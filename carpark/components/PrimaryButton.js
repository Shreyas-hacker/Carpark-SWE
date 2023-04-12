import { Text, View, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ text, onSuccess, onAttempt }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={() =>
          onSuccess
            ? [styles.buttonInnerContainer, styles.success]
            : styles.buttonInnerContainer
        }
        disabled={!onSuccess}
        onPress={onAttempt}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    overflow: "hidden",
    alignSelf: "center",
  },
  buttonInnerContainer: {
    backgroundColor: "grey",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  success: {
    backgroundColor: "#39D2C0",
  },
});
