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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { windowWidth } from "../constants/ScreenWidth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActualLanguage,
  selectActualUser,
  selectWordsLang,
} from "../store/selectors";
import { logOutUser, setLanguage } from "../store/actions";
import { Colors } from "../constants";

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
  const ActualUser = useSelector(selectActualUser);

  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const [modalVisible, setModalVisible] = React.useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const menuLinks = [
    {
      title: wordsLanguage[actualLanguage][1],
      image: "/drpl/sites/default/files/2021-12/Recurso%2033.jpg",
      link: "descubre",
    },
    // {
    //   title: wordsLanguage[actualLanguage][65],
    //   image: "/drpl/sites/default/files/2021-12/Recurso%2030.jpg",
    //   link: "(stack)/blog",
    // },
    {
      title: wordsLanguage[actualLanguage][2],
      image: "/drpl/sites/default/files/2021-12/Recurso%2034.jpg",
      link: "(stack)/events",
    },
    // {
    //   title: wordsLanguage[actualLanguage][3],
    //   image: "/drpl/sites/default/files/2021-12/Recurso%2031.jpg",
    //   link: "(stack)/restaurantes",
    // },
    // {
    //   title: wordsLanguage[actualLanguage][4],
    //   image: "/drpl/sites/default/files/2021-12/Recurso%2036.jpg",
    //   link: "(stack)/hoteles",
    // },
    {
      title: wordsLanguage[actualLanguage][5],
      image: "/drpl/sites/default/files/2021-12/Recurso%2035.jpg",
      link: "(stack)/audioguias",
    },
    {
      title: wordsLanguage[actualLanguage][6],
      image: "/drpl/sites/default/files/2021-12/Recurso%2030.jpg",
      link: "(stack)/planes",
    },
   
    // {
    //   title: wordsLanguage[actualLanguage][7],
    //   image: "/drpl/sites/default/files/2021-12/Recurso%2037.jpg",
    //   link: "(stack)/info",
    // },
  ];
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
            <Ionicons name="close" size={35} color="black" />
          </Pressable>
          <Image
            source={require("../../assets/images/logo_bogota_appbar.png")}
            style={{
              width: 100,
              height: 60,
            }}
            resizeMode="contain"
          />
          
          <View style={{ flex: 1, alignItems: "center", gap: 30 }}>
            {menuLinks.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  router.push(item.link);
                  closeModal();
                }}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <Text style={styles.textMenu}>{item.title}</Text>
              </Pressable>
            ))}

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
        <Ionicons name="menu" size={40} color="#333" />
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
