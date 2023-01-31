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
  ActivityIndicator,
  Button,
  StatusBar,
  Pressable
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";

const Conseil = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                    <Ionic name="arrow-back-outline" size="32" color="black" />
                </Pressable> 
                <Text style={{fontSize:22,fontWeight:'400'}}>Conseil</Text>
                <Text></Text>
            </View>
            
        </View>
    )
}

export default Conseil;

const styles = StyleSheet.create({
    container: {
      marginTop:StatusBar.currentHeight + 35,
      backgroundColor: "#E1F2FB",
    },
    head:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    }
})