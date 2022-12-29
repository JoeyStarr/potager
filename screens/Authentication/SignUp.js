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
} from "react-native";

// Firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
// Constants used for styles
import { SIZES, COLORS, FONTS } from "../../style/index";

import { icons, images } from "../../constants";

// Utils for verifying entries in input fields
import utils from "../../utils";

// UUID generator
//import uuid from "react-native-uuid";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const addUser = async (uid) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        hashPota: "",
        name: username,
        number: "",
        prename: "",
        uid: uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Authentication with firebase
  const signUp = () => {
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        addUser(userCredential?.user?.uid).then(() => {
          // Signed in && created
          const user = userCredential.user;
          setIsLoading(false);
          navigation.navigate("SignIn");
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false);
        // ..
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={{ flex: 1, marginBottom: 50 }}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 100,
                }}
              ></View>
            </View>

            {/* HEAD */}
            <View style={styles.headContainer}>
              <Text style={styles.headText}>Inscription</Text>
              <Text style={styles.headSubtext}>
                Veuillez entrer vos informations
              </Text>
            </View>

            {/* FORM */}
            <View style={styles.formContainer}>
              {/* Form Input */}

              {/* Username */}
              <View style={styles.formInput}>
                <TextInput
                  style={{
                    width: "90%",
                  }}
                  placeholder="Nom"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                />
              </View>

              {/** Email */}
              {/* */}
              {email?.length && emailError?.length ? (
                <View style={styles.errorContainer}>
                  <Text style={{ ...FONTS.h4, color: "red" }}>
                    {emailError}
                  </Text>
                </View>
              ) : null}
              <View style={styles.formInput}>
                <TextInput
                  style={{
                    width: "90%",
                  }}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => {
                    utils.validateEmail(text, setEmailError);
                    setEmail(text);
                  }}
                />
              </View>

              {/** Password */}
              {/* */}
              {password?.length && passwordError?.length ? (
                <View style={styles.errorContainer}>
                  <Text style={{ ...FONTS.h4, color: "red" }}>
                    {passwordError}
                  </Text>
                </View>
              ) : null}
              <View style={styles.formInput}>
                <TextInput
                  style={{
                    width: "90%",
                  }}
                  placeholder="Mot de passe"
                  secureTextEntry={hidePassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    utils.validatePassword(text, setPasswordError);
                  }}
                />
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Image
                    source={hidePassword ? icons.eye : icons.eye_off}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  disabled={
                    passwordError?.length || emailError?.length ? true : false
                  }
                  onPress={() => signUp()}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.body2 }}>
                    Inscription{" "}
                    {isLoading ? (
                      <ActivityIndicator size={"small"} color="white" />
                    ) : null}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* FOOTER */}
            <View style={styles.footerContainer}>
              {/* Divider */}
              <View
                style={{
                  width: 250,
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                  marginVertical: 10,
                }}
              />
              <View style={styles.footerText}>
                <Text style={{ ...FONTS.body3, marginVertical: 10 }}>
                  Ou continuez avec
                </Text>
              </View>

              {/* Social Buttons Logos */}
              <View
                style={{
                  width: 200,
                  height: 100,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {/* Google */}
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    source={images.google}
                    resizeMethod="resize"
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </TouchableOpacity>

                {/* Facebook */}
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    source={images.facebook}
                    resizeMethod="resize"
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </TouchableOpacity>
              </View>
              {/* Switcher */}
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={{ ...FONTS.body3 }}>
                    Vous avez déjà un compte ?{" "}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={{ ...FONTS.h3, color: COLORS.primaryColor }}>
                    Connectez vous
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FCFF",
  },
  logoContainer: {
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 40,
  },
  headContainer: {
    width: SIZES.width,
    padding: SIZES.padding,
  },
  headText: {
    ...FONTS.h1,
  },
  headSubtext: {
    ...FONTS.body4,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",

    width: SIZES.width,
  },
  formInput: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 10,
    fontSize: 15,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorContainer: {
    width: "90%",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SIZES.width,
  },
  btnContainer: {
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  btn: {
    marginVertical: 10,
    height: 60,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryColor,
    borderRadius: SIZES.radius,
  },
});
