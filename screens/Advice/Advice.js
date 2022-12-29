import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";

import { SIZES, COLORS, FONTS } from "../../style/index";
import { icons } from "../../constants";

const Advice = ({ navigation, route }) => {
  const [sound, setSound] = React.useState();

  const { advice } = route.params;

  async function handleAudioPress() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/10-erreurs-a-eviter-quand-on-commence-un-potager.mp3"),
      { shouldPlay: true }
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: advice.imageUrl }}
        style={{ width: "100%", height: "100%" }}
        resizeMethod="resize"
        resizeMode="cover"
      >
        <View style={styles.backgroundImage} />

        {/* PLAYER */}
        <View style={styles.playerContainer}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={icons.chevron_left}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.heart}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </TouchableOpacity>
          </View>

          {/* BODY */}
          <View style={styles.body}>
            <View style={styles.headDetails}>
              <View
                style={{
                  width: "75%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={{ uri: advice.imageUrl }}
                  resizeMethod="resize"
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%", borderRadius: 20 }}
                />
              </View>
              <Text style={{ ...FONTS.h2, color: "white" }}>
                {advice.title}
              </Text>
            </View>
            {/* CONTROLS BUTTON */}
            <View style={styles.footDetails}>
              {/* Vitesse */}
              <TouchableOpacity style={styles.controlButton}>
                <Image
                  source={icons.multiply_1x}
                  style={{
                    tintColor: "white",
                    width: "60%",
                    height: "60%",
                  }}
                />
              </TouchableOpacity>

              {/* Return 15sec */}

              <TouchableOpacity style={styles.controlButton}>
                <Image
                  source={icons.skip_back}
                  style={{
                    tintColor: "white",
                    width: "60%",
                    height: "60%",
                  }}
                />
              </TouchableOpacity>

              {/* Play/Pause */}
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                  },
                ]}
              >
                <Image
                  source={icons.pause}
                  style={{
                    tintColor: "white",
                    width: "60%",
                    height: "60%",
                  }}
                />
              </TouchableOpacity>
              {/* Avance 15sec */}

              <TouchableOpacity style={styles.controlButton}>
                <Image
                  source={icons.skip_forward}
                  style={{
                    tintColor: "white",
                    width: "60%",
                    height: "60%",
                  }}
                />
              </TouchableOpacity>
              {/* Stop */}

              <TouchableOpacity style={styles.controlButton}>
                <Image
                  source={icons.stop}
                  style={{
                    tintColor: "white",
                    width: "40%",
                    height: "40%",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER */}
          <ScrollView style={styles.footer}>
            <Text
              style={{
                ...FONTS.h2,
                color: "white",
                fontSize: 24,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                color: "white",
                marginVertical: 10,
              }}
            >
              {advice.description}
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Advice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: COLORS.black,
    opacity: 0.7,
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  playerContainer: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    width: SIZES.width,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  body: {
    flex: 4,
  },
  footer: {
    flex: 1,
    padding: 20,
  },
  headDetails: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  footDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  controlButton: {
    width: "18%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});