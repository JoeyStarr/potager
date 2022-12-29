import React, { useState, useEffect } from "react";
import styles from "../style";
import { db } from "../config/firebase";
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
import { async } from "@firebase/util";

const Product = ({ product }) => {
  const { id, name, price } = product;
  return (
    <View style={styles.card3}>
      <Pressable>
        <Image
          source={require("../assets/tomato.png")}
          style={{ width: 150, height: 150 }}
        />
      </Pressable>
      <Text style={{ fontSize: 20, color: "black" }}>{name}</Text>
      <View style={styles.bottom2}>
        <View>
          <Text style={{ color: "black" }}>{price} FCA</Text>
          <Text>l'unité</Text>
        </View>
        <Pressable style={styles.circle}>
          <Ionic name="add-outline" size="22" color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const Product2 = ({ product2 }) => {
  const { id, name, price, img, product, quantity } = product2;
  return (
    <View style={styles.card3}>
      <Pressable>
        <Image
          source={{uri:img}}
          style={{ width: 150, height: 150 }}
        />
      </Pressable>
      <Text style={{ fontSize: 20, color: "black" }}>{name}</Text>
      <View style={styles.bottom2}>
        <View>
          <Text style={{ color: "black" }}>{price} FCA</Text>
          <Text>l'unité</Text>
        </View>
        <Pressable style={styles.circle}>
          <Ionic name="add-outline" size="22" color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [list,setList] = useState([])
  const [data,setData] = useState([{
    "id": "1",
    "title": "All",
  }])

  const DATA = [
    {
      id: "1",
      title: "All",
    },
    {
      id: "2",
      title: "Tomate",
    },
    {
      id: "3",
      title: "Salade",
    },
    {
      id: "4",
      title: "Soja",
    },
  ];

  const DATA1 = [
    {
      id: "1",
      title: "All",
    },
    {
      id: "2",
      title: "Tomate",
    },
  ];

  const DATA2 = [
    {
      id: "1",
      name: "Tomate",
      price: "220",
    },
    {
      id: "2",
      name: "Salade",
      price: "160",
    },
    {
      id: "3",
      name: "Soja",
      price: "360",
    },
    {
      id: "4",
      name: "Blé",
      price: "100",
    },
    {
      id: "5",
      name: "Soja",
      price: "360",
    },
    {
      id: "6",
      name: "Blé",
      price: "100",
    },
  ];

  useEffect(() => {
    const getPro = async() =>{
      const dat = await getDocs(collection(db,"product"))
      setData(dat.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getPro()

    const getListProd = async() =>{
      const dat = await getDocs(collection(db,"offer"))
      setList(dat.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getListProd()
    console.log(list)
  },[])

  console.log(data)

  const Item = ({ title }) => (
    <View style={styles.row}>
      <Text style={{ fontSize: 18, marginHorizontal: 40 }}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item?.name} />;

  const renderItem2 = ({ item }) => (
    <View>
      <Item2 name={item?.name} price={item?.price} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container3}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header2}>
          <Pressable
            onPress={() => {
              navigation.navigate("Accueil");
            }}
          >
            <Ionic name="arrow-back-outline" size="32" colour="black" />
          </Pressable>
          <Text style={{ fontSize: 22 }}>Marketplace</Text>
          <Pressable>
            <Ionic name="basket-outline" size="32" colour="black" />
          </Pressable>
        </View>
        <View style={styles.conteneurSearchBar}>
          <View style={styles.searchBar}>
            <Ionic name="search-outline" size="22" colour="black" />
            <TextInput
              style={styles.input2}
              placeholder="Search"
              placeholderTextColor="#FFFFFF"
              onChangeText={setSearch}
              value={search}
            />
            <Pressable>
              <Ionic name="options-outline" size="22" colour="black" />
            </Pressable>
          </View>
        </View>
        <View style={styles.bloc1}>
          <Text style={{ fontSize: 24, marginVertical: 10 }}>
            Produit populaire
          </Text>
          <View style={styles.containerBox}>
            <FlatList
              numColumns={2}
              data={DATA1}
              renderItem={({ item }) => <Product product={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={styles.bloc1}>
          <Text style={{ fontSize: 24, marginVertical: 10 }}>Nos produits</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
          <View>
            <FlatList
              numColumns={2}
              data={list}
              renderItem={({ item }) => <Product2 product2={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Marketplace;
