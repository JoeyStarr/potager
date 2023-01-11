import { StyleSheet, Dimensions, StatusBar  } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      width:windowWidth,
      height:windowHeight,
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
    container2: {
        flex:1,
        height:windowHeight,
        width: windowWidth,
        backgroundColor: '#00ABB3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerrr: {
        flex:1,
        height:windowHeight,
        width: windowWidth,
        backgroundColor: '#00ABB3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        flex:1,
        paddingTop: StatusBar.currentHeight,
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
    input2: {
        height: 50,
        width:'80%',
        margin: 12,
        marginVertical:20,
        borderWidth: 1,
        borderColor:'#CDC9C3',
        backgroundColor:'#F4F3F3',
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
      elevation: 5,
      height: 600
    },
    modalView2: {
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
    item:{
        width:'80%',
        flexDirection:'row',
        marginVertical:20,
        justifyContent:'space-around',
        alignItems:'center'
    },
    it1:{
        flex:2
    },
    it1:{
        flex:1
    },
    container3: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width:windowWidth,
        height:windowHeight,
        backgroundColor: 'white',
    },
    scrollView: {
        width:'90%',
        backgroundColor: 'white',
        marginHorizontal: 20,
    },
    header2:{
        flexDirection:'row',
        width:'100%',
        padding:10,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'space-between',
    },
    conteneurSearchBar:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    searchBar:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'90%',
        height:50,
        padding:10,
        borderWidth: 1,
        borderRadius:8,
        borderColor:'#CDC9C3',
        backgroundColor:'#F4F3F3',
    },
    card:{
        width:'45%',
        borderRadius:8,
        padding:5,
        backgroundColor:'#F9F6F7'
    },
    card3:{
        width:'48%',
        alignItems:'flex-start',
        borderWidth:1,
        borderColor:'white',
        borderRadius:8,
        backgroundColor:'#F9F6F7',
        marginHorizontal:'1%',
        padding:2,
        marginVertical:'5%'
    },
    containerBox:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    bloc1:{
        width:'100%',
    },
    bottom:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'white',
        justifyContent:'space-around',
        alignItems:'center'
    },
    bottom2:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'white',
        justifyContent:'space-around',
        alignItems:'center'
    },
    circle:{
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        width:48,
        height:48,
        borderRadius:'50%'
    },
    row:{
        flexDirection:'row',
        paddingVertical:10
    },
    containerBox2:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%',
        backgroundColor:'white',
    },
    card2:{
        width:'40%',
        borderRadius:8,
        padding:5,
        backgroundColor:'#F9F6F7'
    },
  });
  
  export default styles;