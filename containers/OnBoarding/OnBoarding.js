import React from "react";
import { StyleSheet, View } from "react-native";
import CustomFlatList from "./CustomFlatList";

// Custom FlatList Component
// used to render a flat list of items

const OnBoarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Custom FlatList Component */}
      <CustomFlatList navigation={navigation} />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
