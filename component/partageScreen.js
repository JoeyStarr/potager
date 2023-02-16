import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../style";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  Modal,
  FlatList,
} from "react-native";

// Redux
import { useDispatch } from "react-redux";
import { getProducts } from "../store/actions/productsAction";

// THeme
import { SIZES, FONTS, COLORS } from "../style/theme";

// Firebase
import { getCommandsBySeller } from "../firebase/commandCalls";

const Item = ({ item, delfunction, navigation }) => (
  <View style={styles.boxLine}>
    <Pressable
      onPress={() =>
        navigation.navigate("Detail", {
          itemId: item.id,
        })
      }
    >
      <View style={styles.line}>
        <View>
          <Text style={{ fontSize: 14 }}>{item.product}</Text>
          <Text style={{ fontSize: 14 }}>{item.price} CFA</Text>
          <Text style={{ fontSize: 14 }}>
            {item.name} {item.prename}
          </Text>
          <Text style={{ fontSize: 14 }}>{item.location}</Text>
          <Text style={{ fontSize: 14 }}>{item.number}</Text>
        </View>

        <Pressable onPress={() => delfunction(item.id)}>
          <Ionic name="trash-outline" size={38} color="black" />
        </Pressable>
      </View>
    </Pressable>
  </View>
);

const Partage = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const uid = auth.currentUser.uid;

  // STATE
  // STATE FOR COMMANDS
  const [commands, setCommands] = useState(null);

  const [produit, setProduit] = useState("");
  const [kilo, setKilo] = useState();
  const [desc, setDescrp] = useState("");
  const [mage, setMage] = useState("");
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [globalPrice, setGlobalPrice] = useState(0);

  const [dat, setDat] = useState([]);
  const [tabs, setTabs] = useState([]);

  const [prix, setPrix] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const getComm = async () => {
    const dat = await getCommandsBySeller(uid);
    console.log(data);
    //setDat(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const setInTabs = async (dat) => {
    const donne = dat.filter((doc) => doc.idSeller === uid);
    setTabs(donne);
  };

  // FUNCTIONS
  const reset = () => {
    setPrix(null);
    setProduit("");
    setKilo(null);
    setDescrp("");
  };

  const onPressFunction2 = async () => {
    if (produit !== "" && prix !== "" && desc !== "") {
      try {
        const docRef = await addDoc(collection(db, "offer"), {
          idSeller: uid,
          img: mage,
          price: prix,
          description: desc,
          product: produit,
          kilogram: kilo,
        });
        console.log("Document written with ID: ", docRef.id);
        dispatch(getProducts());
        reset();
        setModalVisible2(true);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else return;
  };

  const getProd = async () => {
    const dat = await getDocs(collection(db, "listProduct"));
    setData(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const setInTable = async (data) => {
    setTable(data.map((doc) => doc.nameProduct));
  };

  const findertaker = (val) => {
    const result = data.find((obj) => {
      return obj.nameProduct === val;
    });
    setMage(result.imgProduct);
  };

  const delfunction = (idtem) => {
    const docRef = doc(db, "command", idtem);
    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch(() => {
        console.log(error);
      });
  };

  const getCommands = async () => {
    const datas = await getCommandsBySeller(uid);

    setCommands(datas);

    let priceFinal = 0;
    datas.forEach((el) => {
      priceFinal += parseInt(el.price);
    });
    setGlobalPrice(priceFinal);
  };

  // HOOKS
  /// USEEFFECT
  useEffect(() => {
    getComm();
  }, []);

  useEffect(() => {
    setInTabs(dat);
  }, [dat]);

  useEffect(() => {
    getProd();
  }, []);

  useEffect(() => {
    setInTable(data);
  }, [data]);

  useEffect(() => {
    getCommands();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        delfunction={delfunction}
        navigation={navigation}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };
  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.navigate("Accueil");
          }}
        >
          <Ionic name="arrow-back-outline" size={28} colour="black" />
        </Pressable>
        <Text style={{ fontSize: 22 }}>Publier une offre d'achat</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            source={require("../assets/box.png")}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Fermez</Text>
              </Pressable>

              <View
                style={{
                  width: "100%",
                  marginVertical: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text style={{ ...FONTS.body3 }}>
                    Nombre de Commande Reçu :
                  </Text>

                  <Text style={{ ...FONTS.h2, marginVertical: 10 }}>
                    {commands?.length < 10
                      ? `0${commands?.length}`
                      : commands?.length}{" "}
                    Commandes
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  marginVertical: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text style={{ ...FONTS.body3 }}>Montant à recevoir :</Text>

                  <Text style={{ ...FONTS.h2, marginVertical: 10 }}>
                    {globalPrice} Fcfa
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible2(!modalVisible2);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView2}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible2(!modalVisible2)}
              >
                <Text style={styles.textStyle}>Fermez</Text>
              </Pressable>
              <View>
                <Ionic name="arrow-back-outline" size={28} colour="black" />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "green",
                  marginVertical: "2%",
                  marginTop: 10,
                }}
              >
                Offre publier avec succès
              </Text>
            </View>
          </View>
        </Modal>
        <SelectDropdown
          labelId="option"
          data={table}
          onSelect={(selectedItem, index) => {
            setProduit(selectedItem);
            findertaker(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantité"
          placeholderTextColor="#FFFFFF"
          onChangeText={(text) => setKilo(text)}
          keyboardType="numeric"
          value={kilo}
        />
        <TextInput
          style={styles.input}
          placeholder="Prix"
          placeholderTextColor="#FFFFFF"
          onChangeText={setPrix}
          keyboardType="numeric"
          value={prix}
        />
        <TextInput
          style={styles.input}
          placeholder="Ajouter une description"
          placeholderTextColor="#FFFFFF"
          onChangeText={setDescrp}
          keyboardType="text"
          value={desc}
        />

        <Pressable
          disabled={produit !== "" ? false : true}
          onPress={onPressFunction2}
          style={styles.pressbutt}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Partage;
