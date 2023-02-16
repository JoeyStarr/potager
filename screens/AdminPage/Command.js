import React, { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";

// STYLES
import { COLORS, FONTS, SIZES } from "../../style/theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Command Calls
import { getCommandsBySeller } from "../../firebase/commandCalls";

const Command = ({ navigation }) => {
  const [advices, setAdvices] = useState(null);
  const [search, setSearch] = useState("");
  const [dataProducts, setDataProducts] = React.useState(null);
  // Search state
  const [isSearching, setIsSearching] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTIONS
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

  // REACT HOOKS
  useEffect(() => {
    if (advices == null) {
      getAllAdvices().then((data) => {
        setAdvices(data);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size={38} color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>
          Liste des utilisateurs
        </Text>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size={38} color="#F5F5F5" />
        </Pressable>
      </View>
      <View style={styles.conteneurSearchBar}>
        <View style={styles.searchBar}>
          <Ionic name="search-outline" size={22} colour="black" />
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
            <Ionic name="options-outline" size={22} colour="black" />
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
              {advices?.map((advice) => (
                <RenderUser
                  advice={advice}
                  navigation={navigation}
                  key={advice.ref}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const RenderUser = ({ advice, navigation }) => {
  // STATE
  const [commands, setCommands] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTIONS

  /**
   *
   * @param {Number} id
   */
  const getCommands = async (id) => {
    setIsLoading(true);
    const datas = await getCommandsBySeller(id);
    setCommands(datas);
    setIsLoading(false);
  };

  // REACT HOOKS

  useEffect(() => {
    getCommands(advice.owner);
  }, []);

  return (
    <TouchableOpacity
      key={advice.ref}
      style={styles.adviceContainer}
      onPress={() =>
        navigation.navigate("Foruser", {
          owner: advice.owner,
        })
      }
    >
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          borderRadius: 50,
          padding: 10,
          marginRight: 10,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            {commands?.length > 10
              ? `${commands?.length}`
              : `0${commands?.length}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
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
    marginTop: Platform.OS === "ios" ? 35 : 20,
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
});
