import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { signOut, getAuth } from "firebase/auth";

const Home = () => {
  const auth = getAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button title="Log Out" onPress={() => signOut(auth)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
