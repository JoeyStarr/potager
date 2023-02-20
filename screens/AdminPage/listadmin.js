import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
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
  Switch,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Item = ({item,delfunction,swifunction,uiid}) => (
    <View style={styles.boxLine}>
        <View style={styles.line}>
            <View>
                <Text style={{fontSize:13,marginTop:2}}>uid: {item.uidAdmin}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginRight:5}}>Defcon</Text>
                <Switch
                    trackColor={{false: '#000000', true: '#FFFFF'}}
                    thumbColor={item.defcon ? '#FFFFF' : '#00000'}
                    ios_backgroundColor="#00000"
                    onValueChange={(item) => swifunction(item)}
                    value={item.defcon}
                />
                </View>
                <Text style={{fontSize:14,marginTop:2}}>Pseudo: {item.pseudo}</Text>
            </View>
            <Pressable onPress={(item) => delfunction(item.id)} style={{backgroundColor:"black",borderRadius:"50%",padding:10}}>
                <Ionic name="trash-outline" size={38} color="white" />
            </Pressable>
        </View>
    </View>
  );



const AdminList = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [table, setTable] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    

    const getProd = async () => {
        const dat = await getDocs(collection(db, "admin"));
        setData(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getProd2 = async () => {
        const dat = await getDocs(collection(db, "users"));
        setData2(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const setInTable = async (data2) => {
        setTable(data2.map((doc) => doc.nameProduct));
    };

    useEffect(() => {
        getProd();
        getProd2();
      }, []);
      useEffect(() => {
        setInTable(data2);
      }, [data]);

    const toast = useToast();

    const delfunction = (idtem) => {
        console.log(idtem)
        const docRef = doc(db, "admin", idtem);
        Alert.alert("Administration", "Voulez-vous supprimer ce admin", [
          {
            text: "Annuler",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              deleteDoc(docRef)
                .then(() => {
                  console.log("Entire Document has been deleted successfully.");
                })
                .catch(() => {
                  console.log(error);
                });
                getProd();
                getProd2();
                toast.show("DJIPOTA", {
                type: "custom_toast",
                placement: "top",
                duration: 2000,
                offset: 30,
                animationType: "slide-in",
                data: {
                  title: "Produit supprimé ✨",
                },
              });
              console.log("Success");
            },
          },
        ]);
      };


    const swifunction = async(idtem,valdefcon) => {
        setIsEnabled(idtem)
        const userRef = doc(db, "admin", idtem);
        await updateDoc(userRef, {
            defcon: !valdefcon,
        });
        getProd();
        getProd2();
    }

    
    const renderItem = ({item}) => {
        return (
          <Item
            item={item}
            delfunction ={() => delfunction(item.id)}
            swifunction ={() => swifunction(item.id,item.defcon)}
            uiid = {item.id}
            onPress={() => setSelectedId(item.id)}
          />
        );
      };


    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                    <Ionic name="arrow-back-outline" size={38} color="black" />
                </Pressable> 
                <Text style={{fontSize:28,fontWeight:'400'}}>Retour</Text>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                    <Ionic name="arrow-back-outline" size={38} color="#F5F5F5" />
                </Pressable> 
             </View>
             <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default AdminList;


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
    boxLine:{
        width:"100%",
        alignItems:'center',
        marginHorizontal:5,
        marginTop:15,
    },
    line:{
        flexDirection:"row",
        justifyContent:'space-evenly',
        width:'90%',
        borderRadius:10,
        padding:10,
        alignItems:'center',
        marginVertical:10,
        backgroundColor:"white",
        ...Platform.select({
          ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,    
          },
          android: {
              elevation: 5,
          },
          }),
    }
})