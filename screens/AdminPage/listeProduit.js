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
import * as ImagePicker from 'react-native-image-picker';

// Redux
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/actions/productsAction";
import { uploadString } from "firebase/storage";
import { async } from "@firebase/util";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Listing = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image,setImage] = useState("");
  const [blob,setBlob] = useState({})
  const [uploading,setUploading] = useState(false)
  const reset = () => {
    setName(null);
    setImage("");
  };

  const PickerImage =  async() =>{
    let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    };

    let result = await ImagePicker.launchImageLibrary({
        mediaType:ImagePicker.mediaType.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
    })
    const source = {uri:result.uri}
    console.log(source)
    setImage(source)
  }

  const uploadImage = async() => {
    setUploading(true)
    const responce = await fetch(image.uri)
    const blob = await responce.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
    var ref = storage.ref().child(filename).put(blob);

    try {
        await ref;
    }catch(e){
        console.log(e)
    }

    setUploading(false)
    Alert.alert(
        'Photo uploaded..!!'
    )
    setImage(null)
  }



  const onPressFunction2 = async () => {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    if (name !== "" && image !== "") {
      try {
        const docRef = await addDoc(collection(db, "listProduct"), {
          imgProduct: image,
          nameProduct: name,
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

  
  
  return (
    <View style={styles.container}>
        <View style={styles.head}>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                    <Ionic name="arrow-back-outline" size="38" color="black" />
                </Pressable> 
                <Text style={{fontSize:28,fontWeight:'400'}}>Retour</Text>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
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
        <Pressable
          onPress={uploadImage}
          style={styles.pressbutt1}
        >
          <Text style={{ fontSize: 16, color: "white" }}>image du produit</Text>
        </Pressable>
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

export default Listing;

const styles = StyleSheet.create({
    container: {
      marginTop:StatusBar.currentHeight + 35,
      backgroundColor: "#F5F5F5",
    },
    head:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    input: {
        height: 50,
        width:'80%',
        margin: 12,
        marginVertical:20,
        borderWidth: 1,
        borderColor:'#CDC9C3',
        backgroundColor:'#CDC9C3',
        color:'grey',
        borderRadius:8,
        padding: 10,
    },
    pressbutt:{
        height: 50,
        borderRadius:8,
        marginTop:20,
        width:'50%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#212529'
    },
    pressbutt1:{
        height: 50,
        borderRadius:8,
        marginTop:20,
        width:'80%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#CDC9C3'
    },
    body:{
        flex:1,
        alignItems: 'center',
        width: windowWidth,
        backgroundColor: "white",
    },
})