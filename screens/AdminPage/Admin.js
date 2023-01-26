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
} from "react-native";


const Admin = () => {
    return (
        <View style={styles.container}>
            <Text>Admin</Text>
        </View>
    )
}

export default Admin;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    }
});