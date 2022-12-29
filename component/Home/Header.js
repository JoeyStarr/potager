import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { SIZES, COLORS, FONTS } from "../../style/index";
import { icons } from "../../constants";

const Header = ({ userName, navigation }) => {
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
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={icons.user}
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
