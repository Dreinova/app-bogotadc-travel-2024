import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { Colors } from "../../../src/constants";
import { PreloaderComponent } from "../../../src/components";
import { selectActualLanguage } from "../../../src/store/selectors";
import { useSelector } from "react-redux";
import RenderHTML from "react-native-render-html";

const SingleBlog = () => {
  const { id } = useLocalSearchParams();
  const [blog, setBlog] = React.useState(null);
  const actualLanguage = useSelector(selectActualLanguage);

  const getSingleBlog = async () => {
    const data = await fetchBogotaDrplV2(`/blog/${id}/all`, actualLanguage);
    setBlog(data[0]);
  };

  React.useEffect(() => {
    getSingleBlog();
  }, []);

  if (!blog) {
    return <PreloaderComponent />;
  }

  const source = {
    html: blog.body,
  };

  const tagsStyles = {
    p: {
      textAlign: "left",
      color: "#777",
      fontFamily: "MuseoSans_500",
      lineHeight: 22,
      fontSize: 16,
    },
    ul: { paddingLeft: 0, margin: 0 },
    li: {
      textAlign: "left",
      color: "#777",
      fontFamily: "MuseoSans_500",
      lineHeight: 22,
      fontSize: 16,
    },
  };

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };

  const StyledFirstLetterText = ({ text }) => {
    // Obtén la primera letra del texto
    const firstLetter = text.charAt(0);
    // Obtén el resto del texto (desde el segundo carácter hasta el final)
    const restOfText = text.slice(1);

    return (
      <Text style={styles.container}>
        <Text style={styles.firstLetter}>{firstLetter}</Text>
        <Text
          style={{
            color: "#777777",
            fontFamily: "MuseoSans_500",
            fontSize: 16,
            lineHeight: 30,
          }}
        >
          {restOfText}
        </Text>
      </Text>
    );
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
            blog.field_cover_image ? blog.field_cover_image : "/img/noimg.png"
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
          <Text style={styles.text}>{blog.title}</Text>
        </View>
      </ImageBackground>
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <Text
          style={[
            {
              color: "#354999",
              fontFamily: "MuseoSans_500",
              lineHeight: 22,
              fontSize: 16,
            },
          ]}
        >
          {blog.field_intro_blog}
        </Text>
      </View>
      <RenderHTML
        baseStyle={{ paddingHorizontal: 20 }}
        renderersProps={renderersProps}
        contentWidth={windowWidth}
        source={source}
        tagsStyles={tagsStyles}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_500",
    fontSize: 20,
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
    fontFamily: "MuseoSans_500",
    fontSize: 33, // Establece el tamaño de la primera letra
    color: "#777777", // Establece el color de la primera letra
    // Agrega otros estilos según tus preferencias
  },
});

export default SingleBlog;
