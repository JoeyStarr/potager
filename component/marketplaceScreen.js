import React, { useState, useEffect } from "react";
import styles from "../style";
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

const Product = ({ product }) => {
  console.log(product);
  const { id, name, price } = product;
  console.log(name);
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

const Marketplace = () => {
  const [search, setSearch] = useState("");

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

  const Item = ({ title }) => (
    <View style={styles.row}>
      <Text style={{ fontSize: 18, marginHorizontal: 40 }}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item?.title} />;

  const renderItem2 = ({ item }) => (
    <View>
<<<<<<< HEAD
      <Item2 name={item.name} price={item.price} />
=======
      <Item2 name={item?.name} price={item?.price} />
>>>>>>> old-state
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
            data={DATA}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
          <View>
            <FlatList
              numColumns={2}
              data={DATA2}
              renderItem={({ item }) => <Product product={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Marketplace;
