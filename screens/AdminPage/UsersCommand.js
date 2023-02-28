import React, { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// STYLES
import { COLORS, FONTS, SIZES } from "../../style/theme";

// Toast
import { useToast } from "react-native-toast-notifications";

import Slider from "@react-native-community/slider";
import { number } from "prop-types";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Command = ({ navigation }) => {
  const [advices, setAdvices] = useState(null);
  const [donne, setDonne] = useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([{}]);
  const [dataProducts, setDataProducts] = React.useState(null);

  // Search state
  const [isSearching, setIsSearching] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  //filter commande
  const [nm, setNm] = useState(null);
  const [filterSelected, setFilterSelected] = useState(0);
  //

  const [range, setRange] = useState("50%");
  const [sliding, setSliding] = useState("Inactive");
  const [sliceNumber, setSliceNumber] = useState(dataProducts?.length);

  const [taille, setTaille] = useState(null);
  const toast = useToast();

  const getAllAdvices = async () => {
    const advices = collection(db, "potager");
    const donnees = collection(db, "command");

    const q = query(advices);
    const querySnapshot = await getDocs(q);

    const p = query(donnees);
    const querySnapshot1 = await getDocs(p);

    let datas = [];
    querySnapshot.forEach((doc) => {
      let num = 0;
      querySnapshot1.forEach((dc) => {
        if (dc.data().idSeller === doc.data().owner) {
          num++;
        }
      });
      const newData = { ...doc.data(), ref: doc.id, number: num };
      datas.push(newData);
    });

    return datas;
  };

  const getAllDonne = async () => {
    const advices = collection(db, "command");

    const q = query(advices);
    const querySnapshot = await getDocs(q);

    let datas = [];
    querySnapshot.forEach((doc) => {
      const newData = { ...doc.data(), ref: doc.id };
      datas.push(newData);
    });

    return datas;
  };

  const handleSearch = (textSearch, arrayProducts) => {
    const newArr = arrayProducts.filter((product) =>
      product?.PropioNom?.toLowerCase().includes(textSearch.toLowerCase())
    );
    return newArr;
  };

  const onApply = () => {
    const dataFiltered = handleSearch(search, advices);
    setData(null);
    setDataProducts(dataFiltered);
  };

  const option = () => {
    setTaille(advices.length);
    setRange(dataProducts.length);

    setModalVisible(true);
  };

  // FILTRE PAR NOMBRE DE COMMANDES
  const filters = [
    {
      id: 1,
      text: "10",
      value: 10,
    },
    {
      id: 2,
      text: "20",
      value: 20,
    },
    {
      id: 3,
      text: "30",
      value: 30,
    },
    {
      id: 4,
      text: "50+",
      value: 50,
    },
  ];

  const slicer = () => {
    if (sliceNumber === dataProducts?.length) {
      setDataProducts(dataProducts && [...dataProducts]);
    } else {
      setDataProducts([...advices].slice(0, sliceNumber));
    }
  };

  const filterCommandsByNumber = (number, idx) => {
    let min;

    switch (number) {
      case 10:
        min = 0;
        break;

      case 20:
        min = 10;
        break;

      case 30:
        min = 20;
        break;

      case 50:
        min = 30;
        break;

      default:
        break;
    }
    Alert.alert("Djipota", "Voulez-vous appliquer ce filtre?", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Oui",
        onPress: () => {
          setFilterSelected(idx);
          setNm(number);

          const dataToSend = [...dataProducts].filter(
            (item) => item?.number >= min && item?.number <= number
          );

          const dataMax = [...dataProducts].filter(
            (item) => item?.number >= 50
          );

          if (number === 50) {
            setDataProducts(dataMax);
          } else {
            setDataProducts(dataToSend);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (search?.length > 0) {
      setIsLoading(true);
      setIsSearching(true);
      const dataFiltered = handleSearch(search, advices);
      setData(null);
      setDataProducts(dataFiltered);
      setIsLoading(false);
    } else {
      setIsSearching(false);
      setDataProducts(advices);
    }
  }, [search]);

  useEffect(() => {
    setDataProducts(advices);
  }, [advices]);

  useEffect(() => {
    slicer();
  }, [sliceNumber]);

  useEffect(() => {
    if (dataProducts == null) {
      getAllAdvices().then((data) => {
        setAdvices(data);
        setTaille(data.length);
      });
      getAllDonne().then((data) => {
        setDonne(data);
      });
    }
  }, []);

  /*
  useEffect(() => {
    console.log("okk",advices)
    let newtab = advices.forEach((product) => {
      if(product.number === nm){
        return product.data()
      }
    })
    if(newtab.length !== null){
      setAdvices(newtab)
    }
  },[nm])
  */

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size="38" color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>
          Liste des utilisateurs
        </Text>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size="38" color="#F5F5F5" />
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
            /*
            onPress={() => {
              if (search?.length > 0) {
                setFilterVisible(true);
              }
            }}
            */
            onPress={option}
          >
            <Ionic name="options-outline" size="22" colour="black" />
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
            <Text style={styles.modalText}>Filter</Text>
            <Text>Value : {range}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>1</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={1}
                maximumValue={taille}
                minimumTrackTintColor="tomato"
                maximumTrackTintColor="#000"
                thumbTintColor="tomato"
                value={range}
                step={1}
                onValueChange={(value) => setRange(parseInt(value))}
                onSlidingStart={() => setSliding("Sliding")}
                onSlidingComplete={(val) => setSliceNumber(val)}
              />
              <Text>{taille}</Text>
            </View>
            <Text style={styles.modalText}>Filter par nombre de commande</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {filters?.map((item) => (
                <Pressable
                  key={item.id}
                  disabled={filterSelected === item.id}
                  style={[
                    styles.bull,
                    {
                      backgroundColor:
                        filterSelected === item.id ? "black" : "white",
                    },
                  ]}
                  onPress={() => {
                    filterCommandsByNumber(item.value, item.id);
                  }}
                >
                  <Text
                    style={{
                      color: filterSelected === item.id ? "white" : "black",
                    }}
                  >
                    {item.text}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  marginVertical: 25,
                  padding: 20,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primaryColor,
                }}
                onPress={() => {
                  setFilterSelected(0);
                  setDataProducts(advices);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                  }}
                >
                  Réinitialiser
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              {dataProducts?.map((advice) =>
                renderAdvice({ advice, navigation })
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const renderAdvice = ({ advice, navigation }) => {
  return (
    <View key={advice.ref} style={styles.adviceContainer}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.ProprioPrenom} {advice.PropioNom}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.hashPota}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {advice.PropioNum}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
          }}
        >
          {advice.PropioEmail.slice(0, 40) + "..."}
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
        onPress={() =>
          navigation.navigate("Foruser", {
            owner: advice.owner,
          })
        }
      >
        <Ionic name="basket-outline" size="25" color="white" />
        <View style={styles.cartBubble}>
          <Text style={{ color: "black" }}>{advice.number}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Command;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    marginTop: StatusBar.currentHeight + 35,
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
  conteneurSearchBar: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    backgroundColor: "#F4F3F3",
  },
  input2: {
    height: 50,
    width: "80%",
    margin: 12,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#F4F3F3",
    color: "grey",
    borderRadius: 8,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 20,
    width: "100%",
    height: "60%",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 22,
    textAlign: "center",
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
    backgroundColor: "white",
  },
  bull: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    borderColor: "black",
  },
});
