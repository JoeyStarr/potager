import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Button,
  StatusBar,
  Pressable
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";

import { signOut, getAuth } from "firebase/auth";

const Dashboard = ({navigation}) => {
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <View style={styles.Headers}>
        <Text style={{fontSize:32,fontWeight:'700'}}>Djipota Admin</Text>
        <Pressable onPress={() => signOut(auth)}>
          <Ionic name="log-out-outline" size="32" color="black" />
        </Pressable>
      </View>
      <ScrollView style={{width:'100%'}}>
        <View style={styles.Box}>
          <Text style={{fontSize:28,fontWeight:'400',marginVertical:5}}>Conseil</Text>
          <View style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={() => navigation.navigate('Conseil')}>
            <ImageBackground source={require('../../assets/images/advice.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Creér</Text>
              </View>
            </ImageBackground>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.navigate('GesConseil')}>
            <ImageBackground source={require('../../assets/images/advi.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Gérer</Text>
              </View>
            </ImageBackground>
            </Pressable>
          </View>
        </View>


        <View style={styles.Box}>
          <Text style={{fontSize:28,fontWeight:'400',marginVertical:5}}>Creation de Potager</Text>
          <View style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={() => navigation.navigate('Potager')}>
            <ImageBackground source={require('../../assets/images/potaa.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Creér</Text>
              </View>
            </ImageBackground>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.navigate('GesPotager')}>
            <ImageBackground source={require('../../assets/images/gest.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Gérer</Text>
              </View>
            </ImageBackground>
            </Pressable>
          </View>
        </View>

        <View style={styles.Box}>
          <Text style={{fontSize:28,fontWeight:'400',marginVertical:5}}>Publication d'offre</Text>
          <View style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={() => navigation.navigate('Offer')}>
            <ImageBackground source={require('../../assets/images/offer.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Creér</Text>
              </View>
            </ImageBackground>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.navigate('GesOff')}>
            <ImageBackground source={require('../../assets/images/voir.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Gérer</Text>
              </View>
            </ImageBackground>
            </Pressable>
          </View>
        </View>

        <View style={styles.Box}>
          <Text style={{fontSize:28,fontWeight:'400',marginVertical:5}}>Liste de produit</Text>
          <View style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={() => navigation.navigate('Listing')}>
            <ImageBackground source={require('../../assets/images/list.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Creér</Text>
              </View>
            </ImageBackground>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.navigate('GesList')}>
            <ImageBackground source={require('../../assets/images/product.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Gérer</Text>
              </View>
            </ImageBackground>
            </Pressable>
          </View>
        </View>

        <View style={styles.Box}>
          <Text style={{fontSize:28,fontWeight:'400',marginVertical:5}}>Gestion des commandes</Text>
          <View style={styles.cardContainer}>
            <Pressable style={styles.cardsp} onPress={() => navigation.navigate('Users')}>
            <ImageBackground source={require('../../assets/images/com.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Gerer</Text>
              </View>
            </ImageBackground>
            </Pressable>
          </View>
        </View>


        <View style={styles.Box}>
          <Text style={{fontSize:28,fontWeight:'400',marginVertical:5}}>Créer un nouvel admin</Text>
          <View style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={() => navigation.navigate('New')}>
            <ImageBackground source={require('../../assets/images/user.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Creér</Text>
              </View>
            </ImageBackground>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.navigate('AdminList')}>
            <ImageBackground source={require('../../assets/images/usrg.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6}}>
              <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                <Text style={{fontSize:42,color:'white',fontWeight:'600'}}>Gérer</Text>
              </View>
            </ImageBackground>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    alignItems: "center",
    //backgroundColor: "#E1F2FB",
    backgroundColor:'white'
  },
  Headers:{
    marginTop:StatusBar.currentHeight + 35,
    marginBottom:20,
    alignItems:'center',
    width:'100%',
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Box:{
    marginVertical:15,
    width:'100%',
    paddingHorizontal:10,
    
  },  
  cardContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  card:{
    backgroundColor:'black',
    borderRadius:10,
    width:150,
    height:180
  },
  cardsp:{
    width:"100%",
    height:220
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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
  },
});
