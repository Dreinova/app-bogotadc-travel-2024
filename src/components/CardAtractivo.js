import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { windowWidth } from "../constants/ScreenWidth";
import { Colors } from "../constants";

const CardAtractivo = ({
  image,
  title,
  isHorizontal,
  onPress,
  subtitle,
  isAudioGuide,
}) => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        isHorizontal ? { width: windowWidth / 2 - 20 } : { width: windowWidth },
        {
          justifyContent: "flex-end",
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <ImageBackground
        style={[
          {
            height: windowWidth / 2,
            alignItems: "center",
            justifyContent: isAudioGuide ? "center" : "flex-end",
            padding: 10,
          },
        ]}
        source={{ uri: image }}
        onLoad={handleImageLoad}
      >
        {isAudioGuide && (
          <FontAwesome5 name="headphones" size={50} color="white" />
        )}
        <Text
          style={{
            color: Colors.white,
            fontFamily: "MuseoSans_900",
            fontSize: 14,
            textShadowColor: "rgba(0, 0, 0, .7)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 10,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_900",
              fontSize: 12,
              textShadowColor: "rgba(0, 0, 0, .7)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {subtitle}
          </Text>
        )}
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default CardAtractivo;
