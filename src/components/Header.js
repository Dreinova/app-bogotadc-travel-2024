import React from "react";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { windowWidth } from "../constants/ScreenWidth";
import { useDispatch, useSelector } from "react-redux";
import { selectActualLanguage, selectWordsLang } from "../store/selectors";
import { setLanguage } from "../store/actions";

const Header = (props) => {
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
  const dispatch = useDispatch();

  const setActualLanguage = (lang) => {
    dispatch(setLanguage(lang));
    closeModal();
  };
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const [modalVisible, setModalVisible] = React.useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const menuModal = () => {
    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingTop: 80,
          }}
        >
          <Pressable
            onPress={closeModal}
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="ios-close-sharp" size={35} color="black" />
          </Pressable>
          <Image
            source={require("../../assets/images/logo_bogota_appbar.png")}
            style={{
              width: 100,
              height: 60,
            }}
            resizeMode="contain"
          />
          <FlatList
            horizontal
            contentContainerStyle={{
              flexDirection: "row",
              gap: 15,
              marginBottom: 15,
              height: 55,
            }}
            data={arrayAvailableLanguages}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setActualLanguage(item.slug)}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1 },
                  {
                    borderWidth: 3,
                    borderColor:
                      actualLanguage == item.slug ? "#ff7c47" : "transparent",
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
          <View style={{ flex: 1, alignItems: "center", gap: 30 }}>
            <Pressable onPress={() => {}}>
              <Text style={styles.textMenu}>
                {wordsLanguage[actualLanguage][16]}
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(stack)/politics")}>
              <Text style={styles.textMenu}>
                {wordsLanguage[actualLanguage][17]}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {menuModal()}
      <Image
        source={require("../../assets/images/logo_bogota_appbar.png")}
        style={{
          width: 100,
          height: 60,
          position: "absolute",
          left: windowWidth / 2 - 100 / 2,
        }}
        resizeMode="contain"
      />
      <Pressable onPress={openModal}>
        <Ionicons name="md-menu" size={40} color="#333" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textMenu: {
    fontSize: 22,
    color: "#777",
    fontFamily: "MuseoSans_700",
    textAlign: "center",
  },
});

export default Header;
