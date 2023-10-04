import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { fetchAllWords, setLanguage } from "../src/store/actions";
const logoWhite = require("../assets/images/logo_bogota.png");

const Page = () => {
  const dispatch = useDispatch();

  const setActualLanguage = (lang) => {
    dispatch(setLanguage(lang));
    router.push("/(tabs)");
  };

  let textsLanguage = [
    "Escoge tu idioma",
    "Choose your language",
    "Choisissez votre langue",
    "Escolha seu idioma",
  ];

  let arrayAvailableLanguages = [
    {
      name: "Español",
      flag: "CO",
      slug: "es",
    },
    {
      name: "Portugues",
      flag: "BR",
      slug: "pt-br",
    },
    {
      name: "Ingles",
      flag: "US",
      slug: "en",
    },
    {
      name: "Frances",
      flag: "FR",
      slug: "fr",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllWords());
    };

    fetchData();
  }, [dispatch]);

  return (
    <ImageBackground
      source={{ uri: "https://bogotadc.travel/img/footerbanner.jpg" }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
      >
        <Image
          source={logoWhite}
          style={{ width: 120, resizeMode: "contain", height: 120 }}
        />
        <FlatList
          horizontal
          contentContainerStyle={{
            flexDirection: "row",
            gap: 30,
            marginBottom: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          data={arrayAvailableLanguages}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setActualLanguage(item.slug)}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                {
                  overflow: "hidden",
                  width: 40,
                  height: 40,
                  borderRadius: 40 / 2,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Image
                resizeMode="cover"
                source={{
                  uri: `https://flagsapi.com/${item.flag}/flat/64.png`,
                }}
                style={{
                  width: 64,
                  height: 64,
                  overflow: "hidden",
                  resizeMode: "cover",
                }}
              />
            </Pressable>
          )}
        />
        <View style={{ flex: 1 }}>
          {textsLanguage.map((txt, i) => (
            <Text
              key={i}
              style={{
                textAlign: "center",
                marginVertical: 5,
                fontSize: 18,
                fontFamily: "MuseoSans_700",
                color: "#FFF",
              }}
            >
              {txt}
            </Text>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Page;
