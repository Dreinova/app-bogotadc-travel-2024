import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectActualLanguage, selectWordsLang } from "../store/selectors";
import { windowWidth } from "../constants/ScreenWidth";

const ComoLlegar = ({ onPress }) => {
  const actualLanguage = useSelector(selectActualLanguage);
  const wordsLanguage = useSelector(selectWordsLang);
const aspectRatioHeight = (windowWidth - 40) * (9 / 16);
  return (
    <Pressable
      style={{ alignSelf: "center", marginBottom: 30 }}
      onPress={onPress}
    >
      <ImageBackground
        source={{
          uri: "https://visitbogota.co/img/map_1.jpg",
        }}
        style={{
          width: windowWidth - 40,
      height: aspectRatioHeight,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
        }}
      >
      </ImageBackground>
    </Pressable>
  );
};

export default ComoLlegar;
