import React, { useState } from "react";
import styles from "../../style";
import Ionic from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView, Pressable, Image, Alert } from "react-native";

//Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartAction";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

const Aliment = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [aliment, setAliment] = useState(route.params.aliment);
  const onPressFunction2 = () => {
    Alert.alert("Djipota", "Voulez-vous ajouter ce produit à votre panier?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Ajouter",
        onPress: () => {
          dispatch(addToCart({ ...aliment, id: route.params.id }));
          toast.show("DJIPOTA", {
            type: "custom_toast",
            placement: "top",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
            data: {
              title: "Produit ajouté au panier ✨",
            },
          });
        },
      },
    ]);
  };

  const { img, price, description, nameSeller, kilogram, product } = aliment;

  return (
    <View style={styles.containerrr}>
      <ScrollView style={{ width: "100%", marginHorizontal: 2, padding: 15 }}>
        <View style={styles.headerr}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionic name="arrow-back-outline" size="34" colour="black" />
          </Pressable>
          <Text style={{ fontSize: 22 }}>Detail</Text>
          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Ionic name="basket-outline" size="34" colour="black" />
          </Pressable>
        </View>
        <View style={styles.wimg}>
          <Image
            source={{ uri: img }}
            style={{ width: "60%", height: "60%" }}
          />
        </View>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>{product}</Text>
        <Text style={{ fontSize: 18 }}>{price} CFA</Text>
        <View
          style={{
            width: "100%",
            marginVertical: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 28 }}>{kilogram} KG</Text>
        </View>
        <Text style={{ fontSize: 22, marginRight: 5, marginBottom: 10 }}>
          Description
        </Text>
        <Text>Vendeur: {nameSeller}</Text>

        <Text style={{ fontSize: 18 }}>{description}</Text>
      </ScrollView>
      <Pressable onPress={onPressFunction2} style={styles.pressbutt}>
        <Text style={{ fontSize: 16, color: "white" }}>Ajouter au panier</Text>
      </Pressable>
    </View>
  );
};
export default Aliment;
