import React, {useState,useEffect} from 'react';
import styles from '../style';
import Ionic from 'react-native-vector-icons/Ionicons'
import { Text, View, Pressable , Image, TextInput, Modal} from 'react-native';

const Partage = ({navigation}) => {

  const [produit,setProduit] = useState("")
  const [quantite,setQuantite] = useState()
  const [prix,setPrix] = useState()
  const [modalVisible, setModalVisible] = useState(false);

  const onPressFunction2 = () => {
    return
  }

  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        <Pressable onPress={() => {navigation.navigate('Accueil')}}>
          <Ionic name='arrow-back-outline' size='28' colour='black' />
        </Pressable>
        <Text style={{fontSize:22}}>Publier une offre d'achat</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={require('../assets/box.png')} style={{width:24,height:24}}/>
        </Pressable>
      </View>
      <View style={styles.body}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermez</Text>
            </Pressable>
            <Text style={styles.modalText}>Hello World!</Text>
          </View>
        </View>
      </Modal>
          <TextInput
            style={styles.input}
            placeholder="Produit"
            placeholderTextColor="#FFFFFF"
            onChangeText={setProduit}
            value={produit}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantité"
            placeholderTextColor="#FFFFFF"
            onChangeText={setQuantite}
            keyboardType="numeric"
            value={quantite}
          />
          <TextInput
            style={styles.input}
            placeholder="Prix"
            placeholderTextColor="#FFFFFF"
            onChangeText={setPrix}
            keyboardType="numeric"
            value={prix}
          />
          <Pressable onPress={onPressFunction2} style={styles.pressbutt}>
            <Text style={{fontSize:16,color:'white'}}>Valider</Text>
          </Pressable>
      </View>
    </View>
  );
}

export default Partage;