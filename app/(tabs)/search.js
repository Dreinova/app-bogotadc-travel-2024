import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  FlatList,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { fetchBogotaDrplV2 } from "../../src/api/imperdibles";
import CardAtractivo from "../../src/components/CardAtractivo";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../src/store/selectors";

export default function Page() {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const [searchValue, setSearchValue] = React.useState("");
  const [viewResponse, setViewResponse] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  const searchBogota = async () => {
    if (searchValue) {
      const data = await fetchBogotaDrplV2(
        `/search/${searchValue}`,
        actualLanguage
      );
      setSearchResults(data);
      setViewResponse(true);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          paddingHorizontal: 50,
          paddingVertical: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <FontAwesome
            name="search"
            size={30}
            color="#FFF"
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={searchBogota}
            placeholder={`${wordsLanguage[actualLanguage][14]}...`}
            style={{
              flex: 1,
              fontSize: 16,
              borderBottomColor: "#FFF",
              color: "#FFF",
              borderBottomWidth: 2,
              padding: 8,
            }}
            placeholderTextColor="#FFF"
          />
        </View>
        <Pressable
          onPress={searchBogota}
          style={{
            backgroundColor: "#FFF",
            borderRadius: 8,
            paddingVertical: 8,
            marginBottom: 20,
            paddingHorizontal: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#ff7c47",
              fontSize: 18,
              fontFamily: "MuseoSans_700",
            }}
          >
            {wordsLanguage[actualLanguage][14]}
          </Text>
        </Pressable>
      </View>
      {viewResponse && (
        <Text
          style={{
            fontSize: 22,
            fontFamily: "MuseoSans_900",
            textAlign: "center",
            color: "#FFF",
            marginBottom: 30,
          }}
        >
          {wordsLanguage[actualLanguage][15]} "{searchValue}"
        </Text>
      )}

      {viewResponse && (
        <FlatList
          numColumns={2}
          style={{ marginBottom: 30 }}
          contentContainerStyle={{
            borderRadius: 25,
            overflow: "hidden",
          }}
          ItemSeparatorComponent={() => (
            <View style={{ paddingHorizontal: 2 }} />
          )}
          data={searchResults}
          keyExtractor={(item) => item.nid}
          fadingEdgeLength={15}
          renderItem={({ item }) => {
            return (
              <CardAtractivo
                isHorizontal
                title={item.title}
                onPress={() => {
                  switch (item.type) {
                    case "Atractivos":
                      return router.push(`(stack)/atractivos/${item.nid}`);
                    case "PB - Ofertas":
                      return router.push(`(stack)/planes/${item.nid}`);
                    case "Atractivo":
                      return router.push(`(stack)/atractivos/${item.nid}`);

                    case "Alrededor":
                      return router.push(`(stack)/atractivos/${item.nid}`);

                    case "Artículo":
                      return router.push(`(stack)/blog/${item.nid}`);

                    case "Eventos":
                      return router.push(`(stack)/events/${item.nid}`);

                    default:
                      router.push("");
                  }
                }}
                subtitle={(() => {
                  switch (item.type) {
                    case "Atractivos":
                      return "Atractivo";
                    case "PB - Ofertas":
                      return "Oferta";
                    case "Atractivo":
                      return "Atractivo";

                    case "Alrededor":
                      return "Más allá de Bogota";

                    case "Artículo":
                      return "Blog";

                    case "Eventos":
                      return "Evento";

                    default:
                      return "";
                  }
                })()}
                image={`https://bogotadc.travel${
                  item.field_imagen_listado_events ||
                  item.field_img_portal ||
                  item.field_cover_image ||
                  item.field_pb_oferta_img_listado ||
                  item.field_image ||
                  "/img/noimg.png" // Ruta de una imagen de respaldo en caso de que todos los campos estén vacíos
                }`}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff7c47",
  },
});
