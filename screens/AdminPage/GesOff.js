import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Item = ({item,delfunction,navigation}) => (
    <View style={styles.boxLine}>
            <Pressable 
                onPress={() => 
                    navigation.navigate('Detail',{
                    itemId:item.id
                    })
                }>
        <View style={styles.line}>
            <Image 
                source={{ uri: item.img }}
                style={{ width: 48, height: 48 }}/>
                <View>
                    <Text style={{fontSize:14}}>{item.product}</Text>
                    <Text style={{fontSize:14}}>{item.price} CFA</Text>
                    <Text style={{fontSize:14}}>{item.kilogram} qté</Text>
                </View>
            
            <Pressable onPress={(item) => delfunction(item.id)}>
                <Ionic name="trash-outline" size="38" color="black" />
            </Pressable>
        </View>
        </Pressable>
    </View>
  );



const GesList = ({navigation}) => {
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [tab,setTabs] = useState([{}])
    const [modalVisible, setModalVisible] = useState(false);

    const getProd = async () => {
        const dat = await getDocs(collection(db, "offer"));
        setData(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    const setInTable = async (data) => {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const donne = data.filter((doc) => doc.idSeller === uid)
        setTable(donne)
    }
    useEffect(() => {
        getProd();
      }, []);
    useEffect(() => {
        setInTable(data)
    },[data])
    console.log(table)
      /*
    const findertaker = (data) => {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const result = data.find((obj) => {
            if(obj.idSeller === uid){
                setTabs([...tab,obj])
            }
          return
        });
        setTabs(data.map((doc) => doc.nameProduct))
    };
    console.log(tab) */

    const delfunction = (idtem) => {
        const docRef = doc(db, "listProduct",idtem);
        deleteDoc(docRef).then(() =>{
            console.log("Entire Document has been deleted successfully.")
        }).catch(() => {
            console.log(error);
        })
    }

    
    const renderItem = ({item}) => {
    
        return (
          <Item
            item={item}
            delfunction ={delfunction}
            navigation={navigation}
            onPress={() => setSelectedId(item.id)}
          />
        );
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
             <FlatList
                data={table}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default GesList;


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
        width:'80%',
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