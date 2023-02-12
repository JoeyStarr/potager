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
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

// Media Library
import * as MediaLibrary from "expo-media-library";

// Expo Image Picker
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../firebase/productCall";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Listing = ({ navigation }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [imageSelected, setImageSelected] = useState(null);
  const [imageBlob, setImageBlob] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const reset = () => {
    setName(null);
    setImage("");
    setImageSelected(null);
  };
  const toast = useToast();
  // FUNCTIONS
  const getBlob = async (uri) => {
    const r = await fetch(uri);
    const b = await r.blob();
    return b;
  };
  const pickImageAsync = async () => {
    const media = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!media.canceled) {
      setIsImageLoading(true);
      const blob = await getBlob(media.assets[0].uri);
      setImageBlob(blob);
      setIsImageLoading(false);
      setImageSelected(media.assets[0]);
    } else {
      alert("Vous n'avez pas sélectionné d'image");
    }
  };

  const createProduct = async () => {
    if (name !== "" && imageBlob !== "") {
      const imageName = imageBlob._data.name;
      console.log(imageName);
      try {
        const imgUrl = await uploadImage(imageBlob, imageName);
        setImage(imgUrl);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else return;
  };

  const sendProductData = async () => {
    const docRef = await addDoc(collection(db, "listAdmin"), {
      imgProduct: image,
      nameProduct: name,
    });
    console.log("Document written with ID: ", docRef.id);
    toast.show("DJIPOTA", {
      type: "custom_toast",
      placement: "top",
      duration: 2000,
      offset: 30,
      animationType: "slide-in",
      data: {
        title: "Produit ajouté ✨",
      },
    });
    reset();
  };

  useEffect(() => {
    if (image !== "") {
      sendProductData();
    }
  }, [image]);

  const getPermissions = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      // we can access all files
    }

    if (permission.granted === true && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        // We are going to display an alert that user must allow this permission to work this app
        permissionAlert();
      }

      if (status === "granted") {
        // We want to gett all images
      }

      if (status === "denied" && !canAskAgain) {
        // We want to display some error message to the user
      }
    }
  };

  useEffect(() => {
    getPermissions();
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
          style={styles.input}
          placeholder="nom du produit"
          placeholderTextColor="#FFFFFF"
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <Pressable onPress={() => pickImageAsync()} style={styles.pressbutt1}>
          <Text style={{ fontSize: 16, color: "white" }}>image du produit</Text>
        </Pressable>

        {isImageLoading === true ? (
          <View style={{ marginVertical: 30 }}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : null}
        {imageSelected ? (
          <View
            style={{
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "90%", alignItems: "flex-end" }}>
              <Button title="Annuler" onPress={() => setImageSelected(null)} />
            </View>

            <Image
              source={{ uri: imageSelected.uri }}
              style={styles.imageSelected}
            />
          </View>
        ) : null}

        <Pressable
          disabled={name !== "" ? false : true}
          onPress={() => createProduct()}
          style={styles.pressbutt}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Listing;

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
    alignItems: "center",
    width: windowWidth,
  },
  imageSelected: {
    height: 200,
    width: "90%",
    borderRadius: 20,
    marginBottom: 20,
  },
});
