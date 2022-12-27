import React from 'react';
import styles from '../style';
import Ionic from 'react-native-vector-icons/Ionicons'
import { Text, View, Pressable , Image} from 'react-native';

const Partage = () => {

  const onPressFunction1 = () => {
    return
  }
  const onPressFunction2 = () => {
    return
  }

  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        <Pressable onPress={onPressFunction1}>
          <Ionic name='arrow-back-outline' size='28' colour='black' />
        </Pressable>
        <Text>Publier une offre d'achat</Text>
        <Pressable onPress={onPressFunction2}>
          <Image source={require('../assets/box.png')} style={{width:24,height:24}}/>
        </Pressable>
      </View>
    </View>
  );
}

export default Partage;