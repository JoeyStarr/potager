import React, { useState, useEffect, useRef } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  Button,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";

import { COLORS, FONTS } from "../../style/theme";
import { icons } from "../../constants";

// Advice Calls
import {
  addAdvice,
  uploadAudio,
  uploadImage,
} from "../../firebase/adviceCalls";

// Expo file System
// Media Library
import * as MediaLibrary from "expo-media-library";

// Expo Image Picker
import * as ImagePicker from "expo-image-picker";

// Expo Document Picker
import * as DocumentPicker from "expo-document-picker";
import { Timestamp } from "firebase/firestore";

// Toast Notification
import { useToast } from "react-native-toast-notifications";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Conseil = ({ navigation }) => {
  const toast = useToast();

  // STATE
  const [adviceData, setAdviceData] = useState({
    title: "",
    time: null,
    description: "",
    imageUrl: "",
    soundUrl: "",
    createdAt: Timestamp.fromDate(new Date()),
    countHear: 0,
  });
  const [imageSelected, setImageSelected] = useState(null);
  const [imageBlob, setImageBlob] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [audioSelected, setAudioSelected] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const [isSendingData, setIsSendingData] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [stepText, setStepText] = useState("Chargement...");

  const rotationDegree = useRef(new Animated.Value(0)).current;
  const startRotationAnimation = (durationMs, rotationDegree) => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };
  let durationMs = 1000;

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  // Image Picker Permissions
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Désolé, nous avons besoin d'autorisation pour accéder à vos fichiers."
          );
        }
      }
    })();
  }, []);

  // FUNCTIONS
  const getBlob = async (uri) => {
    const r = await fetch(uri);
    const b = await r.blob();
    return b;
  };
  const permissionAlert = () => {
    Alert.alert(
      "Autorisation Requise",
      "Cette application a besoin d'accéder aux Images!",
      [
        {
          text: "Je suis prêt!",
          onPress: () => getPermissions(),
        },
        {
          text: "Annuler",
          onPress: () => this.permissionAlert(),
        },
      ]
    );
  };

  const pickImageAsync = async () => {
    const media = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!media.canceled) {
      setIsImageLoading(true);
      const blob = await getBlob(media.assets[0].uri);
      setImageBlob(blob);
      setIsImageLoading(false);
      setImageSelected(media.assets[0]);
    } else {
      alert("Vous n'avez pas sélectionné d'image");
    }
  };

  const getAudioFile = async () => {
    let media = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "audio/*",
    });

    if (media != null) {
      const blob = await getBlob(media.uri);
      setAudioBlob(blob);
      setAudioSelected(media);
    }
  };

  const reduceName = (name) => {
    return name.toUpperCase().slice(0, 20 || 10) + "...";
  };

  const getPermissions = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      // we can access all files
    }

    if (permission.granted === true && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        // We are going to display an alert that user must allow this permission to work this app
        permissionAlert();
      }

      if (status === "granted") {
        // We want to gett all images
      }

      if (status === "denied" && !canAskAgain) {
        // We want to display some error message to the user
      }
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const sendAdvice = () => {
    addAdvice(adviceData).then(() => {
      setIsDone(true);
      setStepText("Envoie réussi !");
    });
    setTimeout(() => {
      setIsSendingData(false);
      setIsDone(false);
      setAudioBlob(null);
      setImageBlob(null);
      setAudioSelected(null);
      setImageSelected(null);
      resetForm();

      toast.show("DJIPOTA", {
        type: "custom_toast",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
        data: {
          title: "Conseil ajouté ✨",
        },
      });
    }, 2000);
  };

  const sendData = async function () {
    if (
      adviceData.title === "" ||
      adviceData.description === "" ||
      adviceData.time === "" ||
      imageBlob === null ||
      audioBlob === null
    ) {
      alert("Veuillez remplir tous les champs");
      return false;
    } else {
      durationMs = 1100;
      setIsSendingData(true);
      setIsDone(false);

      const imageName = imageBlob._data.name;
      const soundName = audioBlob._data.name;

      setStepText("Envoie de l'image...");

      const imageUrl = await uploadImage(imageBlob, imageName).then(
        async (imgUrl) => {
          setStepText("Envoie de l'audio...");

          const soundUrl = await uploadAudio(audioBlob, soundName).then(
            (res) => {
              setAdviceData({ ...adviceData, imageUrl: imgUrl, soundUrl: res });
            }
          );
        }
      );
    }
  };

  useEffect(() => {
    adviceData.imageUrl && adviceData.soundUrl && sendAdvice();
  }, [adviceData.soundUrl]);

  console.log(adviceData);

  const resetForm = () => {
    setAdviceData({
      title: "",
      time: null,
      description: "",
      imageUrl: "",
      soundUrl: "",
      createdAt: Timestamp.fromDate(new Date()),
      countHear: 0,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.head}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Ionic name="arrow-back-outline" size={38} color="black" />
          </Pressable>
          <Text style={{ fontSize: 28, fontWeight: "400" }}>Conseil</Text>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Ionic name="arrow-back-outline" size={38} color="#F5F5F5" />
          </Pressable>
        </View>

        <ScrollView style={styles.body}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            {/* Title */}
            <TextInput
              style={styles.input}
              placeholder="Titre du Conseil"
              placeholderTextColor="#000000"
              onChangeText={(text) =>
                setAdviceData({ ...adviceData, title: text })
              }
              value={adviceData.title}
            />

            {/* Description */}
            <TextInput
              style={[
                styles.input,
                {
                  height: "auto",
                  color: "black",
                },
              ]}
              multiline
              numberOfLines={4}
              placeholder="Description"
              placeholderTextColor="#000000"
              onChangeText={(text) =>
                setAdviceData({ ...adviceData, description: text })
              }
              value={adviceData.description}
            />

            {/* Upload Files */}
            {/* Image of Advice */}
            <TouchableOpacity
              style={styles.uploadImageBtn}
              disabled={imageSelected ? true : false}
              onPress={pickImageAsync}
            >
              <Text style={{ color: "white" }}>{`${
                imageSelected ? "Image sélectionnée" : "Choisir Image"
              }`}</Text>
            </TouchableOpacity>
            {isImageLoading === true ? (
              <View style={{ marginVertical: 10 }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : null}
            {imageSelected ? (
              <View
                style={{
                  width: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "90%", alignItems: "flex-end" }}>
                  <Button
                    title="Annuler"
                    onPress={() => setImageSelected(null)}
                  />
                </View>

                <Image
                  source={{ uri: imageSelected.uri }}
                  style={styles.imageSelected}
                />
              </View>
            ) : null}

            {/* Sound of Advice */}
            <TouchableOpacity
              style={styles.uploadImageBtn}
              disabled={audioSelected ? true : false}
              onPress={getAudioFile}
            >
              <Text style={{ color: "white" }}>
                {`${
                  audioSelected ? "Audio Sélectionné" : "Sélectionner audio"
                }`}
              </Text>
            </TouchableOpacity>

            {audioSelected ? (
              <View style={styles.audioContainer}>
                <View
                  style={{
                    flex: 3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Ionic name="musical-notes-outline" size={30} />

                  <View style={{ flex: 1, padding: 4 }}>
                    <Text style={{ ...FONTS.h4 }}>
                      {reduceName(audioSelected?.name)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => setAudioSelected(null)}>
                    <Ionic name="close-circle-outline" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {/* Time */}
            <TextInput
              style={styles.input}
              placeholder="Durée de l'audio"
              keyboardType="number-pad"
              placeholderTextColor="#000000"
              onChangeText={(text) =>
                setAdviceData({ ...adviceData, time: text })
              }
              value={adviceData.time}
            />

            <TouchableOpacity
              disabled={adviceData.title !== "" ? false : true}
              onPress={() => sendData()}
              style={styles.pressbutt}
            >
              <Text style={{ fontSize: 16, color: "white" }}>Valider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* LOADING SCREEN */}
      {isSendingData ? (
        <View style={styles.loaderContainer}>
          {isDone === false ? (
            <Animated.View
              style={[
                styles.spinner,
                {
                  transform: [
                    {
                      rotateZ: rotationDegree.interpolate({
                        inputRange: [0, 360],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                source={icons.loading}
                style={{ width: "80%", height: "80%" }}
              />
            </Animated.View>
          ) : (
            <View style={styles.spinner}>
              <Image
                source={icons.valid}
                style={{ width: "50%", height: "50%" }}
              />
            </View>
          )}
          <View>
            <Text
              style={{
                ...FONTS.h2,
                color: isDone === true ? "#2ecc71" : "black",
              }}
            >
              {stepText}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Conseil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: Platform?.OS === "ios" ? 40 : 20,
  },
  input: {
    height: 50,
    width: "90%",
    margin: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#CDC9C3",
    backgroundColor: "#FFFFFF",
    color: "grey",
    borderRadius: 8,
    padding: 10,
  },
  pressbutt: {
    height: 50,
    borderRadius: 8,
    marginTop: 20,
    width: "50%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212529",
  },
  pressbutt1: {
    height: 50,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CDC9C3",
  },
  body: {
    flex: 1,
    width: windowWidth,
  },

  uploadImageBtn: {
    borderWidth: 1,
    width: "90%",
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginBottom: 10,
  },
  imageSelected: {
    height: 200,
    width: "90%",
    borderRadius: 20,
    marginBottom: 20,
  },
  audioContainer: {
    borderWidth: 1,
    height: 50,
    width: "90%",
    borderRadius: 10,
    backgroundColor: COLORS.grayLight,
    flexDirection: "row",
  },
  loaderContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
