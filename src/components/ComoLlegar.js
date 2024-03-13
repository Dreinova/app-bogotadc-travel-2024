import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectActualLanguage, selectWordsLang } from "../store/selectors";

const ComoLlegar = ({ onPress }) => {
  const actualLanguage = useSelector(selectActualLanguage);
  const wordsLanguage = useSelector(selectWordsLang);
  return (
    <Pressable
      style={{ alignSelf: "center", marginBottom: 30 }}
      onPress={onPress}
    >
      <ImageBackground
        source={{
          uri: "https://bogotadc.travel/img/map.jpg",
        }}
        style={{
          width: 320 - 40,
          height: 320 - 40,
          borderRadius: 320 / 2 - 40,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF",
            width: 120,
            height: 120,
            borderRadius: 120 / 2,
            borderColor: "#E50728",
            borderWidth: 2,
            gap: 5,
          }}
        >
          <FontAwesome name="search" size={25} color="#E50728" />
          <Text style={{ color: "#E50728", fontFamily: "MuseoSans_700" }}>
            {wordsLanguage[actualLanguage][45]}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default ComoLlegar;
