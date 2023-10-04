import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../../src/store/actions";
import { FlatList } from "react-native-gesture-handler";
import {
  selectActualLanguage,
  selectEventsData,
  selectWordsLang,
} from "../../../src/store/selectors";
import { PreloaderComponent } from "../../../src/components";
import EventCard from "../../../src/components/EventCard";
import { router } from "expo-router";

const EventsList = () => {
  const dispatch = useDispatch();
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const eventsData = useSelector(selectEventsData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllEvents());
      setQueriesCompleted(true);
    }
    fetchData();
  }, []);
  if (!queriesCompleted) {
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
          color: "#5097ff",
        }}
      >
        {wordsLanguage[actualLanguage][2]}
      </Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        data={eventsData}
        renderItem={({ item }) => (
          <EventCard
            onPress={() => router.push(`(stack)/events/${item.nid}`)}
            title={item.title}
            place={item.field_place}
            start={item.field_date}
            end={item.field_end_date}
            image={`https://bogotadc.travel${
              item.field_imagen_listado_events
                ? item.field_imagen_listado_events
                : "/img/noimg.png"
            }`}
          />
        )}
      />
    </View>
  );
};

export default EventsList;
