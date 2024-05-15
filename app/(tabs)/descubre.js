import React from "react";
import { Pressable, StyleSheet, FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchData, fetchPlacesWithFilters } from "../../src/store/actions";
import { CardAtractivo, PreloaderComponent } from "../../src/components";
import { router, useLocalSearchParams } from "expo-router";
import { fetchBogotaDrplV2 } from "../../src/api/imperdibles";
import { Colors } from "../../src/constants";

export default function TabTwoScreen() {
  const params = useLocalSearchParams();
  const [filterID, setFilterID] = React.useState(null);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [activeIndex, setactiveIndex] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [atractivos, setAtractivos] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setFilterID(params.filterID);
  }, [params.filterID, filterID]);
  // Variable de estado para controlar si las consultas han finalizado
  React.useEffect(() => {
    const requestAtractivosInit = async (tid) => {
      const atractivos = await fetchBogotaDrplV2(`/atractivos/all/${tid}`);
      const filterAtractivos = atractivos.map((atractivo) => ({
        title: atractivo.title,
        nid: atractivo.nid,
        field_cover_image: atractivo.field_cover_image,
      }));
      setAtractivos(filterAtractivos);
    };

    Promise.all([fetchBogotaDrplV2("/tax/categorias_atractivos_2024")])
      .then(([categorias_atractivos_2024]) => {
        dispatch(fetchData());
        setCategories(
          categorias_atractivos_2024.map((cat) => ({
            name: cat.name,
            tid: cat.tid,
          }))
        );
        if (filterID !== null && filterID != undefined) {
          let index = categorias_atractivos_2024.findIndex(
            (cat) => cat.tid === filterID
          );
          setactiveIndex(index);
          requestAtractivosInit(categorias_atractivos_2024[index == -1 ? 0 : index].tid);
        } else {
          requestAtractivosInit(categorias_atractivos_2024[0].tid);
        }
        setQueriesCompleted(true);
      })
      .catch((error) => console.error(error));
  }, [filterID, dispatch, params.filterID]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          horizontal
          data={categories}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={async () => {
                setQueriesCompleted(false);
                setactiveIndex(index);
                const atractivos = await fetchBogotaDrplV2(
                  `/atractivos/all/${item.tid}`
                );
                const filterAtractivos = atractivos.map((atractivo) => ({
                  title: atractivo.title,
                  nid: atractivo.nid,
                  field_cover_image: atractivo.field_cover_image,
                }));
                setAtractivos(filterAtractivos);
                setQueriesCompleted(true);
              }}
              style={{
                borderRadius: 18,
                backgroundColor:
                  activeIndex == index ? Colors.orange : "transparent",
                marginLeft: 20,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                height: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 14,
                  color: activeIndex == index ? "#FFF" : Colors.orange,
                  fontFamily: "MuseoSans_700",
                  textAlignVertical: "center",
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        <FlatList
          ListEmptyComponent={PreloaderComponent}
          numColumns={2}
          contentContainerStyle={{
            borderRadius: 25,
            overflow: "hidden",
          }}
          ItemSeparatorComponent={() => (
            <View style={{ paddingHorizontal: 2 }} />
          )}
          data={atractivos}
          keyExtractor={(item) => item.nid}
          renderItem={({ item }) => (
            <CardAtractivo
              isHorizontal
              onPress={() => router.push(`(stack)/atractivos/${item.nid}`)}
              title={item.title}
              image={`https://bogotadc.travel${item.field_cover_image}`}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "MuseoSans_700",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  filterButton: {
    paddingVertical: 10,
  },
});
