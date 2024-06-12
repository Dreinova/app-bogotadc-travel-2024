import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../../src/store/actions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";
import {
  selectActualLanguage,
  selectActualLocation,
  selectBlogsData,
  selectWordsLang,
} from "../../../src/store/selectors";
import { PreloaderComponent } from "../../../src/components";
import { router } from "expo-router";
import CardBlog from "../../../src/components/CardBlog";

const List = () => {
  const dispatch = useDispatch();
  const actualLocation = useSelector(selectActualLocation);
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const blogData = useSelector(selectBlogsData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllBlogs());
      setQueriesCompleted(true);
    }
    fetchData();
  }, [actualLanguage]);
  if (!queriesCompleted) {
    return <PreloaderComponent />;
  }
  console.log(blogData);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: "MuseoSans_700",
          fontSize: 30,
          textAlign: "center",
          paddingVertical: 20,
          color: "#35498e",
        }}
      >
        {wordsLanguage[actualLanguage][65]}
      </Text>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
        data={blogData}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <CardBlog
            isHorizontal
            onPress={() => router.navigate(`(tabs)/blog/${item.nid}`)}
            title={item.title}
            intro={item.field_intro_blog}
            image={`https://bogotadc.travel${
              item.field_image ? item.field_image : "/img/noimg.png"
            }`}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

export default List;
