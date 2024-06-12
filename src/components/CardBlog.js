import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { windowHeight, windowWidth } from "../constants/ScreenWidth";
import { Colors } from "../constants";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

const CardBlog = ({ image, title, onPress, intro, isHorizontal }) => {
  const systemFonts = [...defaultSystemFonts, "MuseoSans_700", "MuseoSans_900"];

  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  const source = {
    html: intro,
  };

  const tagsStyles = {
    p: {
      textAlign: "left",
      color: "#FFF",
      fontSize:22,
      fontFamily: "MuseoSans_700",
    },
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: isHorizontal ? windowWidth - 40 : windowWidth,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <ImageBackground
        style={[
          {
            height: isHorizontal ? windowHeight - 250 : windowWidth,
            
          },
          isHorizontal && { borderRadius: 10, overflow: "hidden" },
        ]}
        source={{ uri: image }}
        onLoad={handleImageLoad}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.3)",
            flex: 1,
            justifyContent: "flex-end",
            padding: 20,
          }}
        >
          <View style={{maxWidth:280}}>

          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_700",
              fontSize: 28,
              textShadowColor: "rgba(0, 0, 0, .7)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_500",
              fontSize: 14,
            }}
          >
            {intro}
          </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default CardBlog;
