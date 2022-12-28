import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../style/index";
import { icons, dummyDatas } from "../../constants";

const Advices = ({ isActive }) => {
  const popularAdvices = dummyDatas.advices.filter(
    (item) => item.countHear > 100
  );

  const newEstAdvices = dummyDatas;

  console.log(popularAdvices);

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Espace Conseils</Text>
      </View>

      {popularAdvices?.length > 0 ? (
        <>
          {/* SECTION POPULARS */}
          <View style={styles.sectionContainer}>
            {/* SECTION TITLE */}
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}>Populaires</Text>
              </View>
            </View>

            {/* SECTION CONTENT */}
            <View style={styles.sectionContentContainer}>
              <FlatList
                data={popularAdvices}
                //horizontal
                numColumns={2}
                //pagingEnabled
                //showsHorizontalScrollIndicator={false}
                //scrollEventThrottle={16}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => itemFlatList({ item })}
              />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

const itemFlatList = ({ item }) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: 130,
        }}
      >
        {/* Image */}
        <Image
          source={item.image}
          resizeMode="cover"
          resizeMethod="resize"
          style={{
            width: "95%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          height: 70,
          paddingHorizontal: 5,
        }}
      >
        {/* Title */}
        <Text
          style={{
            ...FONTS.h4,
          }}
        >
          {item.title}
        </Text>

        {/* Description */}
        <Text
          style={{
            ...FONTS.h5,
            fontSize: 10,
            lineHeight: 10,
          }}
        >
          {item.description.slice(0, 58) + "..."}
        </Text>

        {/* Time et rates */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.count}
              resizeMode="cover"
              style={{ width: 20, height: 20, marginHorizontal: 5 }}
            />
            <Text style={{ ...FONTS.h4 }}>
              {item.time?.length >= 10 ? item?.time : "0" + item?.time} min
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.ear}
              resizeMode="cover"
              style={{ width: 20, height: 20, marginHorizontal: 5 }}
            />
            <Text style={{ ...FONTS.h4 }}>{item?.countHear}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Advices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    padding: 10,
  },
  title: {
    ...FONTS.h2,
    letterSpacing: -0.8,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  sectionTitleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  sectionTitle: {
    backgroundColor: COLORS.primaryColor,
    width: 160,
    height: 35,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomLeftRadius: SIZES.base * 1.9,
    borderTopRightRadius: SIZES.base * 1.9,
  },
  sectionTitleText: {
    color: COLORS.white,
    ...FONTS.h3,
    fontSize: 17,
  },
  sectionContentContainer: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginHorizontal: 5,
    width: SIZES.width / 2.3,
    height: 215,
    borderRadius: 10,

    justifyContent: "space-around",
    backgroundColor: "#EFF4F4",
    marginVertical: 5,
  },
});