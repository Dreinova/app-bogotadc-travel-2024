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
} from "react-native";
import Swiper from "react-native-swiper";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Colors } from "../../../src/constants";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ComoLlegar,
  PreloaderComponent,
  ReadMoreText,
} from "../../../src/components";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import { useLocalSearchParams } from "expo-router";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { TouchableOpacity } from "react-native";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";
import { useSelector } from "react-redux";

const SingleAtractivo = () => {
  const actualLanguage = useSelector(selectActualLanguage);
  const wordsLanguage = useSelector(selectWordsLang);
  const { id } = useLocalSearchParams();
  const [atractivo, setAtractivo] = React.useState(null);

  const getSingleAtractivo = async () => {
    const data = await fetchBogotaDrplV2(
      `/places/${id}/all/all/all`,
      actualLanguage
    );
    setAtractivo(data[0]);
  };

  React.useEffect(() => {
    getSingleAtractivo();
  }, []);

  if (!atractivo) {
    return <PreloaderComponent />;
  }

  const renderImages = () => {
    return atractivo.field_galery.split(",").map((item, index) => {
      return (
        <ImageBackground
          key={index}
          source={{ uri: `https://bogotadc.travel${item.trim()}` }}
          style={styles.imageBackground}
          loadingIndicatorSource={<ActivityIndicator />}
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
      <View
        style={{
          flex: 1,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{
            uri: `https://visitbogota.co/vacacional/images/exp_tur.png`,
          }}
          width={50}
          height={60}
        />
        <Text style={styles.text}>{atractivo.title}</Text>
      </View>
      {atractivo.field_galery && (
        <Swiper
          style={{ height: (windowWidth / 16) * 9 }}
          dotColor="rgba(255,255,255,.8)"
          activeDotStyle={{backgroundColor: Colors.orange}}
          
          
        >
          {renderImages()}
        </Swiper>
      )}
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        {atractivo.field_address && (
          <View style={{flexDirection:'row', alignItems:'center', gap: 10, marginBottom:8, maxWidth: 300,}}>
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync(
                `https://www.google.com/maps/search/?api=1&query=${atractivo.field_location.trim()}`
              )
            }
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
                { color: "#777", fontFamily: "MuseoSans_500", fontSize: 16 },
              ]}
            >
              {atractivo.field_address}
            </Text>
          </Pressable>
          </View>
        )}
        {atractivo.field_link_info && (
          <View style={{flexDirection:'row', alignItems:'center', gap: 10, marginBottom:8, maxWidth: 300,}}>
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync(`${atractivo.field_link_info}`)
            }
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="envelope-o" size={22} color="#58bf9c" />
            <Text
              style={[
                {
                  color: "#777",
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 20,
                },
              ]}
            >
              {atractivo.field_link_info}
            </Text>
          </Pressable>
          </View>
        )}
        {atractivo.field_email && (
          <View style={{flexDirection:'row', alignItems:'center', gap: 10, marginBottom:8, maxWidth: 300,}}>
          <Pressable
            onPress={() => Linking.openURL(`mailto:${atractivo.field_email}`)}
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="envelope-o" size={22} color="#58bf9c" />
            <Text
              style={[
                {
                  color: "#777",
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 20,
                },
              ]}
            >
              {atractivo.field_email}
            </Text>
          </Pressable>
          </View>
        )}
        {atractivo.field_phone && (
          <View style={{flexDirection:'row', alignItems:'center', gap: 10, marginBottom:8, maxWidth: 300,}}>

          <Pressable
            onPress={() => Linking.openURL(`tel:${atractivo.field_phone}`)}
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="phone" size={24} color="#E50728" />
            <Text
              style={[
                {
                  color: "#777",
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 20,
                },
              ]}
            >
              {atractivo.field_phone}
            </Text>
          </Pressable>
          </View>
        )} 
        {atractivo.field_horarios && (
        <View style={{flexDirection:'row', alignItems:'center', gap: 10, marginBottom:30, maxWidth: 300,}}>
          <Image source={{uri: `https://visitbogota.co/vacacional/images/horarios.png`}} width={20} height={20} />

          <Text  style={[
            {
              color: "#777",
              fontFamily: "MuseoSans_500",
              fontSize: 16,
              lineHeight: 20,
            },
          ]}>{atractivo.field_horarios}</Text>
        </View>
        )}
        <Text
            style={{
              fontSize: 14,
              lineHeight: 22,
              textAlign: "justify",
              marginBottom: 15,
              fontSize: 22,
              color: Colors.orange,
              fontFamily: "MuseoSans_900",
            }}
          >
            Acerca de
          </Text>
        <Text style={{ fontSize: 14, lineHeight: 22, textAlign: "justify" }}>
          {atractivo.body}
        </Text>
        <View style={{ marginVertical: 30 }}>
          
          <Text
            style={{
              fontSize: 14,
              lineHeight: 22,
              textAlign: "justify",
              marginBottom: 15,
              fontSize: 22,
              color: Colors.orange,
              fontFamily: "MuseoSans_900",
            }}
          >
            Cómo llegar:
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 22, textAlign: "justify" }}>
            {atractivo.field_howtogetthere}
          </Text>
        </View>
      </View>
      {atractivo.field_location && (
        <ComoLlegar
          onPress={() =>
            WebBrowser.openBrowserAsync(
              atractivo.field_mapslink ? atractivo.field_mapslink : `http://maps.google.com/maps?q=${atractivo.field_location.trim()}`
            )
          }
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#626262",
    fontFamily: "MuseoSans_900",
    fontSize: 28,
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

export default SingleAtractivo;
