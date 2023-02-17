import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../style/theme";
import Ionic from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { removeFromCart } from "../../store/actions/cartAction";

const Validate = ({ isVisible, setIsVisible, navigation }) => {
  const dispatch = useDispatch();
  const countCart = useSelector((store) => store.cart.length);
  const cart = useSelector((store) => store.cart);

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  const [name, setName] = React.useState("");
  const [prename, setPrename] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const createCommand = async (item) => {
    console.log(item)
    setIsSending(true);
    const mail = getAuth().currentUser.email
    try {
      const commandRef = await addDoc(collection(db, "command"), {
        email: mail,
        idSeller: item?.idSeller,
        location: location,
        name: name,
        number: number,
        prename: prename,
        price: item?.price,
        kilogram: item?.kilogram,
        product: item?.product,
      });
      setName("");
      setPrename("");
      setNumber("");
      setLocation("");
      console.log("Command added");
      setIsSending(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const validateCommand = () => {
    cart.forEach((item) => {
      createCommand(item);
      dispatch(removeFromCart(item?.id));
    });
    setIsVisible(false);

    navigation.replace("Market");
  };

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onclose());
    }
  }, [isVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.bg}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            backgroundColor: "white",
          }}
        >
          {/* HEADER */}
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Veuillez compléter vos infos
            </Text>

            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
              <Ionic name="close" size={30} />
            </TouchableWithoutFeedback>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            <View>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.label}>Prénom(s)</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setPrename(text)}
                />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.label}>Numéro de téléphone</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setNumber(text)}
                />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.label}>Adresse de livraison</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setLocation(text)}
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={{ ...FONTS.body3, paddingBottom: 30 }}>
                Votre panier contient {countCart} produits
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primaryColor,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                disabled={
                  name === "" && prename === "" && number === "" ? true : false
                }
                onPress={() => validateCommand()}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    marginHorizontal: 10,
                  }}
                >
                  Valider
                </Text>
                {isSending ? <ActivityIndicator /> : null}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Validate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    height: "100%",
    width: "100%",
  },
  bg: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },
  label: {
    ...FONTS.body3,
  },
  textInput: {
    height: 50,
    padding: 10,
    backgroundColor: COLORS.grayLight,
    fontSize: 17,
    borderRadius: 10,
  },
  bottomContainer: {
    height: 20,
    width: "100%",
    marginVertical: 50,
  },
});
