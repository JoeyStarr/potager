import React, { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// STYLES
import { FONTS, SIZES } from "../../style/theme";

// Toast
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Advice Calls
import { getAllAdvices, deleteAdvice } from "../../firebase/adviceCalls";
const GesConseil = ({ navigation }) => {
  const [advices, setAdvices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (advices == null) {
      getAllAdvices().then((data) => {
        setAdvices(data);
      });
    }
  }, []);
  function removeAdvice(item) {
    const imageName = splitNameFromUrl(item.imageUrl || item.imgUrl);
    const soundName = splitNameFromUrl(item.soundUrl);
    const adviceRef = item.ref;

    //    console.log(imageName);

    Alert.alert("Administration", "Voulez-vous supprimer ce conseil", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await deleteAdvice(adviceRef, imageName, soundName);
          setIsLoading(true);
          await getAllAdvices().then((data) => {
            setAdvices(data);
          });
          setIsLoading(false);
          toast.show("DJIPOTA", {
            type: "custom_toast",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
            data: {
              title: "Conseil supprimé ✨",
            },
          });

          console.log("Success");
        },
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size={38} color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>Conseils</Text>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size={38} color="#F5F5F5" />
        </Pressable>
      </View>
      <ScrollView style={styles.body}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoading ? (
            <View
              style={{
                height: SIZES.height / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <>
              {advices?.map((advice) =>
                renderAdvice({ advice, onPress: () => removeAdvice(advice) })
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const splitNameFromUrl = (str) => {
  let name = str.split(".com/o/").pop().split("?alt")[0];
  if (name[0] === "a") {
    name = name.slice(10, name.length);
  }
  return name;
};

const renderAdvice = ({ advice, onPress }) => {
  return (
    <View key={advice.ref} style={styles.adviceContainer}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={{ uri: advice.imgUrl || advice.imageUrl }}
          style={{
            width: 50,
            height: 50,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.title}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
          }}
        >
          {advice.description.slice(0, 40) + "..."}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          borderRadius: 50,
          padding: 10,
          marginRight: 10,
        }}
        onPress={onPress}
      >
        <Ionic name="trash-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default GesConseil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    marginTop: StatusBar.currentHeight + 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    width: windowWidth,
  },
  input: {
    height: 50,
    width: "80%",
    margin: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#CDC9C3",
    backgroundColor: "#CDC9C3",
    color: "grey",
    borderRadius: 8,
    padding: 10,
  },
  pressbutt: {
    height: 50,
    borderRadius: 8,
    marginTop: 20,
    width: "50%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212529",
  },
  pressbutt1: {
    height: 50,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CDC9C3",
  },
  adviceContainer: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
