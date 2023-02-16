import React, { useState, useEffect } from "react";
import styles from "../style";
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

const Commande = ({ navigation }) => {
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
        <Ionic name="close-circle-outline" size={28} colour="black" />
      </Pressable>
    </View>
  );

  const [nom, setNom] = useState("");
  const [adrr, setAdrr] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [number, setNumb] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onPressFunction2 = () => {
    return;
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

  const renderItem = ({ item }) => <Item id={item.id} title={item.title} />;

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
        <Text style={{ fontSize: 22 }}>Information pour la livraison</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionic name="basket-outline" size={28} colour="black" />
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
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </Modal>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#FFFFFF"
          onChangeText={setNom}
          value={nom}
        />
        <TextInput
          style={styles.input}
          placeholder="lieu de livraison"
          placeholderTextColor="#FFFFFF"
          onChangeText={setAdrr}
          keyboardType="numeric"
          value={adrr}
        />
        <TextInput
          style={styles.input}
          placeholder="Ville"
          placeholderTextColor="#FFFFFF"
          onChangeText={setVille}
          keyboardType="numeric"
          value={ville}
        />
        <TextInput
          style={styles.input}
          placeholder="Pays"
          placeholderTextColor="#FFFFFF"
          onChangeText={setPays}
          value={pays}
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          placeholderTextColor="#FFFFFF"
          onChangeText={setNumb}
          value={number}
        />
        <Pressable onPress={onPressFunction2} style={styles.pressbutt}>
          <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Commande;
