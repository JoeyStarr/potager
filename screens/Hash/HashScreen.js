import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { SIZES, COLORS, FONTS } from "../../style/index";
import { icons } from "../../constants";

// User Calls - Firebase
import { getPotagerByHash, setHashPota } from "../../firebase/userCalls";

const HashScreen = ({ navigation, route }) => {
  const [hashText, setHashText] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { userUid, docRef } = route.params;

  const checkPotager = async () => {
    setIsLoading(true);
    const response = await getPotagerByHash(hashText);

    if (response == null) {
      setErrorText("Aucun potager trouvé pour ce code");
    } else {
      await setHashPota(docRef, hashText, response?.potagerRef, userUid);
      console.log("Great! *");
      navigation.replace("Home");
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            backgroundColor: "white",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icons.chevron_left}
            style={{
              width: 27,
              height: 27,
              tintColor: COLORS.primaryColor,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primaryColor,
          }}
        >
          Hash Potager
        </Text>

        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            backgroundColor: "white",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.code}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* BODY */}
      <View
        style={{
          flex: 1,
          width: SIZES.width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ color: COLORS.secondaryColor, ...FONTS.h2 }}>
            Entre votre code potager
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextInput
            value={hashText}
            onChangeText={(text) => {
              setHashText(text);
              setErrorText("");
            }}
            style={styles.TextInput}
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primaryColor,
              height: 50,
              width: 250,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => checkPotager()}
            disabled={hashText?.length ? false : true}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Valider{" "}
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : null}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error message */}
        {errorText?.length > 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "red", ...FONTS.h3 }}>{errorText}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginVertical: 10,
  },
  TextInput: {
    width: "90%",
    borderRadius: 10,
    height: 55,
    fontSize: 22,
    marginVertical: 15,
    justifyContent: "center",
    textAlign: "center",
    borderBottomWidth: 2,
    fontFamily: "Poppins-Black",
  },
});
