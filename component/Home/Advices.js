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
import { icons } from "../../constants";

const Advices = ({ isActive, navigation, advices }) => {
  const MAX_HEAR = Math.max.apply(
    Math,
    advices?.map((advice) => advice.countHear)
  );
  const popularAdvices = advices?.filter(
    (item) => item.countHear <= MAX_HEAR && item.countHear >= 5
  );

  const newEstAdvices = advices?.filter(
    (item) =>
      new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000) <=
      new Date(advices[0].createdAt.seconds * 1000)
  );

  return (
    <View style={styles.container}>
      {isActive === false ? (
        <>
          <View
            style={{
              zIndex: 2,
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundColor: "white",
              opacity: 0.7,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <View
            style={{
              zIndex: 3,
              height: "100%",
              width: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.lock}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text
              style={{
                padding: 10,
                textAlign: "center",
                marginVertical: 20,
                ...FONTS.h2,
              }}
            >
              Veuillez saisir votre code potager pour pouvoir accéder à cette
              section
            </Text>
          </View>
        </>
      ) : null}

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
              {popularAdvices?.map((item) =>
                itemFlatList({ item, navigation })
              )}
            </View>
          </View>

          {/* SECTION NOUVEAUX */}
          {newEstAdvices?.length ? (
            <View style={styles.sectionContainer}>
              {/* SECTION TITLE */}
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Nouveaux</Text>
                </View>
              </View>

              {/* SECTION CONTENT */}
              <View style={styles.sectionContentContainer}>
                {newEstAdvices?.map((item) =>
                  itemFlatList({ item, navigation })
                )}
              </View>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

const itemFlatList = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      key={item?.id}
      onPress={() =>
        navigation.navigate("Advice", {
          advice: item,
        })
      }
    >
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
          source={{ uri: item.imageUrl || item.imgUrl }}
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
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 3,
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
