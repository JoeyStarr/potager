import React, { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";

// Potager
import { getAllHashes } from "../../firebase/potagerCalls";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreaPotager = ({ navigation }) => {
  const [hash, setHash] = useState("");
  const [propnom, setPrenom] = useState("");
  const [propsurnom, setSurnom] = useState("");
  const [propnum, setNum] = useState("");
  const [propmail, setMail] = useState("");

  const toast = useToast();

  const reset = () => {
    setHash("");
    setPrenom("");
    setSurnom("");
    setNum("");
    setMail("");
  };

  const onPressFunction2 = async () => {
    if (
      hash !== "" &&
      propnom !== "" &&
      propsurnom !== "" &&
      propnum !== "" &&
      propmail !== ""
    ) {
      try {
        const docRef = await addDoc(collection(db, "potager"), {
          PropioEmail: propmail,
          PropioNom: propnom,
          PropioNum: propnum,
          ProprioPrenom: propsurnom,
          owner: "",
          hashPota: hash,
        });
        console.log("Document written with ID: ", docRef.id);
        toast.show("DJIPOTA", {
          type: "custom_toast",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
          data: {
            title: "Potager ajouté ✨",
          },
        });
        reset();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else return;
  };

  // Generate HASH
  const generateUniqueHash = async (length) => {
    const generatedHashes = await getAllHashes();
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    while (true) {
      result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      if (!generatedHashes.includes(result)) {
        generatedHashes.push(result);
        setHash(result);
        return result;
      }
    }
  };
  useEffect(() => {
    generateUniqueHash(10);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size="38" color="black" />
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: "400" }}>Retour</Text>
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <Ionic name="arrow-back-outline" size="38" color="#F5F5F5" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <TextInput
          style={[styles.input, { textTransform: "capitalize", fontSize: 17 }]}
          placeholder="HashCode"
          placeholderTextColor="#FFFFFF"
          value={hash}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="nom du propritaire"
          placeholderTextColor="#FFFFFF"
          onChangeText={(propnom) => setPrenom(propnom)}
          value={propnom}
        />
        <TextInput
          style={styles.input}
          placeholder="prenom du propritaire"
          placeholderTextColor="#FFFFFF"
          onChangeText={(propsurnom) => setSurnom(propsurnom)}
          value={propsurnom}
        />
        <TextInput
          style={styles.input}
          placeholder="numero du propritaire"
          placeholderTextColor="#FFFFFF"
          onChangeText={(propnum) => setNum(propnum)}
          value={propnum}
        />
        <TextInput
          style={styles.input}
          placeholder="email du propritaire"
          placeholderTextColor="#FFFFFF"
          onChangeText={(propmail) => setMail(propmail)}
          value={propmail}
        />
        <Pressable
          disabled={hash !== "" ? false : true}
          onPress={onPressFunction2}
          style={styles.pressbutt}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreaPotager;

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
    color: "black",
    fontWeight: "600",
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
