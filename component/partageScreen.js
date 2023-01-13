import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../style";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Redux
import { useDispatch } from "react-redux";
import { getProducts } from "../store/actions/productsAction";

const Partage = ({ navigation }) => {
  const dispatch = useDispatch();

  const [produit, setProduit] = useState("");
  const [kilo, setKilo] = useState();
  const [desc, setDescrp] = useState("");
  const [mage, setMage] = useState("");
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [prix, setPrix] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const reset = () => {
    setPrix(null);
    setProduit("");
    setKilo(null);
    setDescrp("");
  };

  const Item = ({ id, title }) => (
    <View style={styles.item}>
      <View style={styles.it1}>
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable
        style={styles.it2}
        onPress={() => {
          navigation.navigate("Accueil");
        }}
      >
        <Ionic name="close-circle-outline" size="28" colour="black" />
      </Pressable>
    </View>
  );

  const onPressFunction2 = async () => {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
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

  useEffect(() => {
    getProd();
  }, []);
  useEffect(() => {
    setInTable(data);
  }, [data]);

  const findertaker = (val) => {
    const result = data.find((obj) => {
      return obj.nameProduct === val;
    });
    setMage(result.imgProduct);
    console.log(mage);
  };

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad5edeb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbezffzf97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145jkjkl29d72",
      title: "Third Item",
    },
  ];

  const renderItem = ({ item }) => <Item id={item?.id} title={item?.title} />;

  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.navigate("Accueil");
          }}
        >
          <Ionic name="arrow-back-outline" size="28" colour="black" />
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Fermez</Text>
              </Pressable>
              <FlatList
                data={DATA}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => renderItem({ item })}
              />
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
                <Ionic name="arrow-back-outline" size="28" colour="black" />
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
            console.log(produit);
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
