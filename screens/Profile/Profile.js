import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import { signOut, getAuth } from "firebase/auth";

const Profile = ({ navigation }) => {
  const auth = getAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
      <Button title="Log Out" onPress={() => signOut(auth)} />

      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          borderRadius: 10,
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 22, color: "white", fontWeight: "600" }}>
          Return
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
