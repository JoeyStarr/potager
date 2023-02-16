import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import styles from "../../style";
import Ionic from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/actions/cartAction";

import { SIZES, FONTS, COLORS } from "../../style/theme";
import Validate from "./Validate";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

const Cart = ({ navigation }) => {
  const cart = useSelector((store) => store.cart);
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          height: SIZES.height,
        }}
      >
        <View style={subStyles.headerr}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionic name="arrow-back-outline" size={34} colour="black" />
          </Pressable>
          <Text style={{ fontSize: 22 }}>Mon Panier</Text>

          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <Ionic name="basket-outline" size={32} colour="black" />
            </Pressable>

            <View style={subStyles.cartBubble}>
              <Text style={{ color: "white" }}>{cart.length}</Text>
            </View>
          </View>
        </View>

        {cart?.length ? (
          <>
            <ScrollView
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: 5,
                marginVertical: 10,
              }}
            >
              {cart?.map((item) => cartItem({ item }))}
            </ScrollView>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={subStyles.btn}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: "white",
                  }}
                >
                  Valider mon panier
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ ...FONTS.body1, color: COLORS.grayLight }}>
              Panier vide
            </Text>
          </View>
        )}
      </View>

      {isVisible ? (
        <Validate
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          navigation={navigation}
        />
      ) : null}
    </>
  );
};

const cartItem = ({ item }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const increment = () => {
    dispatch(incrementQuantity(item.id));
  };

  const decrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  const remove = () => {
    Alert.alert(
      "DJIPOTA",
      "Voulez-vous supprimer cet article de votre panier?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => {
            dispatch(removeFromCart(item.id));
            toast.show("DJIPOTA", {
              type: "custom_toast",
              placement: "top",
              duration: 3000,
              offset: 30,
              animationType: "slide-in",
              data: {
                title: "Produit rétiré du panier ✨",
              },
            });
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity key={item?.id} style={subStyles.cartItem}>
      <View style={subStyles.cartItem__Img}>
        <Image
          source={{ uri: item?.img }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ padding: 10, flex: 1 }}>
        <Text
          style={{
            ...FONTS.body2,
          }}
        >
          {item?.product}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {item?.price} Fcfa
        </Text>
      </View>

      <View style={subStyles.cartItem__btns}>
        {/*  <TouchableOpacity
          style={{
            borderRadius: 10,
            justifyContent: "center",
            aliginItems: "center",
          }}
          onPress={() => increment()}
        >
          <Ionic name="add" size={24} color="black" />
        </TouchableOpacity>
        <Text>{item?.quantity}</Text>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            justifyContent: "center",
            aliginItems: "center",
          }}
          onPress={() => decrement()}
        >
          <Ionic name="remove-outline" size={24} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 70,
            justifyContent: "center",
            aliginItems: "center",
            backgroundColor: "black",
            marginHorizontal: 10,
          }}
          onPress={remove}
        >
          <Ionic
            name="trash-outline"
            size={18}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const subStyles = StyleSheet.create({
  cartItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cartItem__Img: {
    height: 80,
    width: 80,
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
  cartItem__btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerr: {
    marginTop: Platform.OS === "ios" ? 60 : 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "white",
  },
  btn: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 15,
    marginVertical: 10,
  },
  cartBubble: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: -10,
    right: -7,
    backgroundColor: "black",
  },
});
