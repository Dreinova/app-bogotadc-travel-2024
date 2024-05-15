import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../../src/store/actions";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList } from "react-native-gesture-handler";
import {
  selectActualLanguage,
  selectActualLocation,
  selectEventsData,
  selectWordsLang,
} from "../../../src/store/selectors";
import { CardAtractivo, PreloaderComponent, Switch } from "../../../src/components";
import EventCard from "../../../src/components/EventCard";
import { router } from "expo-router";
import { windowHeight } from "../../../src/constants/ScreenWidth";

const List = () => {
  const dispatch = useDispatch();
  const actualLocation = useSelector(selectActualLocation);
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const eventsData = useSelector(selectEventsData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllBlogs());
      setQueriesCompleted(true);
    }
    fetchData();
  }, []);
  if (!queriesCompleted) {
    return <PreloaderComponent />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Switch
        size={50}
        onPress={async () => {
          setIsActive((isActive) => !isActive);
          if (isActive) {
            const placeCloseToMe = await fetch(
              `https://bogotadc.travel/g/closetome/?closeto=${actualLocation.coords.latitude},${actualLocation.coords.longitude}`
            )
              .then((res) => res.json())
              .then((data) => console.log(data.length));
          }
        }}
        isActive={isActive}
      /> */}

      <Text
        style={{
          fontFamily: "MuseoSans_900",
          fontSize: 30,
          textAlign: "center",
          paddingVertical: 20,
          color: "#E50728",
        }}
      >
        {wordsLanguage[actualLanguage][65]}
      </Text>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        data={eventsData}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}
        renderItem={({ item }) => (
          <CardAtractivo
            onPress={() => router.push(`(stack)/blog/${item.nid}`)}
            title={item.title}
            image={`https://bogotadc.travel${
              item.field_image
                ? item.field_image
                : "/img/noimg.png"
            }`}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

export default List;
