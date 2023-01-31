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
  ActivityIndicator,
  Alert,
} from "react-native";

import FilterModal from "./FilterModal";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions/productsAction";
import { addToCart } from "../../store/actions/cartAction";

const Product = ({ product, navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addProductToCart = (product) => {
    Alert.alert("Djipota", "Voulez-vous ajouter ce produit à votre panier?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Ajouter",
        onPress: () => {
          dispatch(addToCart(product));
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

  const { id, name, price, img, nameSeller } = product;
  return (
    <View style={styles.card3}>
      <Pressable
        onPress={() =>
          navigation.navigate("Aliment", {
            id,
            aliment: product,
          })
        }
      >
        <Image
          source={{ uri: img }}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
        />
      </Pressable>
      <Text style={{ fontSize: 20, color: "black" }}>{name}</Text>
      <View style={styles.bottom2}>
        <View>
          <Text style={{ color: "black" }}>{price} FCFA</Text>
          <Text>l'unité</Text>
          <Text>Vendeur: {nameSeller}</Text>
        </View>

        <Pressable
          style={styles.circle}
          onPress={() => addProductToCart(product)}
        >
          <Ionic name="add-outline" size="22" color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const Product2 = ({ product2, navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addProductToCart = (product) => {
    Alert.alert("Djipota", "Voulez-vous ajouter ce produit à votre panier?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Ajouter",
        onPress: () => {
          dispatch(addToCart(product));
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

  const { id, name, price, img, product, quantity, kilogram, nameSeller } =
    product2;
  return (
    <View style={styles.card3}>
      <Pressable
        onPress={() =>
          navigation.navigate("Aliment", {
            id: id,
            aliment: product2,
          })
        }
      >
        <Image
          source={{ uri: img }}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
        />
      </Pressable>
      <Text style={{ fontSize: 20, color: "black" }}>{product}</Text>
      <View style={styles.bottom2}>
        <View>
          <Text style={{ color: "black" }}>{price} FCFA</Text>
          <Text style={{ color: "black" }}>{kilogram} KG</Text>
        </View>
        <Pressable
          style={styles.circle}
          onPress={() => {
            addProductToCart(product);
          }}
        >
          <Ionic name="add-outline" size="22" color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const Market = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);

  // State for showing Activity indicator during loading data
  const [isLoading, setIsLoading] = React.useState(false);

  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [data, setData] = useState([
    {
      id: "1",
      title: "All",
    },
  ]);
  const [dataProducts, setDataProducts] = React.useState(null);

  // Search state
  const [isSearching, setIsSearching] = React.useState(false);
  /// Filter
  const [isFilterVisible, setFilterVisible] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState([0, 10000]);

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

  const getPro = async () => {
    setIsLoading(true);
    const dat = await getDocs(collection(db, "product"));
    setData(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  const handleSearch = (textSearch, arrayProducts) => {
    const newArr = arrayProducts.filter((product) =>
      product?.product?.toLowerCase().includes(textSearch.toLowerCase())
    );

    return newArr.filter(
      (product) =>
        product.price >= filterValue[0] && product.price <= filterValue[1]
    );
  };

  useEffect(() => {
    if (search?.length > 0) {
      setIsLoading(true);
      setIsSearching(true);
      const dataFiltered = handleSearch(search, products);
      setData(null);
      setDataProducts(dataFiltered);
      setIsLoading(false);
    } else {
      setIsSearching(false);
      setDataProducts(products);
    }
  }, [search]);

  const onApply = () => {
    const dataFiltered = handleSearch(search, products);
    setData(null);
    setDataProducts(dataFiltered);
  };

  const getListProd = async () => {
    setIsLoading(true);
    if (!products?.length) {
      dispatch(getProducts(list));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPro();
    getListProd();
  }, []);

  useEffect(() => {
    setDataProducts(products);
  }, [products]);

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
      <View style={styles.header2}>
        <Pressable
          onPress={() => {
            navigation.navigate("Accueil");
          }}
        >
          <Ionic name="arrow-back-outline" size="32" colour="black" />
        </Pressable>
        <Text style={{ fontSize: 22 }}>Marketplace</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
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
          <Pressable
            onPress={() => {
              if (search?.length > 0) {
                setFilterVisible(true);
              }
            }}
          >
            <Ionic name="options-outline" size="22" colour="black" />
          </Pressable>
        </View>
      </View>
      {isSearching ? (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, marginVertical: 10 }}>
            Résultats pour {`"${search}"`}
          </Text>

          <View>
            <FlatList
              numColumns={2}
              data={dataProducts}
              renderItem={({ item }) => (
                <Product2 product2={item} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          {isFilterVisible === true ? (
            <FilterModal
              isVisible={isFilterVisible}
              setIsVisible={setFilterVisible}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              onApply={onApply}
            />
          ) : null}
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <>
                <View style={styles.bloc1}>
                  <Text style={{ fontSize: 24, marginVertical: 10 }}>
                    Produit populaire
                  </Text>
                  <View style={styles.containerBox}>
                    <FlatList
                      numColumns={2}
                      data={dataProducts}
                      renderItem={({ item }) => (
                        <Product product={item} navigation={navigation} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
                <View style={styles.bloc1}>
                  <Text style={{ fontSize: 24, marginVertical: 10 }}>
                    Nos produits
                  </Text>
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
                      data={dataProducts}
                      renderItem={({ item }) => (
                        <Product2 product2={item} navigation={navigation} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Market;
