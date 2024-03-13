import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { Colors } from "../../../src/constants";
import { PreloaderComponent } from "../../../src/components";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";

const SingleEvent = () => {
  const { id } = useLocalSearchParams();
  const [events, setEvents] = React.useState(null);
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);

  React.useEffect(() => {
    const getSingleEvents = async () => {
      const data = await fetchBogotaDrplV2(
        `/events/${id}/all/all/all`,
        actualLanguage
      );
      setEvents(data[0]);
    };
    getSingleEvents();
  }, []);

  if (!events) {
    return <PreloaderComponent />;
  }

  let DateStart;
  let DateEnd;
  if (events.field_date) {
    const dateStart = new Date(events.field_date);
    const optionsdateStart = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const dateFormatteddateStart = dateStart.toLocaleDateString(
      "es-ES",
      optionsdateStart
    );

    DateStart = dateFormatteddateStart;
  }
  if (events.field_end_date) {
    const dateEnd = new Date(events.field_end_date);
    const optionsdateEnd = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const dateFormatteddateEnd = dateEnd.toLocaleDateString(
      "es-ES",
      optionsdateEnd
    );

    DateEnd = dateFormatteddateEnd;
  }

  return (
    <ScrollView>
      <ImageBackground
        style={{
          width: windowWidth,
          height: windowWidth - 120,
        }}
        source={{
          uri: `https://bogotadc.travel${
            events.field_cover_image
              ? events.field_cover_image
              : "/img/noimg.png"
          }`,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.5)",
            flex: 1,
            padding: 20,
            justifyContent: "flex-end",
          }}
        >
          <Text style={[styles.text, { fontSize: 50 }]}>{events.title}</Text>
          <Text style={styles.text}>
            {DateStart}
            {" - "}
            {events.field_end_date && (
              <Text style={styles.text}>{DateEnd}</Text>
            )}
          </Text>
        </View>
      </ImageBackground>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <FontAwesome name="map-marker" size={30} color="#E50728" />
          <Text
            style={{
              color: "#333",
              fontFamily: "MuseoSans_700",
              fontSize: 20,
            }}
          >
            {events.field_place}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#333",
            lineHeight: 22,
            marginBottom: 30,
          }}
        >
          {events.body}
        </Text>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
            {
              width: windowWidth - 40,
              height: windowWidth - 40,
              borderRadius: windowWidth / 2 - 40,
              overflow: "hidden",
              marginBottom: 30,
            },
          ]}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              `https://www.google.com/maps/search/?api=1&query=${events.field_location.trim()}`
            )
          }
        >
          <ImageBackground
            source={{
              uri: "https://bogotadc.travel/img/map.jpg",
            }}
            style={{
              width: windowWidth - 40,
              height: windowWidth - 40,
              borderRadius: windowWidth / 2 - 40,
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
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_900",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, .7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  container: {
    flexDirection: "row", // Para que los Text se muestren en línea
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  firstLetter: {
    fontFamily: "MuseoSans_900",
    fontSize: 33, // Establece el tamaño de la primera letra
    color: "#777777", // Establece el color de la primera letra
    // Agrega otros estilos según tus preferencias
  },
});

export default SingleEvent;
