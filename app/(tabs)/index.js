import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
  VirtualizedList,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { windowWidth } from "../../src/constants/ScreenWidth";
import {
  Accordion,
  CardAtractivo,
  PreloaderComponent,
} from "../../src/components";
import {
  fetchBogota,
  fetchBogotaDrpl,
  fetchBogotaDrplV2,
  fetchBogotaGetFolder,
} from "../../src/api/imperdibles";
import { Colors } from "../../src/constants";
import { router } from "expo-router";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../src/store/selectors";
import { useSelector } from "react-redux";

const ITEM_WIDTH = windowWidth + 40;
export default function Page() {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const [BogNatural, setBogNatural] = React.useState([]);
  const [BogCultural, setBogCultural] = React.useState([]);
  const [Blog, setBlog] = React.useState([]);
  const [eventsProx, setEventsProx] = React.useState([]);
  // Variable de estado para controlar si las consultas han finalizado
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  React.useEffect(() => {
    Promise.all([
      fetchBogotaDrplV2("/eventsDestacados"),
      fetchBogotaDrpl("/products/all/8"),
      fetchBogotaDrpl("/products/all/7"),
      fetchBogotaGetFolder(`/vacacional/g/lastBlogs/?lang=${actualLanguage}`),
    ])
      .then(([eventsData, naturalData, culturalData, blogData]) => {
        setBogNatural(naturalData);
        setBogCultural(culturalData);
        setBlog(blogData);
        function compareDates(a, b) {
          const dateA = new Date(a.field_date);
          const dateB = new Date(b.field_date);
          return dateA - dateB;
        }

        // Ordenar el arreglo por la fecha inicial
        eventsData.sort(compareDates);
        setEventsProx(eventsData);
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
      contentContainerStyle={{
        backgroundColor: "#FFF",
        minHeight: Dimensions.get("window").height,
      }}
    >
      <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Image
            source={{
              uri: "https://visitbogota.co/vacacional/images/eventos.png",
            }}
            style={{
              width: 45,
              height: 45,
              resizeMode: "contain",
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              textTransform: "uppercase",
              color: "#e50728",
              fontFamily: "MuseoSans_900",
            }}
          >
            {wordsLanguage[actualLanguage][2]}
          </Text>
        </View>
        <FlatList
          fadingEdgeLength={15}
          ItemSeparatorComponent={() => (
            <View style={{ paddingHorizontal: 2 }} />
          )}
          horizontal
          data={eventsProx}
          keyExtractor={(item) => item.nid}
          renderItem={({ item }) => (
            <CardAtractivo
              end={item.field_end_date}
              image={`https://bogotadc.travel${item.field_cover_image}`}
              isEvent
              isHorizontal
              onPress={() => router.push(`(stack)/events/${item.nid}`)}
              start={item.field_date}
              title={item.title}
            />
          )}
        />
      </View>
      <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Image
            source={{
              uri: "https://visitbogota.co/vacacional/images/descubre_icon.png",
            }}
            style={{
              width: 45,
              height: 45,
              resizeMode: "contain",
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              textTransform: "uppercase",
              color: "#e50728",
              fontFamily: "MuseoSans_900",
            }}
          >
            {wordsLanguage[actualLanguage][1]}
          </Text>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.title}>{wordsLanguage[actualLanguage][62]}</Text>
          <FlatList
            fadingEdgeLength={15}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 2 }} />
            )}
            horizontal
            data={BogNatural}
            keyExtractor={(item) => item.nid}
            renderItem={({ item }) => (
              <CardAtractivo
                onPress={() =>
                  router.push({
                    pathname: "descubre",
                    params: { filterID: item.nid },
                  })
                }
                isHorizontal
                title={item.title}
                image={`https://bogotadc.travel${item.field_cover_image}`}
              />
            )}
          />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.title}>{wordsLanguage[actualLanguage][63]}</Text>
          <FlatList
            fadingEdgeLength={15}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 2 }} />
            )}
            horizontal
            data={BogCultural}
            keyExtractor={(item) => item.nid}
            renderItem={({ item }) => (
              <CardAtractivo
                onPress={() =>
                  router.push({
                    pathname: "descubre",
                    params: { filterID: item.nid },
                  })
                }
                isHorizontal
                title={item.title}
                image={`https://bogotadc.travel${item.field_cover_image}`}
              />
            )}
          />
        </View>
      </View>
      <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Image
            source={{
              uri: "https://visitbogota.co/vacacional/images/descubre_icon.png",
            }}
            style={{
              width: 45,
              height: 45,
              resizeMode: "contain",
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              textTransform: "uppercase",
              color: "#e50728",
              fontFamily: "MuseoSans_900",
            }}
          >
            {wordsLanguage[actualLanguage][65]}
          </Text>
        </View>
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <VirtualizedList
            fadingEdgeLength={15}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 2 }} />
            )}
            horizontal
            data={Blog}
            getItem={(data, index) => data[index]}
            getItemCount={() => Blog.length}
            keyExtractor={(item) => item.nid}
            renderItem={({ item }) => (
              <CardAtractivo
                onPress={() => router.push(`(stack)/blog/${item.nid}`)}
                isHorizontal
                title={item.title}
                image={`https://bogotadc.travel${item.field_image}`}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10, // Espaciado interno para los elementos
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#e50728",
    fontFamily: "MuseoSans_900",
    marginBottom: 15,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,.3)",
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20,
  },
  textContainerTitle: {
    color: "white",
    fontSize: 23,
    fontFamily: "MuseoSans_900",
    textAlign: "right",
    marginBottom: 5,
  },
  textContainerDesc: {
    textAlign: "right",
    fontFamily: "MuseoSans_500",
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  textContainerBtn: {
    textAlign: "right",
    fontFamily: "MuseoSans_500",
    color: "white",
    fontSize: 16,
  },
  bannerBtn: {
    color: "#fff",
    fontSize: 21,
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  cardOthers: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardOthersImage: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth / 3 - 20,
    height: windowWidth / 3 - 20,
    borderRadius: 21,
    marginBottom: 5,
    overflow: "hidden",
  },
  cardOthersText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "MuseoSans_900",
  },
  cardsOthersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blogCardCategory: {
    fontSize: 14,
    color: "#7f7f7f",
    fontFamily: "MuseoSans_900",
    marginBottom: 8,
  },
  blogCardTitle: {
    fontSize: 18,
    color: "#7f7f7f",
    fontFamily: "MuseoSans_900",
    marginBottom: 10,
  },
  blogCardDesc: {
    color: "#636262",
    fontFamily: "MuseoSans_100",
    marginBottom: 15,
    fontSize: 16,
  },
});
