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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GesPotager = ({navigation}) => {
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
        </View>
    )
}
export default GesPotager;


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