import React, { useState, useEffect } from "react";
import styles from "../../style";
import { db } from "../../config/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  FlatList,
  VirtualizedList,
} from "react-native";

const Aliment = ({ route,navigation }) => {
  console.log(route.params.id)
  return (
    <View style={styles.containerrr}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionic name="arrow-back-outline" size="28" colour="black" />
        </Pressable>
        <Text style={{ fontSize: 22 }}>Publier une offre d'achat</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            source={require("../../assets/box.png")}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default Aliment;
