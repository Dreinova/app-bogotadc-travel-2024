import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../constants/ScreenWidth";
import { Colors } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import IconSvg from "./IconSvg";
import { selectActualLanguage } from "../store/selectors";
import { useSelector } from "react-redux";
import RenderHTML from "react-native-render-html";
const setMidnight = (dateString) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
};

const DateComponent = ({ evento }) => {
  const actualLanguage = useSelector(selectActualLanguage);
  const dateStart = setMidnight(evento.field_date);

  let dateEnd;
  if (evento.field_end_date.length === 10) {
    dateEnd = setMidnight(evento.field_end_date);
    dateEnd.setDate(dateEnd.getDate() + 1);
  } else {
    dateEnd = setMidnight(evento.field_end_date);
  }

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const dateFormattedStart = dateStart.toLocaleDateString(actualLanguage == 'es' ? "es-ES":"en-US", options);
  const dateFormattedEnd = dateEnd.toLocaleDateString(actualLanguage == 'es' ? "es-ES":"en-US", options);
  const alText = actualLanguage === "es" ? "al" : "to";
  const hastaElText = actualLanguage === "es" ? "Hasta el" : "Until";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dateText = "";

  if (!evento.field_end_date) {
    dateText = dateFormattedStart;
  } else if (dateStart.getTime() === dateEnd.getTime()) {
    dateText = dateFormattedEnd;
  } else if (dateStart < today) {
    dateText = `${hastaElText} ${dateFormattedEnd}`;
  } else {
    dateText = `${dateFormattedStart} ${alText} ${dateFormattedEnd}`;
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <IconSvg
        width="8"
        height="12"
        icon={`<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.21772 7.203C8.15317 6.40456 8.15317 4.95898 7.21772 4.16054L3.29841 0.8153C2.00024 -0.292727 0 0.629781 0 2.33652L0 9.02701C0 10.7338 2.00024 11.6563 3.29841 10.5482L7.21772 7.203Z" fill="#35498E"/>
</svg>
`}
      />
      <Text
        style={{
          color: Colors.gray,
          fontFamily: "MuseoSans_500",
          fontSize: 20,
        }}
      >
        {dateText}
      </Text>
    </View>
  );
};

const CardEventoBig = ({
  image,
  title,
  onPress,
  start,
  end,
  place,
  isHorizontal,
  isRuta,
  desc,
}) => {
  const { width } = useWindowDimensions();
  const source = {
    html: desc,
  };

  const tagsStyles = {
    p: {
      color: Colors.gray,
      fontFamily: "MuseoSans_500",
      fontSize: 14,
      lineHeight: 20,
    },
  };

  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          justifyContent: "flex-end",
          opacity: pressed ? 0.5 : 1,
          width: windowWidth - 100,
          borderRadius: 10,
          overflow: "hidden",
          height: isRuta ? windowHeight - 300: windowHeight - 250,
        },
      ]}
    >
      <ImageBackground
        style={[
          {
            justifyContent: "flex-end",
            width: windowWidth - 100,
            borderRadius: 10,
            overflow: "hidden",
            height: windowHeight - 250,
          },
        ]}
        source={{ uri: image }}
        onLoad={handleImageLoad}
      >
        <View
          style={[
            {
              padding: 10,
              gap: 5,
              backgroundColor: "rgba(255,255,255,.9)",
              minHeight: 180,
              borderRadius: 10,
            },
          ]}
        >
          <Text
            style={{
              color: Colors.orange,
              fontFamily: "MuseoSans_700",
              fontSize: 28,
            }}
          >
            {title}
          </Text>
          {start ||
end ? (
              <DateComponent
                evento={{ field_date: start, field_end_date: end }}
              />
            ): (<View/>)}
          {place && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <IconSvg
                width="8"
                height="12"
                icon={`<svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.34059 12.6209C4.23787 12.5367 4.14342 12.4429 4.05853 12.3407C3.31309 11.278 2.56317 10.2175 1.83787 9.13913C1.22559 8.25746 0.727626 7.30146 0.355937 6.29409C0.11968 5.66482 -0.000907949 4.99793 5.14685e-06 4.32565C0.0288826 3.25607 0.441946 2.2328 1.16339 1.44363C1.88483 0.654469 2.86624 0.152355 3.92752 0.0294413C4.9888 -0.0934719 6.05874 0.171062 6.94098 0.774494C7.82322 1.37793 8.45856 2.27977 8.73042 3.31452C8.95188 4.22793 8.90287 5.18617 8.58939 6.07213C8.26335 7.0521 7.80384 7.98232 7.22386 8.83647C6.56349 9.83862 5.86729 10.8161 5.18677 11.8048C5.06365 11.9842 4.94724 12.1703 4.81293 12.3429C4.72511 12.4417 4.63089 12.5345 4.53087 12.6209H4.34059ZM4.43461 11.5851C4.44989 11.5697 4.4641 11.5532 4.47714 11.5358C5.1599 10.5516 5.85386 9.57856 6.51648 8.58313C7.09047 7.75232 7.54909 6.84726 7.87977 5.89278C8.14369 5.17597 8.20413 4.39994 8.05437 3.65082C7.85498 2.70519 7.29463 1.87498 6.49278 1.33722C5.69094 0.799455 4.71106 0.596688 3.76208 0.77215C2.81309 0.947613 1.97009 1.48742 1.41283 2.27648C0.855568 3.06553 0.628135 4.0414 0.779027 4.99599C0.89671 5.66711 1.11164 6.31742 1.41702 6.92632C1.92597 7.94082 2.51824 8.91119 3.18773 9.82741C3.59962 10.4081 4.01376 10.9887 4.43461 11.5851Z" fill="#35498E"/><path d="M4.45028 2.19807C4.88864 2.20206 5.31599 2.33604 5.67838 2.58308C6.04077 2.83012 6.32196 3.17916 6.48645 3.58612C6.65093 3.99308 6.69134 4.43973 6.60257 4.86967C6.5138 5.29962 6.29983 5.69358 5.98767 6.00183C5.67551 6.31009 5.27917 6.5188 4.84866 6.60164C4.41816 6.68448 3.9728 6.63771 3.56882 6.46726C3.16483 6.2968 2.82032 6.0103 2.57879 5.64391C2.33725 5.27752 2.20952 4.84768 2.21171 4.40864C2.21347 4.1162 2.2728 3.82697 2.38631 3.55752C2.49981 3.28807 2.66527 3.04368 2.8732 2.83835C3.08113 2.63302 3.32745 2.47078 3.59807 2.36091C3.86869 2.25104 4.15828 2.19571 4.45028 2.19807ZM4.43909 2.93792C4.14653 2.93792 3.86053 3.02478 3.61725 3.18751C3.37396 3.35025 3.18431 3.58157 3.07225 3.85222C2.96019 4.12288 2.93075 4.42073 2.98766 4.70814C3.04458 4.99555 3.18528 5.25961 3.392 5.46695C3.59871 5.67429 3.86216 5.81561 4.14904 5.87304C4.43593 5.93047 4.73338 5.90145 5.00379 5.78963C5.27421 5.6778 5.50546 5.48821 5.66832 5.2448C5.83118 5.00139 5.91834 4.7151 5.91878 4.4221C5.91819 4.02904 5.76218 3.65221 5.48487 3.37407C5.20757 3.09592 4.83155 2.9391 4.43909 2.93792Z" fill="#35498E"/></svg>`}
              />
              <Text
                style={{
                  color: Colors.gray,
                  fontFamily: "MuseoSans_500",
                  fontSize: 20,
                }}
              >
                {place}
              </Text>
            </View>
          )}
          {desc && (
            <RenderHTML
              baseStyle={{ flex: 1 }}
              contentWidth={width}
              source={source}
              tagsStyles={tagsStyles}
            />
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default CardEventoBig;
