import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
} from "react-native";
import { windowHeight, windowWidth } from "../constants/ScreenWidth";
import { Colors } from "../constants";
import { number_format, truncateString } from "../api/imperdibles";
import { router } from "expo-router";

const itemsPerRow = 3;

const HorizontalFlatListWithRows = ({ data }) => {
  const rows = [];
  for (let i = 0; i < Math.ceil(data.length / itemsPerRow); i++) {
    const start = i * itemsPerRow;
    const end = Math.min(start + itemsPerRow, data.length);
    rows.push(data.slice(start, end));
  }

  const renderRow = ({ item }) => {
    return (
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`(stack)/planes/${item.nid}`)}
            style={[
              styles.item,
              {
                width: windowWidth / 2,
                height: windowHeight / 3,
                padding: 2,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            ]}
          >
            <ImageBackground
              style={{ flex: 1 }}
              source={{
                uri: `https://bogotadc.travel${
                  item.field_img ? item.field_img : "/img/noimg.png"
                }`,
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,.3)",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <View
                    style={{
                      backgroundColor: "#ff7c47",
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "flex-end",
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: "MuseoSans_900",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      {item.field_percent}%
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: "MuseoSans_900",
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      DCTO
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "relative",
                      alignItems: "flex-end",
                      paddingVertical: 10,
                      paddingLeft: 25,
                      paddingRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: "MuseoSans_900",
                        fontSize: 15,
                        textShadowColor: "rgba(0, 0, 0, .7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 10,
                        textAlign: "center",
                      }}
                    >
                      ${number_format(item.field_pa, 0, ".", ".")}
                    </Text>
                    <View
                      style={{
                        position: "absolute",
                        height: 2,
                        width: "50%",
                        backgroundColor: "#FFF",
                        top: 15,
                        transform: [
                          {
                            rotate: "-2deg",
                          },
                        ],
                      }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: "#5097ff",
                      marginBottom: 15,
                      paddingVertical: 5,
                      paddingLeft: 25,
                      paddingRight: 5,
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: "MuseoSans_900",
                        fontSize: 18,
                        textShadowColor: "rgba(0, 0, 0, .7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 10,
                        textAlign: "center",
                      }}
                    >
                      ${number_format(item.field_pd, 0, ".", ".")}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#103b6f",
                    padding: 15,
                    flex: 0.5,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: "MuseoSans_900",
                      fontSize: 16,
                      textShadowColor: "rgba(0, 0, 0, .7)",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 10,
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    {truncateString(item.title, 40)}
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: "MuseoSans_500",
                      fontSize: 14,
                      textShadowColor: "rgba(0, 0, 0, .7)",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    {truncateString(item.field_pb_oferta_desc_corta, 70)}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        )}
        keyExtractor={(item, index) => `sub_item_${index}`}
        horizontal
      />
    );
  };

  return (
    <FlatList
      data={rows}
      renderItem={renderRow}
      keyExtractor={(item, index) => `row_${index}`}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
});

export default HorizontalFlatListWithRows;
