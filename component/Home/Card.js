import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../style/index";
import { images, icons } from "../../constants";

const Card = ({ cardData, isHashSaved }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.cardContainer, styles.borderRad]}
        disabled={isHashSaved}
      >
        <ImageBackground
          source={images.bg}
          style={[
            {
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
            styles.borderRad,
          ]}
          resizeMethod="auto"
          resizeMode="stretch"
        >
          {isHashSaved === false ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",

                padding: 15,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: "white", ...FONTS.h2, fontSize: 24 }}>
                  Saisir le code potager
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Black",
                    color: "white",
                    fontSize: 32,
                    marginHorizontal: 10,
                  }}
                >
                  #XX XX XX
                </Text>
                <Image
                  source={icons.code}
                  resizeMethod="resize"
                  resizeMode="cover"
                  style={{
                    width: 60,
                    height: 60,
                    tintColor: "white",
                  }}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardContainer: {
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  borderRad: {
    borderTopLeftRadius: SIZES.padding * 2,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.padding * 2,
  },
});
