import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SIZES, COLORS, FONTS } from "../../style/index";
import { icons } from "../../constants";
import { signOut, getAuth } from "firebase/auth";

const Header = ({ userName, navigation }) => {
  const auth = getAuth();

  const authLogout = () => {
    Alert.alert("DJIPOTA", "Voulez-vous vous déconnecter?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Déconnexion", onPress: () => signOut(auth) },
    ]);
  };

  return (
    <View style={styles.header}>
      <View style={{ flex: 2, padding: 10 }}>
        <Text
          style={{
            ...FONTS.body2,
            fontFamily: "Poppins-SemiBold",
            fontSize: 25,
          }}
        >
          Bonjour {userName} 👋
        </Text>
      </View>
      <TouchableOpacity
        style={[{ flex: 1 }, styles.__flex]}
        onPress={authLogout}
      >
        <Image
          source={icons.logout}
          resizeMethod="scale"
          resizeMode="cover"
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.gray,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    width: SIZES.width,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 10,
    marginTop: 60,
  },
  __flex: {
    justifyContent: "center",
    alignItems: "center",
  },
});
