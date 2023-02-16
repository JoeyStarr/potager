import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  TextInput,
  Modal,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";

// Redux
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/actions/productsAction";
import { uploadString } from "firebase/storage";
import { async } from "@firebase/util";
import SelectDropdown from "react-native-select-dropdown";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreaOffer = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [kilo, setKilo] = useState();
  const [mage, setMage] = useState("");
  const [desc, setDescrp] = useState("");
  const [prix, setPrix] = useState(null);
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [produit, setProduit] = useState("");

  const reset = () => {
    setMage("");
    setName("");
    setPrix(null);
    setProduit("");
    setKilo(null);
    setDescrp("");
  };

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
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else return;
    reset();
  };

  const getProd = async () => {
    const dat = await getDocs(collection(db, "listAdmin"));
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

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size={38} color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>Retour</Text>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size={38} color="#F5F5F5" />
        </Pressable>
      </View>
      <View style={styles.body}>
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
          placeholder="nom du produit"
          placeholderTextColor="#FFFFFF"
          onChangeText={(name) => setName(name)}
          value={name}
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
          disabled={name !== "" ? false : true}
          onPress={onPressFunction2}
          style={styles.pressbutt}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreaOffer;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 35,
    backgroundColor: "#F5F5F5",
  },
  head: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
  body: {
    flex: 1,
    alignItems: "center",
    width: windowWidth,
    backgroundColor: "white",
  },
});
