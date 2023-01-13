import React, { useState, useEffect } from "react";
import styles from "../../style";
import { db } from "../../config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
  const docId = route.params.id

  const [aliment,setAliment] = useState({})
  const onPressFunction2= () => {

  }
  useEffect(() =>{
    const docRef = doc(db,'offer',docId)
    getDoc(docRef)
      .then((doc) => {
        setAliment(doc.data(),doc.id)
      })
  },[])

  console.log(aliment)

  return (
    <View style={styles.containerrr}>
      <ScrollView style={{width:'100%',marginHorizontal:2,padding:15}}>
      <View style={styles.headerr}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionic name="arrow-back-outline" size="34" colour="black" />
        </Pressable>
        <Text style={{ fontSize: 22 }}>Detail</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionic name="basket-outline" size="34" colour="black" />
        </Pressable>
      </View>
        <View style={styles.wimg}>
          <Image source={{ uri : aliment.img }} style={{width:'60%',height:'60%'}}/>
        </View>
        <Text style={{fontSize:28,fontWeight:'400'}}>{aliment.product}</Text>
        <Text style={{fontSize:18}}>{aliment.price} CFA</Text>
        <View style={{width:'100%',marginVertical:5,alignItems
      :'center',justifyContent:'center'}}>
          <Text style={{fontSize:28}}>{aliment.kilogram} KG</Text>
        </View>
        <Text style={{fontSize:22,marginRight:5,marginBottom:10}}>Description</Text>
        <Text style={{fontSize:18}}>{aliment.description}</Text>
      </ScrollView>
      <Pressable onPress={onPressFunction2} style={styles.pressbutt}>
          <Text style={{ fontSize: 16, color: "white" }}>Ajouter au panier</Text>
      </Pressable>
    </View>
  );
};
export default Aliment;
