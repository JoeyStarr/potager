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

const Partage = ({ navigation }) => {
  const [produit, setProduit] = useState("");
  const [quantite, setQuantite] = useState();
  const [prix, setPrix] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        <TextInput
          style={styles.input}
          placeholder="Produit"
          placeholderTextColor="#FFFFFF"
          onChangeText={(text) => setProduit(text)}
          value={produit}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantité"
          placeholderTextColor="#FFFFFF"
          onChangeText={(text) => setQuantite(text)}
          keyboardType="numeric"
          value={quantite}
        />
        <TextInput
          style={styles.input}
          placeholder="Prix"
          placeholderTextColor="#FFFFFF"
          onChangeText={setPrix}
          keyboardType="numeric"
          value={prix}
        />
        <Pressable onPress={() => onPressFunction2()} style={styles.pressbutt}>
          <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Partage;
