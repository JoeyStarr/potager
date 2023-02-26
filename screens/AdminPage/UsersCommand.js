import React, { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import {
    collection,
    getDocs,
    query,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";

// STYLES
import { FONTS, SIZES } from "../../style/theme";

// Toast
import { useToast } from "react-native-toast-notifications";

import Slider from "@react-native-community/slider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Advice Calls
import { getAllAdvices, deleteAdvice } from "../../firebase/adviceCalls";

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

  const [nm,setNm] = useState(null)

  //

  const [range,setRange] = useState('50%')
  const [sliding,setSliding] = useState('Inactive')

  const [taille,setTaille] = useState(null)
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
        if(dc.data().idSeller === doc.data().owner){
          num++
        }
        console.log(dc.data().idSeller," : ",doc.data().owner)
      })
      console.log(num)
      const newData = { ...doc.data(), ref: doc.id, number:num };
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
      console.log(doc.data())
      const newData = { ...doc.data(), ref: doc.id };
      datas.push(newData);
    });
  
    return datas;
  };

  const handleSearch = (textSearch, arrayProducts) => {
    const newArr = arrayProducts.filter((product) =>
      product?.PropioNom?.toLowerCase().includes(textSearch.toLowerCase())
    );
    console.log(newArr)
    return newArr
  };
  
  const onApply = () => {
    const dataFiltered = handleSearch(search, advices);
    setData(null);
    setDataProducts(dataFiltered);
  };

  useEffect(() => {
    if (search?.length > 0) {
      setIsLoading(true);
      setIsSearching(true);
      const dataFiltered = handleSearch(search, advices);
      setData(null);
      setDataProducts(dataFiltered);
      setIsLoading(false);
      console.log(dataProducts)
    } else {
      setIsSearching(false);
      setDataProducts(advices);
      console.log(dataProducts)
    }
  },[search]);

  const deleteAdvice = async () => {
  };

  useEffect(() =>{
    setDataProducts(advices);
  },[advices])

  useEffect(() => {
    if (dataProducts == null) {
      getAllAdvices().then((data) => {
        setAdvices(data);
        setTaille(data.length)
      });
      getAllDonne().then((data) => {
        setDonne(data)
      })
    }
  },[]);

  const slicer = (sli) => {
    getAllAdvices().then((data) => {
      let dada = data.slice(0,sli)
      setAdvices(dada);
    });
  }

  const option = () => {
    getAllAdvices().then((data) => {
      setAdvices(data);
      setTaille(data.length)
    });
    setRange(taille)
    setModalVisible(true)
  }

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

  console.log(nm)
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size="38" color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>Liste des utilisateurs</Text>
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
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
            <Text style={styles.modalText}>Filter</Text>
            <Text>{range}</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text>1</Text>
              <Slider
                style={{width:250,height:40}}
                minimumValue={1}
                maximumValue={taille}
                minimumTrackTintColor="tomato"
                maximumTrackTintColor="#000"
                thumbTintColor="tomato"
                value={taille}
                step={1}
                onValueChange={value => setRange(parseInt(value))}
                onSlidingStart={() => setSliding('Sliding')}
                onSlidingComplete={(val) => slicer(val)} 
              />
              <Text>{taille}</Text>
            </View>
            <Text style={styles.modalText}>Filter par nombre de commande</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Pressable  style={styles.bull} onPress={() => setNm(10)}>
              <Text>10</Text>
            </Pressable>
            <Pressable style={styles.bull} onPress={() => setNm(20)}>
              <Text>20</Text>
            </Pressable>
            <Pressable style={styles.bull} onPress={() => setNm(30)}>
              <Text>30</Text>
            </Pressable>
            <Pressable style={styles.bull} onPress={() => setNm(50)}>
              <Text>50+</Text>
            </Pressable>
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

const splitNameFromUrl = (str) => {
  let name = str.split(".com/o/").pop().split("?alt")[0];
  if (name[0] === "a") {
    name = name.slice(10, name.length);
  }
  return name;
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
        onPress={() => navigation.navigate('Foruser',{
            'owner':advice.owner
        })}
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
    marginVertical:20,
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
    justifyContent:'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 20,
    width:'100%',
    height:'60%',
    bottom:0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    fontSize:22,
    textAlign: 'center',
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
  bull:{
    borderWidth:1,
    borderRadius:10,
    padding:20,
    marginHorizontal:5,
    borderColor:'black'
  }
});
