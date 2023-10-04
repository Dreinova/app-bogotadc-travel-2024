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
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilters, fetchAllPLanes } from "../../../src/store/actions";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import {
  CustomCheckbox,
  HorizontalFlatListWithRows,
  PreloaderComponent,
} from "../../../src/components";
import { router } from "expo-router";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { Colors } from "../../../src/constants";
import {
  selectActualLanguage,
  selectPlanesData,
  selectPlanesFilterData,
  selectWordsLang,
} from "../../../src/store/selectors";
import {
  fetchBogotaDrplV2,
  number_format,
  truncateString,
} from "../../../src/api/imperdibles";
import Slider from "@react-native-community/slider";

const CustomModal = ({
  visible,
  filtrarPlanes,
  closeModal,
  cantidadPersonas,
  setCantidadPersonas,
  test_zona,
  setTest_zona,
  zonas_gastronomicas,
  setZonas_gastronomicas,
  setRangos_de_precio,
  limpiarFiltros,
}) => {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const filtersData = useSelector(selectPlanesFilterData);
  const [precioSelected, setPrecioSelected] = useState(35000);
  const getTitleByIndex = (index) => {
    switch (index) {
      case 0:
        return wordsLanguage[actualLanguage][33];
      case 1:
        return wordsLanguage[actualLanguage][34];
      case 2:
        return wordsLanguage[actualLanguage][35];
      case 3:
        return wordsLanguage[actualLanguage][36];
      default:
        return "";
    }
  };
  let persons = [
    {
      name: "1 persona",
      tid: 1,
    },
    {
      name: " 2 personas",
      tid: 2,
    },
    {
      name: "3 personas",
      tid: 3,
    },
    {
      name: "4 personas",
      tid: 4,
    },
    {
      name: "Grupos",
      tid: "all",
    },
  ];
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
              {persons.map((item, index) => {
                const isChecked = cantidadPersonas.includes(item.tid);
                return (
                  <View style={{ width: "50%" }} key={item.tid}>
                    <CustomCheckbox
                      checked={isChecked}
                      label={item.name}
                      onPress={() => {
                        setCantidadPersonas((prevState) => {
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
              {filtersData[0].map((item, index) => {
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
              <Slider
                style={{ marginTop: 10, width: "100%" }}
                minimumValue={35000}
                maximumValue={2600000}
                value={35000}
                step={15000}
                onSlidingComplete={(v) => {
                  setRangos_de_precio(v);
                }}
                onValueChange={(v) => {
                  setPrecioSelected(v);
                }}
                maximumTrackTintColor="#ddd"
                minimumTrackTintColor="#e1582f"
                thumbTintColor="#e1582f"
              />
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontFamily: "MuseoSans_900" }}>
                  $35.000{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "MuseoSans_900",
                    color: "#f6931f",
                  }}
                >
                  ${number_format(precioSelected, 0, ".", ".")}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "MuseoSans_900" }}>
                  $2.600.000{" "}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              title={wordsLanguage[actualLanguage][27]}
              onPress={() =>
                filtrarPlanes({
                  cantidadPersonas,
                  test_zona,
                  zonas_gastronomicas,
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
    fontFamily: "MuseoSans_700",
    textAlign: "center",
    paddingVertical: 15,
  },
});

const EventsList = () => {
  const dispatch = useDispatch();

  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const planesData = useSelector(selectPlanesData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [filterModal, setFilterModal] = React.useState(false);

  const [cantidadPersonas, setCantidadPersonas] = useState([]);
  const [test_zona, setTest_zona] = useState([]);
  const [zonas_gastronomicas, setZonas_gastronomicas] = useState([]);
  const [rangos_de_precio, setRangos_de_precio] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllPLanes());
      setQueriesCompleted(true);
    }
    async function getFilters() {
      dispatch(
        fetchAllFilters(["test_zona", "categorias_comerciales_pb"], "planes")
      );
    }
    getFilters();
    fetchData();
  }, [dispatch]);

  React.useEffect(() => {
    setRestaurantArrayData(planesData);
  }, [planesData]);

  const openModal = () => {
    setFilterModal(true);
  };

  const closeModal = () => {
    setFilterModal(false);
  };
  const [restaurantArrayData, setRestaurantArrayData] = useState([]);

  const limpiarFiltros = () => {
    setCantidadPersonas([]);
    setTest_zona([]);
    setZonas_gastronomicas([]);
    setRangos_de_precio(0);
    setRestaurantArrayData(planesData);
    setSearchValue("");
    closeModal();
  };

  const filtrarPlanes = async (data) => {
    setQueriesCompleted(false);
    // Desestructuración de las propiedades de data o asignación de valores predeterminados
    const { cantidadPersonas, test_zona, zonas_gastronomicas } = data || {};

    // Verificar si las propiedades están vacías
    const serviciosDeHotelesIsEmpty = test_zona.length === 0;
    const rangosDePreciosHotelesIsEmpty = zonas_gastronomicas.length === 0;

    let url = `/ofertasapp/all/${
      rangosDePreciosHotelesIsEmpty ? "all" : zonas_gastronomicas.join("+")
    }/${cantidadPersonas == "" ? "all" : cantidadPersonas}/${
      serviciosDeHotelesIsEmpty ? "all" : test_zona.join("+")
    }/${searchValue == "" ? "all" : searchValue}`;
    const newData = await fetchBogotaDrplV2(url, actualLanguage);
    const uniqueNids = new Set();
    const uniqueData = [];
    for (const item of newData) {
      if (!uniqueNids.has(item.nid)) {
        uniqueNids.add(item.nid);
        uniqueData.push(item);
      }
    }
    // Actualizar el arreglo de hoteles con los resultados filtrados
    setRestaurantArrayData(uniqueData);

    // Cerrar el modal
    closeModal();
    setQueriesCompleted(true);
  };

  if (!queriesCompleted) {
    return <PreloaderComponent planBogota />;
  }
  return (
    <ImageBackground
      source={require("../../../assets/images/bgpattern.png")}
      imageStyle={{ resizeMode: "repeat", opacity: 0.1 }}
      style={{ backgroundColor: "#0f2c52", flex: 1 }}
    >
      <ScrollView
        style={{ height: windowHeight }}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <CustomModal
          visible={filterModal}
          closeModal={closeModal}
          queriesCompleted={queriesCompleted}
          filtrarPlanes={filtrarPlanes}
          limpiarFiltros={limpiarFiltros}
          cantidadPersonas={cantidadPersonas}
          setCantidadPersonas={setCantidadPersonas}
          test_zona={test_zona}
          setTest_zona={setTest_zona}
          zonas_gastronomicas={zonas_gastronomicas}
          setZonas_gastronomicas={setZonas_gastronomicas}
          rangos_de_precio={rangos_de_precio}
          setRangos_de_precio={setRangos_de_precio}
        />
        <Image
          source={require("../../../assets/images/logo_pb.png")}
          style={{
            width: 150,
            height: 80,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Text
          style={{
            fontFamily: "MuseoSans_900",
            fontSize: 30,
            textAlign: "center",
            paddingVertical: 20,
            color: "#FFF",
          }}
        >
          {wordsLanguage[actualLanguage][31]}
        </Text>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#FFF",
              padding: 8,
              paddingHorizontal: 15,
              flex: 1,
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
            }}
            placeholder={`${wordsLanguage[actualLanguage][14]}...`}
            value={searchValue}
            onSubmitEditing={() =>
              filtrarPlanes({
                cantidadPersonas,
                test_zona,
                zonas_gastronomicas,
              })
            }
            onChangeText={(text) => setSearchValue(text)}
          />

          <Pressable
            style={{
              alignItems: "center",
              backgroundColor: "#ff7c47",
              flexDirection: "row",
              justifyContent: "center",
              gap: 15,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
            }}
            onPress={() => {
              if (searchValue == "") {
                openModal();
              } else {
                filtrarPlanes({
                  cantidadPersonas,
                  test_zona,
                  zonas_gastronomicas,
                });
              }
            }}
          >
            {searchValue == "" ? (
              <FontAwesome name="filter" size={20} color="#FFF" />
            ) : (
              <FontAwesome name="search" size={20} color="#FFF" />
            )}
          </Pressable>
        </View>

        <FlatList
          numColumns={2}
          data={restaurantArrayData}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`(stack)/planes/${item.nid}`)}
              style={[
                {
                  width: windowWidth / 2,
                  padding: 2,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
              ]}
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
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-end",
                      height: windowWidth / 2,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#ff7c47",
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-end",
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: "MuseoSans_900",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        {item.field_percent}%
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: "MuseoSans_900",
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        DCTO
                      </Text>
                    </View>
                    <View
                      style={{
                        position: "relative",
                        alignItems: "flex-end",
                        paddingVertical: 10,
                        paddingLeft: 25,
                        paddingRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: "MuseoSans_900",
                          fontSize: 15,
                          textShadowColor: "rgba(0, 0, 0, .7)",
                          textShadowOffset: { width: 1, height: 1 },
                          textShadowRadius: 10,
                          textAlign: "center",
                        }}
                      >
                        ${number_format(item.field_pa, 0, ".", ".")}
                      </Text>
                      <View
                        style={{
                          position: "absolute",
                          height: 2,
                          width: "50%",
                          backgroundColor: "#FFF",
                          top: 15,
                          transform: [
                            {
                              rotate: "-2deg",
                            },
                          ],
                        }}
                      />
                    </View>
                    <View
                      style={{
                        alignSelf: "flex-end",
                        backgroundColor: "#5097ff",
                        borderBottomLeftRadius: 25,
                        borderTopLeftRadius: 25,
                        marginBottom: 15,
                        paddingLeft: 25,
                        paddingRight: 5,
                        paddingVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: "MuseoSans_900",
                          fontSize: 18,
                          textShadowColor: "rgba(0, 0, 0, .7)",
                          textShadowOffset: { width: 1, height: 1 },
                          textShadowRadius: 10,
                          textAlign: "center",
                        }}
                      >
                        ${number_format(item.field_pd, 0, ".", ".")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#103b6f",
                      paddingVertical: 30,
                      paddingHorizontal: 15,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: "MuseoSans_900",
                        fontSize: 16,
                        textShadowColor: "rgba(0, 0, 0, .7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 10,
                        textAlign: "center",
                        marginBottom: 10,
                      }}
                    >
                      {truncateString(item.title, 40)}
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: "MuseoSans_500",
                        fontSize: 14,
                        textShadowColor: "rgba(0, 0, 0, .7)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 10,
                        textAlign: "center",
                      }}
                    >
                      {truncateString(item.field_pb_oferta_desc_corta, 50)}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          )}
          keyExtractor={(item, index) => item.nid}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default EventsList;
