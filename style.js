import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container2: {
        flex:1,
        height:windowHeight,
        width: windowWidth,
        backgroundColor: '#00ABB3',
        alignItems: 'center',
        justifyContent: 'center',
      },
    header:{
        flex:1,
        height: windowHeight - 100,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        width: '100%',
        backgroundColor: '#F5F5F5',
    },
    body:{
        flex:5,
        alignItems: 'center',
        width: windowWidth,
        backgroundColor: '#F5F5F5',
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
    modalView: {
      margin: 40,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#000000",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
  });
  
  export default styles;