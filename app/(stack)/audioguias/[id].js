import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Colors } from "../../../src/constants";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PreloaderComponent } from "../../../src/components";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import { useLocalSearchParams } from "expo-router";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { TouchableOpacity } from "react-native";
import AudioPlayer from "../../../src/components/AudioPlayer";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";
import { useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SingleAudio = () => {
  const { id } = useLocalSearchParams();
  const actualLanguage = useSelector(selectActualLanguage);
  const [audioguide, setAudioguide] = React.useState(null);

  React.useEffect(() => {
    const getSingleaudioguide = async () => {
      const data = await fetchBogotaDrplV2(
        `/aguides/${id}/all`,
        actualLanguage
      );
      setAudioguide(data[0]);
    };
    getSingleaudioguide();
  }, [audioguide]);

  if (!audioguide) {
    return <PreloaderComponent />;
  }

  const audioTitles = audioguide.field_audiotitles
    .split(", ")
    .map((title) => title.trim());
  const audioPaths = audioguide.field_audios
    .split(", ")
    .map((path) => path.trim());

  const audioArray = audioTitles.map((title, index) => ({
    title,
    audio: `https://bogotadc.travel${audioPaths[index]}`,
  }));

  return (
     <GestureHandlerRootView style={{flex:1}}>
    <ImageBackground
      blurRadius={3}
      style={{
        flex: 1,
      }}
      source={{
        uri: `https://bogotadc.travel${
          audioguide.field_mainimg ? audioguide.field_mainimg : "/img/noimg.png"
        }`,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,.5)",
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{audioguide.title}</Text>
        <AudioPlayer
          audios={audioArray}
          image={`https://bogotadc.travel${
            audioguide.field_mainimg
              ? audioguide.field_mainimg
              : "/img/noimg.png"
          }`}
        />
      </View>
    </ImageBackground>

     </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_900",
    fontSize: 22,
    textShadowColor: "rgba(0, 0, 0, .7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginVertical: 15,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default SingleAudio;
