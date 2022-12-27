import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";

// Constants used for styles
import { SIZES, COLORS, FONTS } from "../../style/index";

// OnBoard datas
import { onboards } from "../../constants";

// Footer - Button
import Footer from "./Footer";

const CustomFlatList = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0]?.index);
  });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={onboards?.onboards}
        scrollEventThrottle={16}
        snapToAlignment="center"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) =>
          renderFlatListItem(
            { item, index },
            flatListRef,
            currentIndex,
            setCurrentIndex,
            scrollX,
            navigation
          )
        }
      />
    </>
  );
};

const renderFlatListItem = (
  { item },
  flatListRef,
  currentIndex,
  setCurrentIndex,
  scrollX,
  navigation
) => {
  return (
    <View style={styles.item}>
      <ImageBackground
        resizeMode="cover"
        source={item.image}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Details */}
        <View
          style={{
            width: SIZES.width,
          }}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBulle}>
              <Image
                resizeMethod="scale"
                resizeMode="cover"
                source={item.icon}
                style={{
                  width: 60,
                  height: 60,
                  tintColor: COLORS.primaryColor,
                }}
              />
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={{ ...FONTS.h1, width: 300, textAlign: "center" }}>
              {item.title}
            </Text>
          </View>

          {/* Text */}
          <View style={styles.titleContainer}>
            <Text style={{ ...FONTS.body3, width: 250, textAlign: "center" }}>
              {item.text}
            </Text>
          </View>
        </View>

        <Footer
          flatListRef={flatListRef}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          scrollX={scrollX}
          navigation={navigation}
        />
      </ImageBackground>
    </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SIZES.width,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SIZES.width,
    height: 100,
  },
  iconBulle: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: SIZES.radius,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleContainer: {
    height: 80,
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
  },
});
