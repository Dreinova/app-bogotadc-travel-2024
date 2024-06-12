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
import { LinearGradient } from "expo-linear-gradient";
import IconSvg from "./IconSvg";
import { useSelector } from "react-redux";
import { selectActualLanguage, selectWordsLang } from "../store/selectors";

const CardEvento = ({ image, title, onPress, start, end, isHorizontal }) => {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
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
      actualLanguage == 'es' ? "es-ES":"en-US",
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
      actualLanguage == 'es' ? "es-ES":"en-US",
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
        {
          width: isHorizontal ? windowWidth - 40 : windowWidth - 120,
          justifyContent: "flex-end",
          opacity: pressed ? 0.8 : 1,
          borderRadius: 8,
          overflow: "hidden",
        },
      ]}
    >
      <ImageBackground
        style={[
          {
            height: isHorizontal ? 120 : 170,
            justifyContent: isHorizontal ? "flex-start" : "flex-end",
            flexDirection: isHorizontal ? "row" : "column",
          },
        ]}
        source={{ uri: image }}
        onLoad={handleImageLoad}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.3)"]}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={[
              {
                padding: 10,
                gap: 5,
              },
              isHorizontal && {
                flex: 0.5,
              },
            ]}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: "MuseoSans_700",
                fontSize: 22,
              }}
            >
              {title}
            </Text>
            <View
              style={{
                justifyContent: isHorizontal ? "flex-start" : "flex-end",
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <IconSvg
                  width="8"
                  height="12"
                  icon={`<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.21772 7.62328C8.15317 6.82485 8.15317 5.37926 7.21772 4.58083L3.29841 1.23559C2.00024 0.12756 0 1.05007 0 2.75681L0 9.4473C0 11.154 2.00024 12.0766 3.29841 10.9685L7.21772 7.62328Z" fill="white"/></svg>`}
                />
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "MuseoSans_700",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {monthStart} {dayStart} {yearStart}
                </Text>
                {end && (
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: "MuseoSans_700",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    {monthEnd} {dayEnd} {yearEnd}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default CardEvento;
