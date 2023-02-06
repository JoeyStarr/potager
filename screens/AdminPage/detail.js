import React, { useState,useEffect } from "react";
import styles from "../../style";
import Ionic from "react-native-vector-icons/Ionicons";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { collection, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { Text, View, ScrollView, Pressable, Image, Alert } from "react-native";

//Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartAction";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

const Details = ({ route, navigation }) => {
  const [data,setData] = useState([])
  const dispatch = useDispatch();
  const toast = useToast();

  const [aliment, setAliment] = useState(route.params.itemId);
  const onPressFunction2 = (id) =>
  Alert.alert('Alert Title', 'My Alert Msg', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: async() => await deleteDoc(doc(db, "offer", id))},
  ]);


    const getProd = async (aliment) => {
        const docRef = doc(db, "offer",aliment);
        try {
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
        } catch(error) {
            console.log(error)
        }
        
    };
    useEffect(() => {
        getProd(aliment);
    }, []);
    console.log(data)
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
            source={{ uri: data.img }}
            style={{ width: "60%", height: "60%" }}
          />
        </View>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>{data.product}</Text>
        <Text style={{ fontSize: 18 }}>{data.price} CFA</Text>
        <View
          style={{
            width: "100%",
            marginVertical: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 28 }}>{data.kilogram} KG</Text>
        </View>
        <Text style={{ fontSize: 22, marginRight: 5, marginBottom: 10 }}>
          Description
        </Text>
        <Text>Vendeur: {data.nameSeller}</Text>

        <Text style={{ fontSize: 18 }}>{data.description}</Text>
      </ScrollView>
      <Pressable onPress={onPressFunction2(aliment)} style={styles.pressbutt}>
        <Text style={{ fontSize: 16, color: "white" }}>Supprimer</Text>
      </Pressable>
    </View>
  );
};
export default Details;
