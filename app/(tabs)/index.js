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
import { fetchBogota, fetchBogotaDrpl } from "../../src/api/imperdibles";
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
  const menuLinks = [
    {
      title: wordsLanguage[actualLanguage][1],
      image: "/drpl/sites/default/files/2021-12/Recurso%2033.jpg",
      link: "descubre",
    },
    {
      title: wordsLanguage[actualLanguage][2],
      image: "/drpl/sites/default/files/2021-12/Recurso%2034.jpg",
      link: "(stack)/events",
    },
    {
      title: wordsLanguage[actualLanguage][3],
      image: "/drpl/sites/default/files/2021-12/Recurso%2031.jpg",
      link: "(stack)/restaurantes",
    },
    {
      title: wordsLanguage[actualLanguage][4],
      image: "/drpl/sites/default/files/2021-12/Recurso%2036.jpg",
      link: "(stack)/hoteles",
    },
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
    {
      title: wordsLanguage[actualLanguage][7],
      image: "/drpl/sites/default/files/2021-12/Recurso%2037.jpg",
      link: "(stack)/info",
    },
  ];
  const [bestPlaces, setbestPlaces] = React.useState([]);
  const [savedplaces, setSavedplaces] = React.useState([]);
  const [impplaces, setImpplaces] = React.useState([]);
  // Variable de estado para controlar si las consultas han finalizado
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  React.useEffect(() => {
    Promise.all([
      fetchBogota("/bestplaces/"),
      fetchBogota("/savedplaces/?user=443"),
      fetchBogotaDrpl("/impplaces"),
    ])
      .then(([bestPlacesData, savedPlacesData, impPlacesData]) => {
        setbestPlaces(bestPlacesData);
        setSavedplaces(savedPlacesData);
        setImpplaces(impPlacesData);
        // Marcar que las consultas han finalizado
        setQueriesCompleted(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const HomeMenuArray = menuLinks.map(({ title, image, link }) => ({
    title: title.trim(),
    image,
    link,
  }));
  const [isActive, setIsActive] = React.useState(false);
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
      {HomeMenuArray.map((item, i) => (
        <Pressable
          key={i}
          onPress={() => router.push(item.link)}
          style={({ pressed }) => [
            {
              paddingVertical: 20,
              paddingHorizontal: 10,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Image
            source={{
              uri: `https://bogotadc.travel${item.image}`,
            }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontFamily: "MuseoSans_900",
                color: Colors.white,
                textShadowColor: "rgba(0, 0, 0, 1)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 10,
              }}
            >
              {item.title}
            </Text>
            <FontAwesome name="chevron-right" size={20} color="#FFF" />
          </View>
        </Pressable>
      ))}
      {/* <Accordion title={wordsLanguage[actualLanguage][8]}>
        {savedplaces.length == 0 && (
          <Pressable
            style={{
              backgroundColor: "#F0f0f0",
              borderRadius: 10,
              height: 80,
              marginBottom: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#666",
                fontFamily: "MuseoSans_700",
                fontSize: 50,
              }}
            >
              +
            </Text>
          </Pressable>
        )}
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <VirtualizedList
            fadingEdgeLength={15}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 2 }} />
            )}
            horizontal
            data={savedplaces}
            getItem={(data, index) => data[index]}
            getItemCount={() => savedplaces.length}
            keyExtractor={(item) => item.nid}
            renderItem={({ item }) => (
              <CardAtractivo
                onPress={() => router.push(`(stack)/atractivos/${item.nid}`)}
                isHorizontal
                title={item.title}
                image={`https://bogotadc.travel${item.field_cover_image}`}
              />
            )}
          />
        </View>
      </Accordion> */}
      <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
        <Text style={styles.title}>{wordsLanguage[actualLanguage][9]}</Text>
        <FlatList
          fadingEdgeLength={15}
          ItemSeparatorComponent={() => (
            <View style={{ paddingHorizontal: 2 }} />
          )}
          horizontal
          data={impplaces}
          keyExtractor={(item) => item.nid}
          renderItem={({ item }) => (
            <CardAtractivo
              onPress={() => router.push(`(stack)/atractivos/${item.nid}`)}
              isHorizontal
              title={item.title}
              image={`https://bogotadc.travel${item.field_cover_image}`}
            />
          )}
        />
      </View>
      <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
        <Text style={styles.title}>{wordsLanguage[actualLanguage][10]}</Text>
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <VirtualizedList
            fadingEdgeLength={15}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 2 }} />
            )}
            horizontal
            data={bestPlaces}
            getItem={(data, index) => data[index]}
            getItemCount={() => bestPlaces.length}
            keyExtractor={(item) => item.nid}
            renderItem={({ item }) => (
              <CardAtractivo
                onPress={() => router.push(`(stack)/atractivos/${item.nid}`)}
                isHorizontal
                title={item.title}
                image={`https://bogotadc.travel${item.field_cover_image}`}
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
    color: "#266DC4",
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
