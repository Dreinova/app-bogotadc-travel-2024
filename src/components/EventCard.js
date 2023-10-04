import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../constants/ScreenWidth";
import { Colors } from "../constants";

const EventCard = ({
  image,
  title,
  isHorizontal,
  place,
  onPress,
  subtitle,
  isAudioGuide,
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
            height: windowHeight / 4,
          },
        ]}
        source={{ uri: image }}
        onLoad={handleImageLoad}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.6)",
            flex: 1,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_900",
              fontSize: 30,
              textShadowColor: "rgba(0, 0, 0, .7)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_900",
              fontSize: 14,
              textShadowColor: "rgba(0, 0, 0, .7)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {place}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <View
              style={{
                backgroundColor: "#ff7c47",
                padding: 15,
                borderRadius: 25,
                gap: 5,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_700",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {monthStart}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_700",
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                {dayStart}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_700",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {yearStart}
              </Text>
            </View>
            {end && (
              <View
                style={{
                  backgroundColor: "#ff7c47",
                  padding: 15,
                  gap: 5,
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "MuseoSans_700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {monthEnd}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "MuseoSans_700",
                    fontSize: 22,
                    textAlign: "center",
                  }}
                >
                  {dayEnd}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "MuseoSans_700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {yearEnd}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default EventCard;
