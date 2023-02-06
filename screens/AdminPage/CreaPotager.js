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

const CreaPotager = ({ navigation }) => {
    const [hash,setHash] = useState("")
    const [propnom,setPrenom] = useState("")
    const [propsurnom,setSurnom] = useState("")
    const [propnum,setNum] = useState("")
    const [propmail,setMail] = useState("")

    const reset = () => {
      setHash("");
      setPrenom("");
      setSurnom("");
      setNum("");
      setMail("");
    };


    /*
    useEffect(() => {
      const uuidv4 = () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
    },[])

    console.log(uuidv4);*/


    const onPressFunction2 = async() => {
      if (hash !== "" && propnom !== "" && propsurnom !== "" && propnum !== "" && propmail !== "") {
        try {
          const docRef = await addDoc(collection(db, "potager"), {
            PropioEmail: propmail,
            PropioNom: propnom,
            PropioNum: propnum,
            ProprioPrenom: propsurnom,
            owner: hash,
          });
          console.log("Document written with ID: ", docRef.id);
          reset();
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else return;
    }
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
              placeholder="HashCode"
              placeholderTextColor="#FFFFFF"
              onChangeText={(hash) => setHash(hash)}
              value={hash}
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