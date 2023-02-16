import React, { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
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
  Platform,
} from "react-native";

// STYLES
import { COLORS, FONTS, SIZES } from "../../style/theme";

// Toast
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Advice Calls
import { getAllAdvices, deleteAdvice } from "../../firebase/adviceCalls";
const CmdForUser = ({ navigation, route }) => {
  const [advices, setAdvices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const getAllAdvices = async () => {
    setIsLoading(true);

    const ownerId = route.params.owner;
    const advices = collection(db, "command");

    const q = query(advices);
    const querySnapshot = await getDocs(q);

    let datas = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().idSeller == ownerId) {
        const newData = { ...doc.data(), ref: doc.id };
        datas.push(newData);
      }
    });
    setIsLoading(false);

    return datas;
  };

  useEffect(() => {
    if (advices == null) {
      getAllAdvices().then((data) => {
        setAdvices(data);
      });
    }
  }, []);

  function removeAdvice(item) {
    const docRef = doc(db, "command", item.id);

    Alert.alert("Administration", "Voulez-vous supprimer cette commande ?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          deleteDoc(docRef)
            .then(() => {
              console.log("Entire Document has been deleted successfully.");
            })
            .catch(() => {
              console.log(error);
            });

          getProd();
          setIsLoading(false);
          toast.show("DJIPOTA", {
            type: "custom_toast",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
            data: {
              title: "Commande supprimé ✨",
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
        <Pressable onPress={() => navigation.navigate("Command")}>
          <Ionic name="arrow-back-outline" size={38} color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>
          Liste des commandes
        </Text>
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
              {advices?.length ? (
                advices?.map((advice) =>
                  renderAdvice({ advice, onPress: () => removeAdvice(advice) })
                )
              ) : (
                <View style={{ height: 200, justifyContent: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Aucune commande
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
      {advices?.length ? (
        <View
          style={{
            borderWidth: 1,
            width: "100%",
            padding: SIZES.padding,
            backgroundColor: COLORS.primaryColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
            }}
          >
            Prix Total :
          </Text>

          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.white,
              marginVertical: 20,
            }}
          >
            35.000 Fcfa
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const renderAdvice = ({ advice, onPress }) => {
  return (
    <View key={advice.ref} style={styles.adviceContainer}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.prename} {advice.name}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.location}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.number}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.product}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.price}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
          }}
        >
          {advice.email.slice(0, 40) + "..."}
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
export default CmdForUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    marginTop: Platform.OS === "ios" ? 35 : 20,
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
