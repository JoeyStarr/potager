import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Platform,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../style/theme";
import Ionic from "react-native-vector-icons/Ionicons";

// Multi Slider
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const FilterModal = ({
  isVisible,
  setIsVisible,
  filterValue,
  setFilterValue,
  onApply,
}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const btnRef = useRef(false);
  const multiSliderValuesChange = (values) => setFilterValue(values);
  const VALUE_TO_VERIFY = [0, 10000];

  function arraysEqual(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
  }

  useEffect(() => {
    if (isVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onclose());
    }
  }, [isVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 260],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.bg}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            backgroundColor: "white",
          }}
        >
          {/* HEADER */}
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.grayLight,
            }}
          >
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 18,
              }}
            >
              Filtre
            </Text>

            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
              <Ionic name="close" size={30} />
            </TouchableWithoutFeedback>
          </View>

          {/* Filter */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...FONTS.h3,
                fontSize: 18,
              }}
            >
              Prix
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MultiSlider
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 30,
                      width: 30,
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                    },
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: COLORS.grayLight,
                    },
                  }),
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      backgroundColor: COLORS.primaryColor,
                    },
                  }),
                }}
                selectedStyle={{
                  backgroundColor: COLORS.primaryColor,
                  height: 5,
                }}
                trackStyle={{
                  backgroundColor: COLORS.grayLight,
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
                values={[filterValue[0], filterValue[1]]}
                sliderLength={280}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={10000}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
              />

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.h2 }}>
                  {`${filterValue[0]} - ${filterValue[1]}`} Fcfa
                </Text>

                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setFilterValue([filterValue[0], filterValue[1]]);
                      setIsVisible(false);
                      onApply();
                    }}
                  >
                    <Text style={styles.textButton}>Appliquer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    ref={btnRef}
                    style={[styles.actionButton]}
                    disabled={
                      arraysEqual(filterValue, VALUE_TO_VERIFY) ? true : false
                    }
                    onPress={() => setFilterValue(VALUE_TO_VERIFY)}
                  >
                    <Text style={styles.textButton}>Réinitialiser</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    height: "100%",
    width: "100%",
  },
  bg: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },
  label: {
    ...FONTS.body3,
  },
  bottomContainer: {
    height: 20,
    width: "100%",
    marginVertical: 50,
  },
  actionButton: {
    flex: 1,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.primaryColor,
    marginVertical: 10,
  },
  textButton: {
    color: COLORS.white,
    ...FONTS.body3,
  },
});
