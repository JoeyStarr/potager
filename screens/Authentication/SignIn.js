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

// Constants used for styles
import { SIZES, COLORS, FONTS } from "../../style/index";

import { icons, images } from "../../constants";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Google Login
//import { auth } from "@react-native-firebase/auth";
/* import { GoogleSignin } from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  iosClientId:
    "130898531440-kav0pn1hakeq4jub4mqko40end7lfl1o.apps.googleusercontent.com",
  webClientId:
    "130898531440-8vcf24jp8p9vpl41fphpt23n8eedq6tm.apps.googleusercontent.com",
  offlineAccess: false,
}); */

// Utils for verifying entries in input fields
import utils from "../../utils";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorMessage?.includes("user-not-found")) {
          setError("Cet utilisateur n'existe pas");
        } else if (errorMessage?.includes("wrong-password")) {
          setError("Mot de passe incorrect");
        } else {
          setError("");
        }
      });
  };

  /* async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);

    user.then(() => console.log(user)).catch((error) => console.log(error));
  } */

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FCFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
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
            <Text style={styles.headText}>Connexion</Text>
            <Text style={styles.headSubtext}>
              Veuillez entrer vos informations de connexion
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.formContainer}>
            {/* Form Input */}
            {/** Email */}
            {/* */}
            {email?.length && emailError?.length ? (
              <View style={styles.errorContainer}>
                <Text style={{ ...FONTS.h4, color: "red" }}>{emailError}</Text>
              </View>
            ) : null}
            <View style={styles.formInput}>
              <TextInput
                style={{
                  width: "90%",
                }}
                placeholder="Email"
                keyboardType="email-address"
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
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
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
                onPress={() => signIn()}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body2 }}>
                  Connexion
                </Text>
              </TouchableOpacity>
            </View>

            {error?.length ? (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.h4, color: "red" }}>{error}</Text>
              </View>
            ) : null}
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
                onPress={() => {
                  console.log("Google Pressed");
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
                  Vous n'avez pas de compte ?{" "}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={{ ...FONTS.h3, color: COLORS.primaryColor }}>
                  Inscrivez vous
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FCFF",
    marginBottom: 20,
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
    marginVertical: 20,
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
