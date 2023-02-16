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
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// STYLES
import { FONTS, SIZES } from "../../style/theme";

// Toast
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Advice Calls
import { getAllAdvices, deleteAdvice } from "../../firebase/adviceCalls";
const Userrs = ({ navigation }) => {
  const [advices, setAdvices] = useState(null);
  const [search, setSearch] = useState("");
  const [dataProducts, setDataProducts] = React.useState(null);
  // Search state
  const [isSearching, setIsSearching] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();


  const getAllAdvices = async () => {
    const advices = collection(db, "potager");
  
    const q = query(advices);
    const querySnapshot = await getDocs(q);
  
    let datas = [];
    querySnapshot.forEach((doc) => {
      const newData = { ...doc.data(), ref: doc.id };
      datas.push(newData);
    });
  
    return datas;
  };

  const deleteAdvice = async () => {
  };

  useEffect(() => {
    if (advices == null) {
      getAllAdvices().then((data) => {
        setAdvices(data);
      });
    }
  }, []);

  console.log(advices)

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
            placeholderTextColor="grey"
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
              {advices?.map((advice) =>
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
        <Ionic name="options-outline" size="25" color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default Userrs;

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
  }
});
