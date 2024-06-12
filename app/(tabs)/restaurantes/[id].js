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
import { selectActualLanguage } from "../../../src/store/selectors";
import { useSelector } from "react-redux";

const SingleRestaurant = () => {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = React.useState(null);
  const actualLanguage = useSelector(selectActualLanguage);
  const getSingleRestaurant = async () => {
    const data = await fetchBogotaDrplV2(
      `/restaurants/${id}/all/all/all/all`,
      actualLanguage
    );
    setRestaurant(data[0]);
  };

  React.useEffect(() => {
    getSingleRestaurant();
  }, []);

  if (!restaurant) {
    return <PreloaderComponent />;
  }

  const renderImages = () => {
    return restaurant.field_galery.split(",").map((item, index) => {
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
      <ImageBackground
        style={{
          width: windowWidth,
          height: windowWidth - 120,
        }}
        source={{
          uri: `https://bogotadc.travel${
            restaurant.field_img ? restaurant.field_img : "/img/noimg.png"
          }`,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.5)",
            flex: 1,
            padding: 20,
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.text}>{restaurant.title}</Text>
        </View>
      </ImageBackground>
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        {restaurant.field_hadress && (
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync(
                `https://www.google.com/maps/search/?api=1&query=${restaurant.field_location.trim()}`
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
            <FontAwesome name="map-marker" size={22} color="#35498e" />
            <Text
              style={[
                { color: "#777", fontFamily: "MuseoSans_500", fontSize: 16 },
              ]}
            >
              {restaurant.field_hadress}
            </Text>
          </Pressable>
        )}
        {restaurant.field_htel && (
          <Pressable
            onPress={() => Linking.openURL(`tel:${restaurant.field_htel}`)}
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="phone" size={24} color="#35498e" />
            <Text
              style={[
                { color: "#777", fontFamily: "MuseoSans_500", fontSize: 16 },
              ]}
            >
              {restaurant.field_htel}
            </Text>
          </Pressable>
        )}
        {restaurant.field_hweb && (
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync(`${restaurant.field_hweb}`)
            }
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name="web" size={22} color="#58bf9c" />

            <Text
              style={[
                { color: "#777", fontFamily: "MuseoSans_500", fontSize: 16 },
              ]}
            >
              {restaurant.field_hweb}
            </Text>
          </Pressable>
        )}
        {restaurant.field_desc && (
          <ReadMoreText text={restaurant.field_desc} maxLines={3} />
        )}
      </View>
      {restaurant.field_location && (
        <ComoLlegar
          onPress={() =>
            WebBrowser.openBrowserAsync(
              `https://www.google.com/maps/search/?api=1&query=${restaurant.field_location.trim()}`
            )
          }
        />
      )}
      {restaurant.field_galery && (
        <Swiper
          style={{ height: (windowWidth / 16) * 9 }}
          dotColor="rgba(255,255,255,.8)"
          activeDotStyle={{ backgroundColor: Colors.orange }}
        >
          {renderImages()}
        </Swiper>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_700",
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
    fontFamily: "MuseoSans_700",
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

export default SingleRestaurant;
