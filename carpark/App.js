import { StyleSheet, Text, View, TextInput } from 'react-native';
import ReportFault from './screens/ReportFault';

export default function App() {
  return (
    <View style={styles.container}>
      <ReportFault />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
