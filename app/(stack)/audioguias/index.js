import { View, Text, FlatList, Image, ImageBackground } from "react-native";
import React from "react";
import {
  CardAtractivo,
  CardAudioguide,
  PreloaderComponent,
} from "../../../src/components";
import { Pressable } from "react-native";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";
import { windowHeight } from "../../../src/constants/ScreenWidth";

const list = () => {
  const actualLanguage = useSelector(selectActualLanguage);
  const wordsLanguage = useSelector(selectWordsLang);
  const [audioGuides, setAudioGuides] = React.useState(null);
  React.useEffect(() => {
    const getaudioGuides = async () => {
      const data = await fetchBogotaDrplV2("/aguides/all/all", actualLanguage);
      setAudioGuides(data);
    };
    getaudioGuides();
  }, []);

  if (!audioGuides) {
    return <PreloaderComponent />;
  }

  return (
    <View>
      <Text
        style={{
          fontFamily: "MuseoSans_900",
          fontSize: 30,
          textAlign: "center",
          paddingVertical: 20,
          color: "#E50728",
        }}
      >
        {wordsLanguage[actualLanguage][5]}
      </Text>
      <FlatList
        numColumns={2}
        style={{ height: windowHeight - 150 }}
        contentContainerStyle={{ padding: 5, paddingBottom: 25 }}
        data={audioGuides}
        renderItem={({ item }) => (
          <CardAudioguide
            title={item.title}
            image={`https://bogotadc.travel${item.field_mainimg}`}
            onPress={() => router.push(`(stack)/audioguias/${item.nid}`)}
          />
        )}
      />
    </View>
  );
};

export default list;
