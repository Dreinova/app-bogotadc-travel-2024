import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Pressable,
  StyleSheet,
  FlatList,
  ImageBackground,
  Text,
  View,
  Modal,
} from "react-native";
import { Colors } from "../../src/constants";
import { windowWidth } from "../../src/constants/ScreenWidth";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActualLanguage,
  selectActualLocation,
  selectLocalidadesData,
  selectParaData,
  selectPlacesData,
  selectSubprodData,
  selectWordsLang,
} from "../../src/store/selectors";
import { fetchData, fetchPlacesWithFilters } from "../../src/store/actions";
import { CardAtractivo, PreloaderComponent } from "../../src/components";
import { router } from "expo-router";

const CustomModal = ({
  visible,
  closeModal,
  data,
  modalType,
  setQueriesCompleted,
}) => {
  const dispatch = useDispatch();
  const filterPlaces = async (itemId) => {
    setQueriesCompleted(false);

    switch (modalType) {
      case "para":
        await dispatch(fetchPlacesWithFilters("all", itemId, "all", "all"));
        setQueriesCompleted(true);

        break;
      case "subProductos":
        await dispatch(fetchPlacesWithFilters("all", "all", itemId, "all"));
        setQueriesCompleted(true);

        break;
      case "localidades":
        await dispatch(fetchPlacesWithFilters("all", "all", "all", itemId));
        setQueriesCompleted(true);

        break;
    }

    closeModal(false);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent
    >
      <View
        style={{
          alignItems: "center",
          paddingVertical: 50,
          flex: 1,
          backgroundColor: "rgba(255,255,255,.9)",
        }}
      >
        <Pressable
          style={{ marginBottom: 30 }}
          onPress={() => closeModal(false)}
        >
          <FontAwesome name="close" size={30} color="#ff7c47" />
        </Pressable>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => filterPlaces(item.nid)}
              style={{ padding: 20, width: "50%" }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "MuseoSans_700",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

export default function TabTwoScreen() {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const dispatch = useDispatch();
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const placesData = useSelector(selectPlacesData);
  const paraData = useSelector(selectParaData);
  const subproductsData = useSelector(selectSubprodData);
  const localidadesData = useSelector(selectLocalidadesData);

  React.useEffect(() => {
    dispatch(fetchData());
    setQueriesCompleted(true);
  }, [dispatch]);

  const [modalType, setModalType] = React.useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  if (!queriesCompleted) {
    return <PreloaderComponent />;
  }

  return (
    <>
      {/* Render the selected modal */}
      <CustomModal
        visible={modalType === "para"}
        closeModal={closeModal}
        data={paraData}
        modalType={modalType}
        queriesCompleted={queriesCompleted}
        setQueriesCompleted={(val) => setQueriesCompleted(val)}
      />

      <CustomModal
        visible={modalType === "subProductos"}
        closeModal={closeModal}
        data={subproductsData}
        modalType={modalType}
        queriesCompleted={queriesCompleted}
        setQueriesCompleted={(val) => setQueriesCompleted(val)}
      />

      <CustomModal
        visible={modalType === "localidades"}
        closeModal={closeModal}
        data={localidadesData}
        modalType={modalType}
        queriesCompleted={queriesCompleted}
        setQueriesCompleted={(val) => setQueriesCompleted(val)}
      />
      {/* Main View */}
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: "MuseoSans_700",
            textAlign: "center",
          }}
        >
          {wordsLanguage[actualLanguage][1]}
        </Text>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#333",
            marginVertical: 15,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
            paddingHorizontal: 20,
          }}
        >
          <Pressable
            onPress={() => openModal("para")}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.filterButton,
            ]}
          >
            <Text style={styles.title}>
              {wordsLanguage[actualLanguage][11]}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => openModal("subProductos")}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.filterButton,
            ]}
          >
            <Text style={styles.title}>
              {wordsLanguage[actualLanguage][12]}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => openModal("localidades")}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.filterButton,
            ]}
          >
            <Text style={styles.title}>
              {wordsLanguage[actualLanguage][13]}
            </Text>
          </Pressable>
        </View>
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            borderRadius: 25,
            overflow: "hidden",
          }}
          ItemSeparatorComponent={() => (
            <View style={{ paddingHorizontal: 2 }} />
          )}
          data={placesData}
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
