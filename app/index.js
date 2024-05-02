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
const splash = require("../assets/splash.png");

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
      router.push("/(tabs)");
    };

    fetchData();
  }, [dispatch]);

  return (
    <ImageBackground
      source={splash}
      style={{ flex: 1 }}
    >
    </ImageBackground>
  );
};

export default Page;
