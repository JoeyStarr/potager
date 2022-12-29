import React from "react";
import { signOut, getAuth } from "firebase/auth";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../hooks/useAuth";

// User Calls - Firebase
import { getUser } from "../firebase/userCalls";

// Style
import { SIZES, COLORS, FONTS } from "../style/index";

// Components
import Header from "./Home/Header";
import Card from "./Home/Card";
import Advices from "./Home/Advices";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const { user } = useAuth();
  const auth = getAuth();

  React.useEffect(() => {
    setIsLoading(true);
    if (user) {
      getUser(user?.uid).then((data) => {
        setUserData(data);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* HEADER COMPONENT */}
          <Header userName={userData?.name} navigation={navigation} />

          {/* CARD COMPONENT */}
          <Card
            isHashSaved={userData?.hashPota ? true : false}
            navigation={navigation}
            userUid={userData?.uid}
            docRef={userData?.docRef}
          />

          {/* ADVICES COMPONENTS */}
          <Advices
            isActive={userData?.hashPota ? true : false}
            navigation={navigation}
          />

          {/*<Button title="Log Out" onPress={() => signOut(auth)} /> */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    width: SIZES.width,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 10,
    marginTop: 60,
  },
  __flex: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
