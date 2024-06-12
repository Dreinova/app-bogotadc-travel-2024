import * as WebBrowser from "expo-web-browser";
import React from "react";
import VideoPlayer from "../../../src/components/VideoPlayer";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { windowWidth } from "../../../src/constants/ScreenWidth";
import {
  Accordion,
  CardInfo,
  PreloaderComponent,
} from "../../../src/components";
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Pressable,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { fetchBogotaDrpl } from "../../../src/api/imperdibles";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";

const info = (props) => {
  const [faqs, setFaqs] = React.useState([]);
  const [infoUtil, setInfoUtil] = React.useState([]);
  const [modalInfoVisible, setModalInfoVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [signlang, setSignlang] = React.useState([]);
  const [videoSource, setVideoSource] = React.useState("");
  const actualLanguage = useSelector(selectActualLanguage);
  const wordsLanguage = useSelector(selectWordsLang);
  // Variable de estado para controlar si las consultas han finalizado
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [infoSelected, setInfoSelected] = React.useState({
    title: "",
    field_download_file: "",
    body: "",
    field_cat_rel: "",
    field_address: "",
    field_image: "",
    nid: "",
    field_mini_img: "",
  });

  React.useEffect(() => {
    Promise.all([
      fetchBogotaDrpl("/signlang/all").then((data) =>
        data.filter((d) => d.field_imagen !== "")
      ),

      fetchBogotaDrpl(`/tripinfocat/faq`).then((data) =>
        Promise.all(
          data.map((cat) =>
            fetchBogotaDrpl(`/faq/${cat.tid}`).then((elements) =>
              elements.length > 0
                ? {
                    tid: cat.tid,
                    title: cat.name,
                    elements,
                  }
                : null
            )
          )
        ).then((organizedData) => organizedData.filter((item) => item !== null))
      ),

      fetchBogotaDrpl("/tripinfocat/cat_help_info").then((data) =>
        Promise.all(
          data.map((cat) =>
            fetchBogotaDrpl(`/tripinfo/${cat.tid}/all`).then((elements) => ({
              tid: cat.tid,
              title: cat.name,
              elements,
            }))
          )
        )
      ),
    ])
      .then(([signlangData, faqData, infoData]) => {
        // Actualizar el estado con la información correspondiente
        setSignlang(signlangData);
        setFaqs(faqData);
        setInfoUtil(infoData);

        // Marcar que las consultas han finalizado
        setQueriesCompleted(true);
      })
      .catch((error) => console.error(error));
  }, []);
  if (!queriesCompleted) {
    return <PreloaderComponent />;
  }
  return (
    <ScrollView
      style={{
        height: Dimensions.get("window").height,
      }}
      contentContainerStyle={{
        backgroundColor: "#FFF",
        minHeight: Dimensions.get("window").height,
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInfoVisible}
        onRequestClose={setModalInfoVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              height: "90%",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <ImageBackground
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                height: (windowWidth / 16) * 9,
                padding: 20,
                width: windowWidth,
                position: "relative",
              }}
              source={{
                uri: `https://bogotadc.travel${infoSelected.field_image}`,
              }}
            >
              <Pressable
                onPress={() => setModalInfoVisible(false)}
                style={{ position: "absolute", right: 15, top: 15 }}
              >
                <Ionicons name="close" size={35} color="#354999" />
              </Pressable>
              <Text
                style={{
                  color: "#FFF",
                  fontFamily: "MuseoSans_500",
                  fontSize: 25,
                  textAlign: "center",
                  textShadowColor: "rgba(0,0,0,.5)",
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 5,
                }}
              >
                {infoSelected.title}
              </Text>
            </ImageBackground>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {infoSelected.body && (
                <Text
                  style={{
                    color: "#333",
                    fontFamily: "MuseoSans_500",
                    fontSize: 16,
                    marginBottom: 30,
                  }}
                >
                  {infoSelected.body}
                </Text>
              )}
              {infoSelected.field_address && (
                <Text
                  style={{
                    color: "#333",
                    fontFamily: "MuseoSans_500",
                    fontSize: 16,
                  }}
                >
                  {infoSelected.field_address}
                </Text>
              )}
              {infoSelected.field_download_file && (
                <Pressable
                  onPress={() =>
                    WebBrowser.openBrowserAsync(
                      `https://bogotadc.travel${infoSelected.field_download_file}`
                    )
                  }
                >
                  <Text
                    style={{
                      color: "#354999",
                      fontFamily: "MuseoSans_500",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    Descargar Adjunto
                  </Text>
                </Pressable>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: "#354999",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          flexDirection: "row",
          gap: 15,
          marginBottom: 30,
        }}
      >
        <Octicons name="info" size={24} color="#FFF" />
        <Text
          style={{
            color: "#FFF",
            fontFamily: "MuseoSans_500",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {wordsLanguage[actualLanguage][44]}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {infoUtil.map((item) => (
          <View key={item.nid} style={{ marginBottom: 30 }}>
            <Text
              style={{
                color: "#333",
                fontFamily: "MuseoSans_500",
                fontSize: 30,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
            <FlatList
              horizontal
              data={item.elements}
              ItemSeparatorComponent={() => (
                <View style={{ marginHorizontal: 8 }} />
              )}
              keyExtractor={(element) => element.nid} // Asumiendo que cada elemento tiene una propiedad 'id'
              renderItem={({ item: element }) => (
                <CardInfo
                  item={element}
                  onPress={() => {
                    setInfoSelected(element);
                    setModalInfoVisible(true);
                  }}
                />
              )}
            />
          </View>
        ))}
        <Text
          style={{
            color: "#333",
            fontFamily: "MuseoSans_500",
            fontSize: 30,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          Recursos lengua de señas
        </Text>
        <FlatList
          style={{
            height: windowWidth / 2,
            marginBottom: 30,
          }}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          horizontal
          data={signlang}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 8 }} />
          )}
          fadingEdgeLength={10}
          keyExtractor={(element) => element.nid} // Asumiendo que cada elemento tiene una propiedad 'id'
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setVideoSource(
                    `https://bogotadc.travel${item.field_langfile}`
                  );
                  setModalVisible(true);
                }}
              >
                <ImageBackground
                  style={{
                    width: windowWidth - 120,
                    height: windowWidth / 2 - 30,
                    overflow: "hidden",
                    alignItems: "center",
                    borderRadius: 8,
                    justifyContent: "flex-end",
                    padding: 5,
                  }}
                  source={{
                    uri: `https://bogotadc.travel${item.field_imagen}`,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: "MuseoSans_500",
                      fontSize: 13,
                      textAlign: "center",
                      textShadowColor: "rgba(0,0,0,.5)",
                      textShadowOffset: { width: 2, height: 2 },
                      textShadowRadius: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                </ImageBackground>
              </Pressable>
            );
          }}
        />
        <Text
          style={{
            color: "#333",
            fontFamily: "MuseoSans_500",
            fontSize: 30,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          Preguntas Frecuentes
        </Text>
        {faqs.map((item) => {
          const colorTitle = (type) => {
            switch (type) {
              case "4":
                return "#354999";
              case "5":
                return "#354999";
              case "6":
                return "#354999";
            }
          };

          return (
            <View>
              <Text
                style={{
                  fontSize: 30,
                  color: colorTitle(item.tid),
                  textAlign: "center",
                  paddingVertical: 15,
                  fontFamily: "MuseoSans_500",
                }}
              >
                {item.title}
              </Text>
              {item.elements.map((element) => (
                <Accordion
                  colorTitle={colorTitle(item.tid)}
                  small
                  title={element.title}
                  key={item.tid}
                >
                  <Text>{element.body_1}</Text>
                </Accordion>
              ))}
            </View>
          );
        })}
      </View>
      <VideoPlayer
        videoSource={videoSource}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default info;
