import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../../src/store/actions";
import { FlatList } from "react-native-gesture-handler";
import {
  selectActualLanguage,
  selectActualLocation,
  selectEventsData,
  selectWordsLang,
} from "../../../src/store/selectors";
import { PreloaderComponent, Switch } from "../../../src/components";
import EventCard from "../../../src/components/EventCard";
import { router } from "expo-router";
import {
  fetchBogotaDrpl,
  fetchBogotaDrplV2,
} from "../../../src/api/imperdibles";
import { windowHeight } from "../../../src/constants/ScreenWidth";

// Ejemplo implementando el metodo POST:
async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const EventsList = () => {
  const dispatch = useDispatch();
  const actualLocation = useSelector(selectActualLocation);
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const eventsData = useSelector(selectEventsData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
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
        {wordsLanguage[actualLanguage][2]}
      </Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ height: windowHeight - 130 }}
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
