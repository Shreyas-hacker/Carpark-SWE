import { StyleSheet, Text, View, TextInput } from 'react-native';
import PrimaryButton from './components/PrimaryButton';

export default function App() {

  const success = true; // can change to false if want to see change in color of button

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onSuccess={success}>Create</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  buttonContainer:{
    marginTop: 300,
  }
});
