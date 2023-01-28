import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";

import { signOut, getAuth } from "firebase/auth";

const Dashboard = () => {
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <Text>Admin</Text>
      <Button title="Log Out" onPress={() => signOut(auth)} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
