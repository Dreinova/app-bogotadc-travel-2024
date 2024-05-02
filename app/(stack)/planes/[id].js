import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import Swiper from "react-native-swiper";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Colors } from "../../../src/constants";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CustomCheckbox,
  PreloaderComponent,
  ReadMoreText,
} from "../../../src/components";
import {
  fetchBogotaDrpl,
  fetchBogotaDrplV2,
  number_format,
} from "../../../src/api/imperdibles";
import { useLocalSearchParams } from "expo-router";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";
import { Ionicons } from "@expo/vector-icons";

const ModalReserva = (
  plan,
  aceptPolitics,
  setAceptPolitics,
  formValues,
  setFormValues,
  formModal,
  setFormModal,
  wordsLanguage,
  actualLanguage,
  sendFormInfo,
  setSendFormInfo,
  company,
  complete,
  setComplete,
  serial,
  setSerial
) => {
  const sendForm = async () => {
    setSendFormInfo(true);
    try {
      const formData = new FormData();

      // Iterate over formValues and append each key-value pair to formData
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          formData.append(key, formValues[key]);
        }
      }

      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

      const response = await fetch(
        "https://bogotadc.travel/plan-bogota/s/restPost/",
        requestOptions
      );

      const result = await response.json();
      setSerial(result.serial);
      setSendFormInfo(true);
      setComplete(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetAll = () => {
    setFormModal(false);
    setComplete(false);
    setSendFormInfo(false);
    setSerial("");
    setFormValues((prevState) => ({
      ...prevState,
      uname: "",
      uemail: "",
      uphone: "",
    }));
  };

  return (
    <Modal
      visible={formModal}
      transparent
      style={{ flex: 1 }}
      onRequestClose={setFormModal}
    >
      <LinearGradient
        style={{ flex: 1, padding: 10 }}
        colors={["#6dd194", "#266dcd"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable
          onPress={resetAll}
          style={{ alignSelf: "flex-end", padding: 10 }}
        >
          <Ionicons name="close" size={35} color="#FFF" />
        </Pressable>
        {complete ? (
          <View
            style={{ backgroundColor: "#FFF", padding: 20, borderRadius: 18 }}
          >
            <Text
              style={{
                color: "#E50728",
                fontFamily: "MuseoSans_900",
                textAlign: "center",
                fontSize: 35,
                marginBottom: 15,
              }}
            >
              ¡El plan que soñaste es casi una realidad!
            </Text>
            <Text
              style={{
                color: "#E50728",
                fontFamily: "MuseoSans_500",
                textAlign: "center",
                fontSize: 25,
                marginBottom: 15,
              }}
            >
              Código de tu reserva en Plan Bogotá:
            </Text>
            <Text
              style={{
                color: "#E50728",
                fontFamily: "MuseoSans_900",
                textAlign: "center",
                fontSize: 30,
                marginBottom: 15,
              }}
            >
              {serial}
            </Text>
            <Text
              style={{
                color: "#333",
                fontFamily: "MuseoSans_500",
                fontSize: 14,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontFamily: "MuseoSans_900",
                  fontSize: 14,
                  marginBottom: 15,
                }}
              >
                Oferta reservada:
              </Text>
              {plan.title}
            </Text>
            <Text
              style={{
                color: "#333",
                fontFamily: "MuseoSans_500",
                fontSize: 14,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontFamily: "MuseoSans_900",
                  fontSize: 14,
                  marginBottom: 15,
                }}
              >
                Empresa responsable:
              </Text>
              {company.field_pb_empresa_titulo}
            </Text>
            <Text
              style={{
                color: "#333",
                fontFamily: "MuseoSans_500",
                fontSize: 14,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontFamily: "MuseoSans_900",
                  fontSize: 14,
                  marginBottom: 15,
                }}
              >
                Correo de contacto:
              </Text>
              {company.field_pb_empresa_email}
            </Text>
            <Text
              style={{
                color: "#333",
                fontFamily: "MuseoSans_500",
                fontSize: 14,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontFamily: "MuseoSans_900",
                  fontSize: 14,
                  marginBottom: 15,
                }}
              >
                Teléfono de contacto:
              </Text>
              {company.field_pb_empresa_telefono}
            </Text>
            <Text
              style={{
                color: "#333",
                fontFamily: "MuseoSans_900",
                fontSize: 18,
                marginBottom: 15,
              }}
            >
              Usa el siguiente link para finalizar tu compra:
            </Text>
            <Pressable
              onPress={() =>
                WebBrowser.openBrowserAsync(company.field_pb_empresa_direccion)
              }
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  color: "#E50728",
                  fontFamily: "MuseoSans_900",
                  fontSize: 18,
                  textDecorationLine: "underline",
                  marginBottom: 15,
                }}
              >
                {company.field_pb_empresa_direccion}
              </Text>
            </Pressable>

            <Pressable>
              <Text></Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView>
            <Text
              style={{
                color: Colors.white,
                fontFamily: "MuseoSans_500",
                fontSize: 30,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {wordsLanguage[actualLanguage][39]}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontFamily: "MuseoSans_900",
                fontSize: 25,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {plan.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
                    opacity: 0.8,
                    fontFamily: "MuseoSans_700",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  ${number_format(plan.field_pa, 0, ".", ".")}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    height: 2,
                    width: 100,
                    backgroundColor: "#FFF",
                    top: 19,
                    transform: [
                      {
                        rotate: "-5deg",
                      },
                    ],
                  }}
                />
              </View>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "MuseoSans_900",
                  fontSize: 35,

                  textAlign: "center",
                }}
              >
                ${number_format(plan.field_pd, 0, ".", ".")}
              </Text>
              <View
                style={{
                  backgroundColor: "#E50728",
                  width: 80,
                  height: 80,
                  borderRadius: 80,
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
                    fontSize: 22,
                    textAlign: "center",
                  }}
                >
                  {plan.field_percent}%
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "MuseoSans_700",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  DCTO
                </Text>
              </View>
            </View>
            <View style={{ padding: 20, marginVertical: 30, gap: 15 }}>
              <TextInput
                value={formValues.uname}
                onChangeText={(text) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    uname: text,
                  }));
                }}
                placeholder={wordsLanguage[actualLanguage][41]}
                placeholderTextColor="#FFF"
                style={{
                  color: "#FFF",
                  fontFamily: "MuseoSans_900",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: "rgba(255,255,255,.18)",
                  borderRadius: 25,
                }}
              />
              <TextInput
                value={formValues.uemail}
                placeholder={wordsLanguage[actualLanguage][42]}
                onChangeText={(text) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    uemail: text,
                  }));
                }}
                keyboardType="email-address"
                placeholderTextColor="#FFF"
                style={{
                  color: "#FFF",
                  fontFamily: "MuseoSans_900",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: "rgba(255,255,255,.18)",
                  borderRadius: 25,
                }}
              />
              <TextInput
                value={formValues.uphone}
                keyboardType="number-pad"
                placeholder={wordsLanguage[actualLanguage][43]}
                placeholderTextColor="#FFF"
                onChangeText={(text) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    uphone: text,
                  }));
                }}
                style={{
                  color: "#FFF",
                  fontFamily: "MuseoSans_900",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: "rgba(255,255,255,.18)",
                  borderRadius: 25,
                }}
              />

              <CustomCheckbox
                light
                checked={aceptPolitics}
                label={wordsLanguage[actualLanguage][40]}
                onPress={() => {
                  setAceptPolitics(!aceptPolitics);
                }}
              />

              <Pressable
                onPress={sendForm}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                  {
                    backgroundColor: "#E50728",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                    padding: 15,
                    margin: 20,
                  },
                ]}
              >
                {sendFormInfo ? (
                  <ActivityIndicator size={15} color="#FFF" />
                ) : (
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: "MuseoSans_900",
                      fontSize: 20,
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    {wordsLanguage[actualLanguage][38]}
                  </Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        )}
      </LinearGradient>
    </Modal>
  );
};
const SinglePlan = () => {
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const { id } = useLocalSearchParams();
  const [plan, setPlan] = React.useState(null);
  const [sendFormInfo, setSendFormInfo] = React.useState(false);

  const [company, setCompany] = React.useState(null);
  const [galeria, setGaleria] = React.useState([]);
  const [aceptPolitics, setAceptPolitics] = React.useState(true);
  const [formValues, setFormValues] = React.useState({
    uname: "",
    uemail: "",
    uphone: "",
    uprice: "",
    uofertaid: "",
    uoferta: "",
    ucompanyid: "",
    ucompanyname: "",
    ucompanyemail: "",
    ucompanyphone: "",
    ucompanylink: "",
    ocategoryid: "",
    ocategory: "",
    ccategoryid: "",
    ccategory: "",
    numberPersons: "1",
  });
  const [formModal, setFormModal] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const [serial, setSerial] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const planData = await fetchBogotaDrplV2(
          `/ofertasapp/${id}/all/all/all/all`,
          actualLanguage
        );
        const companyData = await fetchBogotaDrpl(
          `/rld_operadores/${planData[0].field_pb_oferta_empresa}`
        );

        const plan = planData[0];
        const company = companyData[0];

        setPlan(plan);
        setCompany(company);
        setGaleria([
          plan.field_gal_1,
          plan.field_gal_2,
          plan.field_gal_3,
          plan.field_gal_4,
          plan.field_gal_5,
        ]);

        setFormValues((prevState) => ({
          ...prevState,
          uprice: plan.field_pd,
          uofertaid: id,
          uoferta: plan.title,
          ucompanyid: plan.field_pb_oferta_empresa,
          ocategoryid: plan.field_segment ? plan.field_segment : 0,
          ocategory: plan.field_segment_1,
          ucompanyid: plan.field_pb_oferta_empresa,
          ucompanyname: company.field_pb_empresa_titulo,
          ucompanyemail: company.field_pb_empresa_email,
          ucompanyphone: company.field_pb_empresa_telefono,
          ucompanylink: company.field_pb_empresa_direccion,
          ccategoryid: company.field_segment,
          ccategory: company.field_segment_1,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!plan) {
    return <PreloaderComponent planBogota />;
  }

  const renderImages = () => {
    return galeria.map((item, index) => {
      if (!item || item.trim() === "") {
        return null; // No renderizar imagen si la URL está vacía
      }
      return (
        <ImageBackground
          key={index}
          source={{ uri: `https://bogotadc.travel${item.trim()}` }}
          style={styles.imageBackground}
        >
          <Image
            source={{ uri: `https://bogotadc.travel${item.trim()}` }}
            style={styles.image}
          />
        </ImageBackground>
      );
    });
  };

  return (
    <ScrollView>
      {ModalReserva(
        plan,
        aceptPolitics,
        setAceptPolitics,
        formValues,
        setFormValues,
        formModal,
        setFormModal,
        wordsLanguage,
        actualLanguage,
        sendFormInfo,
        setSendFormInfo,
        company,
        complete,
        setComplete,
        serial,
        setSerial
      )}
      <ImageBackground
        style={{
          width: windowWidth,
          height: windowWidth - 120,
        }}
        source={{
          uri: `https://bogotadc.travel${
            plan.field_img ? plan.field_img : "/img/noimg.png"
          }`,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.5)",
            flex: 1,
            paddingVertical: 20,
            justifyContent: "flex-end",
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
            {plan.field_segment_1}
          </Text>
          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_900",
              fontSize: 25,
              textShadowColor: "rgba(0, 0, 0, .7)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {plan.title}
          </Text>
        </View>
      </ImageBackground>
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        {plan.field_pb_oferta_direccion && (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="map-marker" size={22} color="#E50728" />
            <Text
              style={[
                { color: "#777", fontFamily: "MuseoSans_700", fontSize: 16 },
              ]}
            >
              {plan.field_pb_oferta_direccion}
            </Text>
          </View>
        )}
        <Text style={{fontSize:14}}>{plan.body}</Text>
        
        <Pressable
          onPress={() => {
            Linking.openURL(`https://visitbogota.co/g/booklink/?url=${company.field_pb_empresa_direccion}&id=${id}&price=${plan.field_pd}`)
          }}
          style={{
            backgroundColor: "#E50728",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            padding: 15,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: "MuseoSans_900",
              fontSize: 16,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {wordsLanguage[actualLanguage][38]}
          </Text>
        </Pressable>
      </View>

      <Swiper
 style={{ height: (windowWidth / 16) * 9 }}
 dotColor="rgba(255,255,255,.8)"
 activeDotStyle={{backgroundColor: Colors.orange}}
      >
        {renderImages()}
      </Swiper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_900",
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, .7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 15,
  },
  container: {
    flexDirection: "row", // Para que los Text se muestren en línea
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  firstLetter: {
    fontFamily: "MuseoSans_900",
    fontSize: 33, // Establece el tamaño de la primera letra
    color: "#777777", // Establece el color de la primera letra
    // Agrega otros estilos según tus preferencias
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "50%", // You can adjust the width as needed
    aspectRatio: 1, // Maintain aspect ratio (1:1)
    padding: 5,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default SinglePlan;
