import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilters,
  fetchAllRestaurants,
} from "../../../src/store/actions";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { CustomCheckbox, PreloaderComponent } from "../../../src/components";
import { router } from "expo-router";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { Colors } from "../../../src/constants";
import {
  selectActualLanguage,
  selectRestaurantsData,
  selectRestaurantsFilterData,
  selectWordsLang,
} from "../../../src/store/selectors";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";

const CustomModal = ({
  visible,
  filtersData,
  filtrarHoteles,
  closeModal,
  categoria_restaurantes,
  setCategoria_restaurantes,
  test_zona,
  setTest_zona,
  zonas_gastronomicas,
  setZonas_gastronomicas,
  rangos_de_precio,
  setRangos_de_precio,
  limpiarFiltros,
  wordsLanguage,
  actualLanguage,
}) => {
  const getTitleByIndex = (index) => {
    switch (index) {
      case 0:
        return wordsLanguage[actualLanguage][23];
      case 1:
        return wordsLanguage[actualLanguage][24];
      case 2:
        return wordsLanguage[actualLanguage][25];
      case 3:
        return wordsLanguage[actualLanguage][26];
      default:
        return "";
    }
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
          <FontAwesome name="close" size={30} color="#354999" />
        </Pressable>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <Text style={stylesModal.titleFilter}>{getTitleByIndex(0)}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {filtersData[0].map((item, index) => {
                const isChecked =
                  Array.isArray(categoria_restaurantes) &&
                  categoria_restaurantes.includes(item.tid);
                return (
                  <View style={{ width: "50%" }} key={item.tid}>
                    <CustomCheckbox
                      checked={isChecked}
                      label={item.name}
                      onPress={() => {
                        setCategoria_restaurantes((prevState) => {
                          return isChecked
                            ? prevState.filter((id) => id !== item.tid) // Desmarca el checkbox
                            : [...prevState, item.tid];
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <Text style={stylesModal.titleFilter}>{getTitleByIndex(1)}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {filtersData[1].map((item, index) => {
                const isChecked =
                  Array.isArray(test_zona) && test_zona.includes(item.tid);
                return (
                  <View style={{ width: "50%" }} key={item.tid}>
                    <CustomCheckbox
                      checked={isChecked}
                      label={item.name}
                      onPress={() => {
                        setTest_zona((prevState) => {
                          return isChecked
                            ? prevState.filter((id) => id !== item.tid) // Desmarca el checkbox
                            : [...prevState, item.tid];
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <Text style={stylesModal.titleFilter}>{getTitleByIndex(2)}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {filtersData[2].map((item, index) => {
                const isChecked =
                  Array.isArray(zonas_gastronomicas) &&
                  zonas_gastronomicas.includes(item.tid);
                return (
                  <View style={{ width: "50%" }} key={item.tid}>
                    <CustomCheckbox
                      checked={isChecked}
                      label={item.name}
                      onPress={() => {
                        setZonas_gastronomicas((prevState) => {
                          return isChecked
                            ? prevState.filter((id) => id !== item.tid) // Desmarca el checkbox
                            : [...prevState, item.tid];
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <Text style={stylesModal.titleFilter}>{getTitleByIndex(3)}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {filtersData[3].map((item, index) => {
                const isChecked =
                  Array.isArray(rangos_de_precio) &&
                  rangos_de_precio.includes(item.tid);
                const iconosRepetidos = () =>
                  Array.from({ length: parseInt(item.name) }, () => (
                    <FontAwesome name="star" size={13} color="#333" />
                  )); // Crear la cadena con el icono repetido
                return (
                  <View style={{ width: "50%" }} key={item.tid}>
                    <CustomCheckbox
                      checked={isChecked}
                      styleText={{ lineHeight: 22 }}
                      label={iconosRepetidos()}
                      onPress={() => {
                        setRangos_de_precio((prevState) => {
                          return isChecked
                            ? prevState.filter((id) => id !== item.tid) // Desmarca el checkbox
                            : [...prevState, item.tid];
                        });
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              title={wordsLanguage[actualLanguage][27]}
              onPress={() =>
                filtrarHoteles({
                  categoria_restaurantes,
                  test_zona,
                  zonas_gastronomicas,
                  rangos_de_precio,
                })
              }
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              title={wordsLanguage[actualLanguage][28]}
              onPress={limpiarFiltros}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  titleFilter: {
    color: "#333",
    fontSize: 25,
    fontFamily: "MuseoSans_500",
    textAlign: "center",
    paddingVertical: 15,
  },
});

const EventsList = () => {
  const dispatch = useDispatch();
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const restaurantsData = useSelector(selectRestaurantsData);
  const filtersData = useSelector(selectRestaurantsFilterData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);

  const [categoria_restaurantes, setCategoria_restaurantes] = useState([]);
  const [test_zona, setTest_zona] = useState([]);
  const [zonas_gastronomicas, setZonas_gastronomicas] = useState([]);
  const [rangos_de_precio, setRangos_de_precio] = useState([]);
  const [restaurantArrayData, setRestaurantArrayData] =
    useState(restaurantsData);
  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllRestaurants());
    }
    async function getFilters() {
      await dispatch(
        fetchAllFilters(
          [
            "categoria_restaurantes",
            "test_zona",
            "zonas_gastronomicas",
            "rangos_de_precio",
          ],
          "restaurantes"
        )
      );
      setQueriesCompleted(true);
    }
    fetchData();
    getFilters();
  }, [dispatch]);
  // Este useEffect se ejecutará cada vez que restaurantsData cambie
  React.useEffect(() => {
    if (restaurantsData.length > 0) {
      setRestaurantArrayData(restaurantsData);
    }
  }, [restaurantsData]);
  const openModal = () => {
    setFilterModal(true);
  };

  const closeModal = () => {
    setFilterModal(false);
  };

  const limpiarFiltros = () => {
    setCategoria_restaurantes([]);
    setTest_zona([]);
    setZonas_gastronomicas([]);
    setRangos_de_precio([]);
    setRestaurantArrayData(restaurantsData);
    closeModal();
  };
  if (!queriesCompleted) {
    return <PreloaderComponent />;
  }
  return (
    <View>
      <CustomModal
        filtersData={filtersData}
        visible={filterModal}
        wordsLanguage={wordsLanguage}
        actualLanguage={actualLanguage}
        closeModal={closeModal}
        queriesCompleted={queriesCompleted}
        filtrarHoteles={async (data) => {
          setQueriesCompleted(false);
          // Desestructuración de las propiedades de data o asignación de valores predeterminados
          const {
            categoria_restaurantes,
            test_zona,
            zonas_gastronomicas,
            rangos_de_precio,
          } = data || {};

          // Verificar si las propiedades están vacías
          const tiposDeHotelIsEmpty = categoria_restaurantes.length === 0;
          const serviciosDeHotelesIsEmpty = test_zona.length === 0;
          const rangosDePreciosHotelesIsEmpty =
            zonas_gastronomicas.length === 0;
          const testZonaIsEmpty = rangos_de_precio.length === 0;

          if (
            !data ||
            (tiposDeHotelIsEmpty &&
              serviciosDeHotelesIsEmpty &&
              rangosDePreciosHotelesIsEmpty &&
              testZonaIsEmpty)
          ) {
            // Si data es nulo o todas las propiedades están vacías, usar el arreglo original de hoteles
            setRestaurantArrayData(hotelsData);
          } else {
            const newData = await fetchBogotaDrplV2(
              `/restaurants/all/${
                tiposDeHotelIsEmpty ? "all" : categoria_restaurantes.join("+")
              }/${serviciosDeHotelesIsEmpty ? "all" : test_zona.join("+")}/${
                rangosDePreciosHotelesIsEmpty
                  ? "all"
                  : zonas_gastronomicas.join("+")
              }/${testZonaIsEmpty ? "all" : rangos_de_precio.join("+")}`,
              actualLanguage
            );
            // Actualizar el arreglo de hoteles con los resultados filtrados
            setRestaurantArrayData(newData);
          }
          // Cerrar el modal
          closeModal();
          setQueriesCompleted(true);
        }}
        limpiarFiltros={limpiarFiltros}
        categoria_restaurantes={categoria_restaurantes}
        setCategoria_restaurantes={setCategoria_restaurantes}
        test_zona={test_zona}
        setTest_zona={setTest_zona}
        zonas_gastronomicas={zonas_gastronomicas}
        setZonas_gastronomicas={setZonas_gastronomicas}
        rangos_de_precio={rangos_de_precio}
        setRangos_de_precio={setRangos_de_precio}
      />
      <Text
        style={{
          fontFamily: "MuseoSans_500",
          fontSize: 30,
          textAlign: "center",
          paddingVertical: 20,
          color: "#354999",
        }}
      >
        {wordsLanguage[actualLanguage][20]}
      </Text>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          {
            alignItems: "center",
            backgroundColor: "#354999",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
            width: windowWidth,
            gap: 15,
          },
        ]}
        onPress={openModal}
      >
        <FontAwesome name="filter" size={24} color="#FFF" />
        <Text
          style={{ color: "#FFF", fontFamily: "MuseoSans_500", fontSize: 20 }}
        >
          {wordsLanguage[actualLanguage][22]}
        </Text>
      </Pressable>

      <FlatList
        style={{ height: windowHeight - 210 }}
        numColumns={3}
        data={restaurantArrayData}
        extraData={restaurantArrayData}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: "MuseoSans_500",
                fontSize: 22,
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              {wordsLanguage[actualLanguage][32]}
            </Text>
            <Pressable
              onPress={limpiarFiltros}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                {
                  backgroundColor: "#354999",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                  borderRadius: 15,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  color: "#FFF",
                  textAlign: "center",
                }}
              >
                {wordsLanguage[actualLanguage][28]}
              </Text>
            </Pressable>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`(tabs)/restaurantes/${item.nid}`)}
            style={{ width: windowWidth / 3, height: windowWidth / 3 }}
          >
            <ImageBackground
              style={{ flex: 1 }}
              source={{
                uri: `https://bogotadc.travel${
                  item.field_img ? item.field_img : "/img/noimg.png"
                }`,
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,.3)",
                  flex: 1,
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "MuseoSans_500",
                    fontSize: 14,
                    textShadowColor: "rgba(0, 0, 0, .7)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 10,
                    textAlign: "center",
                    marginBottom: 15,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
};

export default EventsList;
