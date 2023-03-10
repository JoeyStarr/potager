import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

import { SIZES, COLORS, FONTS } from "../../style/index";

import { onboards, icons } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Footer = ({
  scrollX,
  flatListRef,
  currentIndex,
  setCurrentIndex,
  navigation,
}) => {
  const start = async () => {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      console.log("====================================");
      console.log("OnBoarding finish");
      console.log("====================================");
      navigation.replace("SignIn");
    } catch (error) {
      console.log("Error @setItem: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Button */}
      {currentIndex < onboards?.onboards?.length - 1 && (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 230,
              height: 70,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.padding / 1.3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              flatListRef?.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
              });
            }}
          >
            <Text style={{ color: COLORS.primaryColor, ...FONTS.body2 }}>
              Suivant
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {currentIndex == onboards?.onboards?.length - 1 && (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 230,
              height: 70,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.padding / 1.3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              start();
            }}
          >
            <Text
              style={{
                color: COLORS.primaryColor,
                ...FONTS.h2,
              }}
            >
              D??marrer
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {Dots(scrollX)}

      <View style={{ height: 40 }}>
        <TouchableOpacity onPress={() => start()}>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: "400",
              textDecorationLine: "underline",
              textDecorationStyle: "dashed",
              color: "white",
            }}
          >
            Sauter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Dots = (scrollX) => {
  const dotPosition = Animated.divide(scrollX, SIZES.width);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
      }}
    >
      {onboards?.onboards?.map((item, index) => {
        const dotColor = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.gray, COLORS.white, COLORS.gray],
          extrapolate: "clamp",
        });

        const dotWidth = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={{
              borderRadius: 5,
              marginHorizontal: 6,
              width: dotWidth,
              height: 10,
              backgroundColor: dotColor,
            }}
          />
        );
      })}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height / 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
