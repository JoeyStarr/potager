import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
import SelectDropdown from "react-native-select-dropdown";
//firebase

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewAdmin = ({ navigation }) => {
    const [email,setEmail] = useState("")
    const [username,setUser] = useState("")
    const [pass,setPass] = useState("")

    const reset = () => {
        setEmail("");
        setUser("");
        setPass("");
      };
    
    const onPressFunction2 = () => {
        const addUser = async (uid) => {
            try {
              const docRef = await addDoc(collection(db, "users"), {
                email: email,
                hashPota: "",
                name: username,
                number: "",
                prename: "",
                mdp:pass,
                uid: uid,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
        };
        const addAdmin = async (uid) => {
            try {
              const docRef = await addDoc(collection(db, "users"), {
                defcon: false,
                uidAdmin: uid,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
        };

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            addUser(userCredential?.user?.uid).then(() => {
            addAdmin(userCredential?.user?.uid)
            });
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsLoading(false);
            // ..
        });

        reset()
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
              placeholder="User"
              placeholderTextColor="#FFFFFF"
              onChangeText={(username) => setUser(username)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#FFFFFF"
              onChangeText={(pass) => setPass(pass)}
              value={pass}
            />
            <Pressable
              disabled={email !== "" ? false : true}
              onPress={onPressFunction2}
              style={styles.pressbutt}
            >
              <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
            </Pressable>
          </View>
        </View>
      );
    };
    
    export default NewAdmin;
    
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