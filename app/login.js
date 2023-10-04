import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { selectActualLanguage, selectWordsLang } from "../src/store/selectors";
import { useSelector } from "react-redux";

const login = () => {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const [formValues, setFormValues] = React.useState({
    email: "",
    pass: "",
  });
  const [setsendedLoginInfo, setSetsendedLoginInfo] = React.useState(false);
  const sendLoginForm = async () => {
    setSetsendedLoginInfo(true);
    setTimeout(() => {
      setSetsendedLoginInfo(false);
    }, 1500);
  };
  return (
    <ImageBackground
      source={require("../assets/images/atardecer.png")}
      style={{ flex: 1 }}
    >
      <View
        style={{
          padding: 20,
          paddingHorizontal: 40,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo_bogota.png")}
          style={{ width: "100%", height: 70, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontSize: 30,
            color: "#FFF",
            fontFamily: "MuseoSans_900",
            textAlign: "center",
            marginVertical: 10,
            textShadowColor: "rgba(0, 0, 0, 1)",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 10,
          }}
        >
          {wordsLanguage[actualLanguage][46]}
        </Text>
        <TextInput
          value={formValues.email}
          placeholder={`${wordsLanguage[actualLanguage][42]}`}
          keyboardType="email-address"
          onChangeText={(text) => {
            setFormValues((prevState) => ({
              ...prevState,
              email: text,
            }));
          }}
          style={{
            fontSize: 16,
            borderColor: "#FFF",
            color: "#FFF",
            width: "100%",
            borderWidth: 2,
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 25,
            marginVertical: 10,
          }}
          placeholderTextColor="#FFF"
        />
        <TextInput
          value={formValues.pass}
          secureTextEntry
          placeholder={wordsLanguage[actualLanguage][47]}
          style={{
            fontSize: 16,
            borderColor: "#FFF",
            color: "#FFF",
            borderWidth: 2,
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginVertical: 10,
            width: "100%",
            borderRadius: 25,
          }}
          onChangeText={(text) => {
            setFormValues((prevState) => ({
              ...prevState,
              pass: text,
            }));
          }}
          placeholderTextColor="#FFF"
        />
        <Pressable
          onPress={sendLoginForm}
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ff7c47",
            width: "100%",
            borderRadius: 25,
            marginVertical: 10,
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "#FFF",
              fontFamily: "MuseoSans_900",
            }}
          >
            {setsendedLoginInfo
              ? `${wordsLanguage[actualLanguage][48]}...`
              : wordsLanguage[actualLanguage][16]}
          </Text>
          {setsendedLoginInfo && <ActivityIndicator color="#FFF" size={20} />}
        </Pressable>
        <Pressable
          style={{
            padding: 15,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#FFF",
              fontFamily: "MuseoSans_700",
              textDecorationColor: "#FFF",
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
          >
            {wordsLanguage[actualLanguage][49]}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: "#FFF",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          flex: 0.3,
          paddingTop: 50,
          padding: 20,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#52a0ff",
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "#FFF",
              fontFamily: "MuseoSans_900",
            }}
          >
            {wordsLanguage[actualLanguage][50]}
          </Text>
        </Pressable>
        <Text
          style={{
            color: "#777",
            fontFamily: "MuseoSans_700",
            fontSize: 14,
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          {wordsLanguage[actualLanguage][51]}
        </Text>
        <View
          style={{
            gap: 15,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Pressable>
            <AntDesign name="facebook-square" size={50} color="#1877f2" />
          </Pressable>
          <Pressable style={{ flexDirection: "row" }}>
            <AntDesign name="google" size={50} color="#ea4335" />
          </Pressable>
        </View>
        <Text
          style={{
            color: "#777",
            fontFamily: "MuseoSans_700",
            fontSize: 14,
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          {wordsLanguage[actualLanguage][52]}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default login;
