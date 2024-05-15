import React from "react";
import {
  Image,
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
  isEvent,
  start,
  end,
}) => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  let monthStart, dayStart, yearStart;
  let monthEnd, dayEnd, yearEnd;
  if (start) {
    const dateStart = new Date(start);
    const optionsdateStart = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const dateFormatteddateStart = dateStart.toLocaleDateString(
      "en-US",
      optionsdateStart
    );
    monthStart = dateFormatteddateStart.substring(0, 3);
    dayStart = dateFormatteddateStart.substring(4, 6);
    yearStart = dateFormatteddateStart.substring(7);
  }
  if (end) {
    const dateEnd = new Date(end);
    const optionsdateEnd = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const dateFormatteddateEnd = dateEnd.toLocaleDateString(
      "en-US",
      optionsdateEnd
    );

    monthEnd = dateFormatteddateEnd.substring(0, 3);
    dayEnd = dateFormatteddateEnd.substring(4, 6);
    yearEnd = dateFormatteddateEnd.substring(7);
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        isHorizontal ? { width: windowWidth / 2 - 20 } : { width: windowWidth - 40 },
        {
          justifyContent: "flex-end",
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <ImageBackground
        style={[
          {
            height: 150,
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
            fontSize: 16,
            textShadowColor: "rgba(0, 0, 0, .7)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 10,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        {isEvent && (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#E50728",
                padding: 10,
                marginTop: 5,
                borderRadius: 8,
                gap: 5,
                flexDirection: "row",
              }}
            >
              <Image
                source={{
                  uri: "https://visitbogota.co/vacacional/images/eventosIcono.png",
                }}
                style={{ width: 15, height: 15 }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_700",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {monthStart} {dayStart} {yearStart}
              </Text>
              {end && (<>
              <Text  style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_700",
                  fontSize: 12,
                  textAlign: "center",
                }}>-</Text>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_700",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {monthEnd} {dayEnd} {yearEnd}
              </Text>
              </>)}
            </View>
          </View>
        )} 
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
