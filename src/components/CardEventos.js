import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { windowWidth } from "../constants/ScreenWidth";
import { Colors } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import IconSvg from "./IconSvg";
import { useSelector } from "react-redux";
import { selectActualLanguage, selectWordsLang } from "../store/selectors";
const setMidnight = (dateString) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
};
const CardEvento = ({ image, title, onPress, start, end, isHorizontal }) => {

  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [dateTextAll, setDateTextAll] = useState("");

  const dateStart = useMemo(() => setMidnight(start), [start]);

  const dateEnd = useMemo(() => {
    let endDate;
    if (end.length === 10) {
      endDate = setMidnight(end);
      endDate.setDate(endDate.getDate() + 1);
    } else {
      endDate = setMidnight(end);
    }
    return endDate;
  }, [end]);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  let dateFormattedStart =dateStart.toLocaleDateString(
    actualLanguage == "es" ? "es-ES" : "en-US",
    options
  );
let dateFormattedEnd = dateEnd.toLocaleDateString(
    actualLanguage == "es" ? "es-ES" : "en-US",
    options
  );

  const alText = actualLanguage === "es" ? "al" : "to";
  const hastaElText = actualLanguage === "es" ? "Hasta el" : "Until";

  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  useEffect(() => {
    let dateText = "";
    if (!end) {
      dateText = dateFormattedStart;
    } else if (dateStart.getTime() === dateEnd.getTime()) {
      dateText = dateFormattedEnd;
    } else if (dateStart < today) {
      dateText = `${hastaElText} ${dateFormattedEnd}`;
    } else {
      dateText = `${dateFormattedStart} ${alText} ${dateFormattedEnd}`;
    }
    setDateTextAll(dateText);
  }, [end, dateStart, dateEnd, today, dateFormattedStart, dateFormattedEnd, alText, hastaElText]);


  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

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
            height: isHorizontal ? 160 : 170,
            justifyContent: isHorizontal ? "flex-start" : "flex-end",
            flexDirection: isHorizontal ? "row" : "column",
          },
        ]}
        source={{ uri: image }}
        onLoad={handleImageLoad}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.8)"]}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={[
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
                gap: 5,
              },
            ]}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: "MuseoSans_500",
                fontSize: 16,
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
                    fontFamily: "MuseoSans_500",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {dateTextAll}
                </Text>
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
