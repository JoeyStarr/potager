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
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";

import { getStorage, ref, getDownloadURL, getStream } from "firebase/storage";

import { SIZES, COLORS, FONTS } from "../../style/index";
import { icons } from "../../constants";

import Slider from "@react-native-community/slider";

const Advice = ({ navigation, route }) => {
  const { advice } = route.params;

  const [sound, setSound] = React.useState(null);
  const [soundStatus, setSoundStatus] = React.useState(null);
  const [urlFound, setUrlFound] = React.useState();
  const [onLoad, setOnLoad] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentPosition, setcurrentPosition] = React.useState(0);
  const [timeAudio, setTimeAudio] = React.useState(0);

  const storage = getStorage();

  const getDatas = () => {
    setOnLoad(true);
    // Obtenir une référence au fichier audio dans Firebase Storage
    const httpsRef = ref(storage, advice.soundUrl);

    getDownloadURL(httpsRef)
      .then(async (url) => {
        // Insert url directly into statement
        setUrlFound(url);
        const { sound } = await Audio.Sound.createAsync({ uri: url });
        setSound(sound);
        console.log("Sound mounted");

        const status = await sound.getStatusAsync();
        setSoundStatus(status);
        console.log("Sound status", status);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const _onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) {
      console.log("---");
      console.log(
        soundStatus !== null &&
          playbackStatus?.positionMillis / soundStatus?.durationMillis
      );
      console.log("---");

      setcurrentPosition(playbackStatus?.positionMillis);
    }
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
    }
  };

  const calculateSeebBar = () => {
    if (currentPosition !== null && soundStatus?.durationMillis !== null) {
      return currentPosition / soundStatus?.durationMillis;
    }

    /* if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000);
    } */

    return 0;
  };

  async function handleAudioPress() {
    if (sound === null) {
      // playing audio

      await sound.playAsync();
    } else {
      // resume audio
      await sound.playAsync();
    }

    setIsPlaying(true);
  }

  async function pauseAudio() {
    try {
      await sound.setStatusAsync({ shouldPlay: false });
      setIsPlaying(false);
    } catch (error) {}
  }

  async function skipBack10() {
    try {
      const status = await sound.getStatusAsync();
      const currentPositionMillis = status?.positionMillis;
      const newPositionMillis =
        currentPositionMillis >= 10000 ? currentPositionMillis - 10000 : 0;
      console.log(currentPositionMillis);
      await sound.setStatusAsync({
        shouldPlay: false,
        positionMillis: newPositionMillis,
      });
      if (isPlaying) {
        await sound.playAsync();
        setIsPlaying(true);
      } else setIsPlaying(false);
    } catch (error) {}
  }

  async function skipForward10() {
    try {
      const status = await sound.getStatusAsync();
      const currentPositionMillis = status?.positionMillis;
      const newPositionMillis =
        status?.durationMillis - currentPositionMillis <= 10000
          ? 0
          : currentPositionMillis + 10000;
      console.log(status);
      await sound.setStatusAsync({
        shouldPlay: false,
        positionMillis: newPositionMillis,
      });
      if (isPlaying) {
        await sound.playAsync();
        setIsPlaying(true);
      } else setIsPlaying(false);
    } catch (error) {}
  }

  async function stop() {
    try {
      await sound.setStatusAsync({
        shouldPlay: false,
        positionMillis: 0,
      });
      setIsPlaying(false);
    } catch (error) {}
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  React.useEffect(() => {
    getDatas();
  }, []);

  React.useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      setOnLoad(false);
    }
  }, [sound]);

  React.useEffect(() => {
    return sound
      ? () => {
          setSound(null);
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
                  height: 200,
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
            {/* Audio data loading */}
            {onLoad === true ? (
              <View>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <>
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

                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => skipBack10()}
                  >
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
                    onPress={() => {
                      if (isPlaying === true) {
                        pauseAudio();
                      } else handleAudioPress();
                    }}
                  >
                    <Image
                      source={isPlaying === true ? icons.pause : icons.play}
                      style={{
                        tintColor: "white",
                        width: "60%",
                        height: "60%",
                      }}
                    />
                  </TouchableOpacity>
                  {/* Avance 10sec */}

                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => skipForward10()}
                  >
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

                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => stop()}
                  >
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

                {/* SLIDER */}
                <View style={styles.sliderContainer}>
                  <Slider
                    style={{ width: "100%" }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor={COLORS.gray}
                    value={0}
                    onValueChange={(value) => {
                      console.log(value);
                    }}
                  />
                  <View style={styles.timerContainer}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      {millisToMinutesAndSeconds(currentPosition)}
                    </Text>

                    <Text
                      style={{
                        ...FONTS.body3,
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      {millisToMinutesAndSeconds(soundStatus?.durationMillis)}
                    </Text>
                  </View>
                </View>
              </>
            )}
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
    marginTop: 30,
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
    padding: 10,
  },
  headDetails: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  footDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
  },
  controlButton: {
    width: "18%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  sliderContainer: {
    padding: 10,
  },
  timerContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
});
