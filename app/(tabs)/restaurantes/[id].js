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
import { Link, useLocalSearchParams } from "expo-router";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { TouchableOpacity } from "react-native";
import { selectActualLanguage } from "../../../src/store/selectors";
import { useSelector } from "react-redux";
import IconSvg from "../../../src/components/IconSvg";

const SingleRestaurant = () => {
  const { id,filterID } = useLocalSearchParams();
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 20,
        }}
      >
        <IconSvg
          width="24"
          height="24"
          icon={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.375 14.9999H19.9748L21.7399 7.5865C21.7625 7.49057 21.7465 7.38957 21.6953 7.30535C21.6441 7.22113 21.5617 7.16048 21.4661 7.1365L19.9661 6.7615C19.8709 6.73764 19.7702 6.75203 19.6855 6.8016C19.6008 6.85117 19.5389 6.93195 19.5131 7.02663L17.3385 14.9999H16.4902C16.7384 14.6772 16.8736 14.2819 16.875 13.8749V12.7499H15.75C15.3096 12.7509 14.8836 12.907 14.5468 13.1906C14.2099 13.4743 13.9836 13.8675 13.9076 14.3013C13.7636 14.0925 13.5783 13.9155 13.3632 13.7812C13.1481 13.6469 12.9077 13.5582 12.6569 13.5205C12.4061 13.4828 12.1503 13.497 11.9052 13.5621C11.6601 13.6273 11.431 13.742 11.232 13.8993C12 10.6158 12 10.5749 12 10.4999C11.9999 10.2918 11.9566 10.086 11.8727 9.89564C11.7888 9.70524 11.6662 9.53437 11.5127 9.3939C11.3592 9.25343 11.1782 9.14642 10.9811 9.07969C10.7841 9.01295 10.5753 8.98794 10.368 9.00625C10.2155 8.56574 9.92948 8.18371 9.54974 7.91332C9.16999 7.64293 8.71542 7.49763 8.24925 7.49763C7.78308 7.49763 7.32851 7.64293 6.94876 7.91332C6.56902 8.18371 6.283 8.56574 6.1305 9.00625C5.92336 8.98816 5.71473 9.01334 5.51784 9.08017C5.32095 9.14701 5.1401 9.25405 4.98678 9.3945C4.83346 9.53495 4.71102 9.70574 4.62722 9.89603C4.54342 10.0863 4.5001 10.292 4.5 10.4999C4.5 10.6015 4.50225 10.7714 5.1375 12.7761C5.05072 12.7612 4.96301 12.7525 4.875 12.7499H3.75V13.8749C3.75138 14.2819 3.88657 14.6772 4.13475 14.9999H2.625C2.52554 14.9999 2.43016 15.0394 2.35984 15.1097C2.28951 15.18 2.25 15.2754 2.25 15.3749C2.25 18.865 5.52225 21.0749 6.375 21.5905V22.8749C6.375 22.9743 6.41451 23.0697 6.48483 23.14C6.55516 23.2104 6.65054 23.2499 6.75 23.2499H17.25C17.3495 23.2499 17.4448 23.2104 17.5152 23.14C17.5855 23.0697 17.625 22.9743 17.625 22.8749V21.5905C18.4778 21.0749 21.75 18.865 21.75 15.3749C21.75 15.2754 21.7105 15.18 21.6402 15.1097C21.5698 15.0394 21.4745 14.9999 21.375 14.9999ZM20.1401 7.57788L20.9242 7.77363L19.2038 14.9999H18.1163L20.1401 7.57788ZM14.625 14.6249C14.625 14.3265 14.7435 14.0404 14.9545 13.8294C15.1655 13.6184 15.4516 13.4999 15.75 13.4999H16.125V13.8749C16.125 14.1732 16.0065 14.4594 15.7955 14.6704C15.5845 14.8814 15.2984 14.9999 15 14.9999H14.625V14.6249ZM12.375 14.2499C12.6076 14.2502 12.8344 14.3224 13.0244 14.4567C13.2143 14.5909 13.358 14.7807 13.4359 14.9999H11.3141C11.392 14.7807 11.5357 14.5909 11.7256 14.4567C11.9156 14.3224 12.1424 14.2502 12.375 14.2499ZM10.4359 14.9999H8.31413C8.39158 14.7804 8.53521 14.5903 8.72522 14.4559C8.91522 14.3215 9.14225 14.2493 9.375 14.2493C9.60775 14.2493 9.83478 14.3215 10.0248 14.4559C10.2148 14.5903 10.3584 14.7804 10.4359 14.9999ZM5.25 10.4999C5.2473 10.3771 5.2753 10.2557 5.33148 10.1465C5.38766 10.0373 5.47023 9.94391 5.57168 9.87476C5.67313 9.80561 5.79025 9.76291 5.9124 9.75053C6.03455 9.73815 6.15786 9.75649 6.27112 9.80388C6.3232 9.82376 6.37906 9.83177 6.43463 9.82735C6.4902 9.82292 6.54408 9.80616 6.59236 9.77829C6.64063 9.75041 6.68209 9.71213 6.7137 9.66622C6.74532 9.6203 6.7663 9.56792 6.77512 9.51288C6.8297 9.16088 7.00838 8.84001 7.27886 8.60824C7.54934 8.37647 7.8938 8.24907 8.25 8.24907C8.6062 8.24907 8.95066 8.37647 9.22114 8.60824C9.49162 8.84001 9.6703 9.16088 9.72488 9.51288C9.7337 9.56792 9.75468 9.6203 9.7863 9.66622C9.81791 9.71213 9.85937 9.75041 9.90764 9.77829C9.95592 9.80616 10.0098 9.82292 10.0654 9.82735C10.1209 9.83177 10.1768 9.82376 10.2289 9.80388C10.3401 9.75735 10.4611 9.73883 10.5812 9.74997C10.7013 9.7611 10.8168 9.80154 10.9176 9.86774C11.0185 9.93394 11.1015 10.0239 11.1594 10.1296C11.2174 10.2354 11.2485 10.3538 11.25 10.4744C11.1997 10.7403 10.7603 12.6258 10.4715 13.8606C10.1536 13.627 9.76953 13.5006 9.375 13.4999C8.94292 13.5004 8.52424 13.6499 8.18953 13.9231C7.85482 14.1964 7.62454 14.5767 7.5375 14.9999H6.75V14.6249C6.74896 14.3467 6.68567 14.0723 6.56479 13.8218C6.4439 13.5712 6.26848 13.3509 6.05137 13.177C5.35462 11.0046 5.25787 10.57 5.25 10.4999ZM4.5 13.8749V13.4999H4.875C5.17337 13.4999 5.45952 13.6184 5.6705 13.8294C5.88147 14.0404 6 14.3265 6 14.6249V14.9999H5.625C5.32663 14.9999 5.04048 14.8814 4.8295 14.6704C4.61853 14.4594 4.5 14.1732 4.5 13.8749ZM17.1488 20.9999H15.375V21.7499H16.875V22.4999H7.125V21.7499H12V20.9999H6.85125C6.429 20.7501 4.28362 19.3915 3.39225 17.2499H7.5V16.4999H3.14438C3.08098 16.2538 3.03783 16.003 3.01538 15.7499H20.9846C20.9622 16.003 20.919 16.2538 20.8556 16.4999H12.75V17.2499H20.6077C19.7164 19.3915 17.571 20.7501 17.1488 20.9999Z" fill="#354999"/><path d="M8.25 16.5H9V17.25H8.25V16.5Z" fill="#354999"/><path d="M9.75 16.5H10.5V17.25H9.75V16.5Z" fill="#354999"/><path d="M11.25 16.5H12V17.25H11.25V16.5Z" fill="#354999"/><path d="M11.4341 6.50775C11.3398 6.72426 11.3174 6.96534 11.3704 7.1955C11.532 7.953 12.4061 8.72325 13.404 8.98762C14.1664 9.19513 14.9479 9.32492 15.7365 9.375H15.75C15.819 9.37497 15.8866 9.35592 15.9454 9.31996C16.0042 9.284 16.052 9.23251 16.0835 9.17115C16.115 9.1098 16.1289 9.04095 16.1238 8.97219C16.1187 8.90342 16.0947 8.8374 16.0545 8.78137C16.0504 8.77537 15.6304 8.19187 14.922 7.27125C14.6074 6.86212 13.7719 5.89875 12.8115 5.78475C12.519 5.7483 12.2225 5.80652 11.9655 5.95088C11.7575 5.85641 11.5803 5.70552 11.4538 5.51533C11.3273 5.32515 11.2567 5.1033 11.25 4.875H10.5C10.4998 5.20498 10.5859 5.52928 10.7498 5.8157C10.9136 6.10212 11.1496 6.3407 11.4341 6.50775ZM12.6304 6.52387C12.6613 6.52387 12.6923 6.52587 12.723 6.52988C13.1861 6.58463 13.8008 7.044 14.328 7.72988C14.5684 8.04263 14.7754 8.31563 14.9434 8.53988C14.4894 8.47317 14.0396 8.3809 13.596 8.2635C12.8153 8.05687 12.1943 7.46438 12.1039 7.04025C12.0846 6.97219 12.0868 6.89982 12.1104 6.83311C12.134 6.76641 12.1777 6.70867 12.2355 6.66788C12.3458 6.57459 12.4859 6.52391 12.6304 6.525V6.52387Z" fill="#354999"/><path d="M6.75 11.25H7.5V12H6.75V11.25Z" fill="#354999"/><path d="M8.625 12H9.375V12.75H8.625V12Z" fill="#354999"/><path d="M4.10435 6.74995C4.2026 6.7552 4.55772 6.77245 5.02722 6.77245C5.96135 6.77245 7.34735 6.70345 8.0501 6.33183C8.51746 6.05835 8.86223 5.61615 9.01347 5.0962C9.10455 4.8514 9.1464 4.59103 9.13662 4.33002C9.12684 4.06901 9.06562 3.8125 8.95647 3.5752C8.4941 2.69995 7.0946 2.5702 6.19985 3.04345C5.13072 3.60858 3.92435 5.94108 3.79047 6.20508C3.76208 6.26072 3.74804 6.32258 3.74963 6.38503C3.75122 6.44748 3.76839 6.50854 3.79957 6.56268C3.83075 6.61681 3.87496 6.66229 3.92819 6.695C3.98141 6.7277 4.04197 6.74659 4.10435 6.74995ZM6.29022 4.67808L5.14722 5.34483C5.3231 5.06695 5.51547 4.78758 5.70972 4.53333L6.29022 4.67808ZM6.74997 5.2777V5.91933C6.33158 5.97322 5.9106 6.00464 5.48885 6.01345L6.74997 5.2777ZM8.30022 4.8652C8.20728 5.19865 7.99335 5.48546 7.70022 5.66958C7.6355 5.70116 7.56872 5.72835 7.50035 5.75095V4.84045L8.38272 4.32558C8.38554 4.50843 8.35765 4.69045 8.30022 4.86408V4.8652ZM8.0171 3.67158L7.2176 4.13808L6.28197 3.90408C6.36443 3.82918 6.45484 3.76353 6.5516 3.70833C6.77785 3.59396 7.02666 3.53125 7.28009 3.5247C7.53352 3.51815 7.78524 3.56793 8.0171 3.67045V3.67158Z" fill="#354999"/><path d="M16.875 3.75H17.625C17.7245 3.75 17.8198 3.71049 17.8902 3.64016C17.9605 3.56984 18 3.47446 18 3.375C17.9992 2.67905 17.7224 2.01183 17.2303 1.51972C16.7382 1.02761 16.0709 0.750794 15.375 0.75H14.625C14.5255 0.75 14.4302 0.789509 14.3598 0.859835C14.2895 0.930161 14.25 1.02554 14.25 1.125C14.2508 1.82095 14.5276 2.48817 15.0197 2.98028C15.5118 3.47239 16.1791 3.74921 16.875 3.75ZM15.375 1.5C15.8071 1.50048 16.2258 1.64994 16.5605 1.92319C16.8953 2.19643 17.1255 2.57675 17.2125 3H16.875C16.4429 2.99952 16.0242 2.85006 15.6895 2.57681C15.3547 2.30357 15.1245 1.92325 15.0375 1.5H15.375Z" fill="#354999"/><path d="M12.375 3.75C12.5975 3.75 12.815 3.68402 13 3.5604C13.185 3.43679 13.3292 3.26109 13.4144 3.05552C13.4995 2.84995 13.5218 2.62375 13.4784 2.40552C13.435 2.1873 13.3278 1.98684 13.1705 1.82951C13.0132 1.67217 12.8127 1.56503 12.5945 1.52162C12.3762 1.47821 12.15 1.50049 11.9445 1.58564C11.7389 1.67078 11.5632 1.81498 11.4396 1.99998C11.316 2.18499 11.25 2.4025 11.25 2.625C11.25 2.92337 11.3685 3.20952 11.5795 3.4205C11.7905 3.63147 12.0766 3.75 12.375 3.75ZM12.375 2.25C12.4492 2.25 12.5217 2.27199 12.5833 2.3132C12.645 2.3544 12.6931 2.41297 12.7215 2.48149C12.7498 2.55002 12.7573 2.62542 12.7428 2.69816C12.7283 2.7709 12.6926 2.83772 12.6402 2.89017C12.5877 2.94261 12.5209 2.97833 12.4482 2.9928C12.3754 3.00726 12.3 2.99984 12.2315 2.97146C12.163 2.94307 12.1044 2.89501 12.0632 2.83334C12.022 2.77167 12 2.69917 12 2.625C12 2.52554 12.0395 2.43016 12.1098 2.35984C12.1802 2.28951 12.2755 2.25 12.375 2.25Z" fill="#354999"/><path d="M16.5 6C16.5 6.2225 16.566 6.44001 16.6896 6.62502C16.8132 6.81002 16.9889 6.95422 17.1945 7.03936C17.4 7.12451 17.6262 7.14679 17.8445 7.10338C18.0627 7.05998 18.2632 6.95283 18.4205 6.7955C18.5778 6.63816 18.685 6.43771 18.7284 6.21948C18.7718 6.00125 18.7495 5.77505 18.6644 5.56948C18.5792 5.36391 18.435 5.18821 18.25 5.0646C18.065 4.94098 17.8475 4.875 17.625 4.875C17.3266 4.875 17.0405 4.99353 16.8295 5.2045C16.6185 5.41548 16.5 5.70163 16.5 6ZM18 6C18 6.07417 17.978 6.14667 17.9368 6.20834C17.8956 6.27001 17.837 6.31807 17.7685 6.34645C17.7 6.37484 17.6246 6.38226 17.5518 6.36779C17.4791 6.35333 17.4123 6.31761 17.3598 6.26517C17.3074 6.21272 17.2717 6.1459 17.2572 6.07316C17.2427 6.00042 17.2502 5.92502 17.2785 5.85649C17.3069 5.78797 17.355 5.7294 17.4167 5.6882C17.4783 5.64699 17.5508 5.625 17.625 5.625C17.7245 5.625 17.8198 5.66451 17.8902 5.73484C17.9605 5.80516 18 5.90054 18 6Z" fill="#354999"/><path d="M13.875 10.875H14.625V11.625H13.875V10.875Z" fill="#354999"/><path d="M15 4.5H15.75V5.25H15V4.5Z" fill="#354999"/><path d="M9 1.125H9.75V1.875H9V1.125Z" fill="#354999"/><path d="M16.875 9.375H17.625V10.125H16.875V9.375Z" fill="#354999"/></svg>`}
        />
        <Text
          style={{
            fontFamily: "MuseoSans_500",
            fontSize: 30,
            paddingVertical: 20,
            color: "#354999",
          }}
        >
          {restaurant.title}
        </Text>
      </View>

      {restaurant.field_galery && (
        <Swiper
          style={{ height: (windowWidth / 16) * 9 }}
          dotColor="rgba(255,255,255,.8)"
          activeDotStyle={{ backgroundColor: Colors.orange }}
        >
          {renderImages()}
        </Swiper>
      )}
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        {restaurant.field_desc && (
          <Text style={{     color: "#777",
            fontFamily: "MuseoSans_500",
            fontSize: 16,
            lineHeight: 20,
            marginBottom: 15,}}>
            {restaurant.field_desc}
          </Text>
        )}
        {restaurant.field_hadress && (
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync(
                `https://www.google.com/maps/search/?api=1&query=${restaurant.field_location.trim()}`
              )
            }
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <IconSvg
              width={20}
              height={20}
              icon={`<svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.01731 17C5.87895 16.8866 5.75173 16.7602 5.63738 16.6225C4.63329 15.1911 3.62317 13.7627 2.64621 12.3102C1.82149 11.1226 1.15075 9.83486 0.650092 8.47796C0.33186 7.63036 0.169431 6.73207 0.170661 5.82653C0.209558 4.38583 0.765943 3.00752 1.7377 1.94453C2.70946 0.881552 4.03141 0.205217 5.46092 0.0396567C6.89043 -0.125904 8.33161 0.230416 9.51996 1.04322C10.7083 1.85603 11.5641 3.07079 11.9303 4.46457C12.2286 5.6949 12.1626 6.98562 11.7403 8.17899C11.3012 9.49898 10.6822 10.752 9.901 11.9025C9.01149 13.2524 8.07373 14.569 7.15709 15.9008C6.99125 16.1424 6.83445 16.393 6.65353 16.6255C6.53525 16.7586 6.40833 16.8837 6.27361 17H6.01731ZM6.14395 15.6048C6.16453 15.584 6.18368 15.5618 6.20124 15.5384C7.1209 14.2127 8.05564 12.9021 8.94817 11.5612C9.72132 10.4422 10.3391 9.22307 10.7845 7.93741C11.14 6.97189 11.2214 5.92659 11.0197 4.91755C10.7511 3.64381 9.99632 2.52555 8.91626 1.8012C7.8362 1.07684 6.51632 0.803722 5.23807 1.04007C3.95981 1.27641 2.82431 2.00352 2.0737 3.06635C1.32308 4.12919 1.01674 5.44365 1.21998 6.72946C1.3785 7.63344 1.66801 8.50939 2.07934 9.32956C2.76488 10.6961 3.56266 12.0031 4.46443 13.2373C5.01925 14.0194 5.57707 14.8015 6.14395 15.6048Z" fill="#354999"/><path d="M6.16523 2.96079C6.75568 2.96617 7.33131 3.14663 7.81945 3.47939C8.30758 3.81215 8.68633 4.28228 8.90789 4.83045C9.12944 5.37862 9.18387 5.98024 9.0643 6.55936C8.94473 7.13849 8.65652 7.66915 8.23605 8.08436C7.81558 8.49956 7.28172 8.7807 6.70184 8.89228C6.12197 9.00385 5.52208 8.94087 4.97792 8.71127C4.43376 8.48167 3.96972 8.09576 3.64438 7.60224C3.31904 7.10873 3.14698 6.52974 3.14994 5.93837C3.15231 5.54446 3.23222 5.15488 3.38511 4.79193C3.538 4.42899 3.76086 4.09981 4.04094 3.82323C4.32102 3.54666 4.65281 3.32812 5.01732 3.18013C5.38184 3.03214 5.77192 2.95761 6.16523 2.96079ZM6.15015 3.95734C5.75608 3.95734 5.37086 4.07434 5.04316 4.29354C4.71546 4.51275 4.45999 4.82432 4.30905 5.18889C4.15811 5.55346 4.11847 5.95466 4.19513 6.34179C4.27179 6.72891 4.46131 7.08459 4.73975 7.36388C5.01819 7.64316 5.37305 7.83351 5.75947 7.91087C6.1459 7.98823 6.54655 7.94913 6.91079 7.79852C7.27504 7.6479 7.58653 7.39252 7.8059 7.06465C8.02526 6.73679 8.14266 6.35116 8.14326 5.95649C8.14246 5.42705 7.93232 4.91948 7.5588 4.54483C7.18527 4.17017 6.67879 3.95894 6.15015 3.95734Z" fill="#354999"/></svg>`}
            />
            <Text
              style={[
                {
                  color: "#777",
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 22,
                  width: 300,
                },
              ]}
            >
              {restaurant.field_hadress}
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
              gap: 8,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <IconSvg
              width={20}
              height={20}
              icon={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6466 0.661865H5.63872C2.79068 0.661865 0.473633 2.97891 0.473633 5.82695V12.8348C0.473633 15.6828 2.79068 17.9999 5.63872 17.9999H12.6466C15.4946 17.9999 17.8116 15.6828 17.8116 12.8348V5.82695C17.8116 2.97891 15.4946 0.661865 12.6466 0.661865ZM16.0674 12.8348C16.0674 14.7241 14.5358 16.2557 12.6466 16.2557H5.63872C3.74943 16.2557 2.21784 14.7241 2.21784 12.8348V5.82695C2.21784 3.93764 3.74943 2.40607 5.63872 2.40607H12.6466C14.5358 2.40607 16.0674 3.93764 16.0674 5.82695V12.8348Z" fill="#354999"/><path d="M9.14267 4.84668C6.67007 4.84668 4.65845 6.8583 4.65845 9.33087C4.65845 11.8035 6.67007 13.8151 9.14267 13.8151C11.6153 13.8151 13.6269 11.8035 13.6269 9.33087C13.6269 6.85827 11.6153 4.84668 9.14267 4.84668ZM9.14267 12.0709C7.62939 12.0709 6.40265 10.8442 6.40265 9.33091C6.40265 7.81762 7.62942 6.59088 9.14267 6.59088C10.656 6.59088 11.8827 7.81762 11.8827 9.33091C11.8827 10.8442 10.6559 12.0709 9.14267 12.0709Z" fill="#354999"/><path d="M13.6353 5.95469C14.2287 5.95469 14.7098 5.47361 14.7098 4.88018C14.7098 4.28674 14.2287 3.80566 13.6353 3.80566C13.0419 3.80566 12.5608 4.28674 12.5608 4.88018C12.5608 5.47361 13.0419 5.95469 13.6353 5.95469Z" fill="#354999"/></svg>`}
            />
            <Text
              style={[
                {
                  color: Colors.orange,
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 22,
                  width: 300,
                },
              ]}
            >
              Instagram
            </Text>
          </Pressable>
        )}
        {restaurant.field_booklink && (
          <Pressable
            onPress={() =>
              WebBrowser.openBrowserAsync(`${restaurant.field_booklink}`)
            }
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <IconSvg
              width={20}
              height={20}
              icon={`<svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.2849 5.5178C26.2849 5.10653 25.9752 4.71549 22.2364 4.45145C21.7227 4.41516 21.1604 4.38304 20.5583 4.35468C20.5583 4.35468 19.4738 0.439436 19.3516 0.286355C19.2817 0.197386 19.1924 0.125511 19.0906 0.076185C18.9888 0.0268587 18.877 0.00137697 18.7639 0.00167386L7.09011 5.52183e-06C6.92111 -0.000644193 6.75689 0.0560591 6.6243 0.160845C6.49171 0.265631 6.39859 0.412301 6.36016 0.576875L5.46337 4.36761C4.96053 4.39285 4.48565 4.42059 4.04789 4.45103C0.309708 4.71549 0 5.10653 0 5.5178C0 5.77183 0.00229426 6.2221 2.90416 6.66675C2.8986 6.69751 2.89574 6.72871 2.89561 6.75997C2.89561 7.99922 7.65301 8.6543 11.6112 8.79174L11.8521 15.8537C11.8548 15.9348 11.889 16.0118 11.9473 16.0682C12.0057 16.1246 12.0837 16.1561 12.1649 16.1561H12.1756C12.2166 16.1547 12.257 16.1453 12.2945 16.1283C12.3319 16.1113 12.3656 16.0871 12.3936 16.0571C12.4217 16.0271 12.4436 15.9918 12.458 15.9533C12.4725 15.9148 12.4792 15.8739 12.4778 15.8328L12.2379 8.80946C12.5472 8.81593 12.8503 8.81968 13.1427 8.81968C13.435 8.81968 13.7381 8.81593 14.0474 8.80946L13.8075 15.8328C13.8061 15.8739 13.8129 15.9148 13.8273 15.9533C13.8417 15.9918 13.8636 16.0271 13.8917 16.0571C13.9197 16.0871 13.9534 16.1113 13.9908 16.1283C14.0283 16.1453 14.0687 16.1547 14.1097 16.1561H14.1204C14.2016 16.1561 14.2796 16.1246 14.338 16.0682C14.3963 16.0118 14.4305 15.9348 14.4332 15.8537L14.6741 8.79174C18.6323 8.6543 23.3897 7.99922 23.3897 6.75997C23.3896 6.72871 23.3867 6.69751 23.3811 6.66675C26.2826 6.2221 26.2849 5.77245 26.2849 5.5178ZM5.96807 4.95449L6.96915 0.72078C6.97548 0.693589 6.99085 0.669353 7.01275 0.652038C7.03465 0.634723 7.06178 0.625356 7.08969 0.625469L18.7637 0.627137C18.7824 0.627121 18.8009 0.631352 18.8177 0.639513C18.8346 0.647674 18.8493 0.659552 18.8609 0.674251C18.8725 0.68895 18.8806 0.706086 18.8846 0.724369C18.8886 0.742653 18.8884 0.761606 18.884 0.779801L17.8829 5.01351C17.8766 5.04072 17.8613 5.06499 17.8394 5.08234C17.8175 5.09969 17.7903 5.1091 17.7624 5.10903L6.08841 5.10695C6.06972 5.10696 6.05126 5.10273 6.03444 5.09458C6.01762 5.08643 6.00286 5.07457 5.99128 5.0599C5.97969 5.04522 5.97159 5.02812 5.96757 5.00986C5.96355 4.9916 5.96372 4.97267 5.96807 4.95449ZM13.1424 8.1938C7.6893 8.1938 3.89668 7.28387 3.53421 6.76373C3.53588 6.76206 3.53901 6.75976 3.54088 6.75789C3.69855 6.77874 3.8606 6.7996 4.03266 6.82045C7.05733 7.15799 10.099 7.31962 13.1424 7.30451C16.1858 7.31982 19.2275 7.15841 22.2522 6.82108C22.4243 6.80022 22.5859 6.77937 22.744 6.75851C22.7459 6.76039 22.749 6.76268 22.7507 6.76435C22.3882 7.28387 18.5956 8.1938 13.1424 8.1938ZM25.3825 5.59163C24.1015 6.07674 19.2772 6.67884 13.1424 6.67884C7.00773 6.67884 2.18485 6.07695 0.903053 5.59184C0.892114 5.58764 0.882765 5.58011 0.87632 5.57033C0.869875 5.56054 0.866656 5.54898 0.867116 5.53727C0.867576 5.52556 0.871692 5.51429 0.878885 5.50504C0.886079 5.49579 0.895989 5.48902 0.907224 5.48569C1.47825 5.3203 2.81969 5.13114 5.34094 4.99891C5.34418 5.19492 5.42443 5.38177 5.56434 5.51907C5.70426 5.65637 5.89259 5.73308 6.08862 5.73262L17.7626 5.7347C17.9317 5.73529 18.0959 5.67852 18.2285 5.57365C18.3611 5.46879 18.4542 5.32205 18.4926 5.15742L19.2236 2.0643L20.0847 4.95491C20.089 4.97308 20.0891 4.99198 20.0851 5.01021C20.0811 5.02844 20.073 5.04552 20.0614 5.06017C20.0498 5.07482 20.0351 5.08666 20.0183 5.09479C20.0015 5.10293 19.983 5.10716 19.9643 5.10715H18.9068C18.8238 5.10715 18.7442 5.14011 18.6855 5.19878C18.6269 5.25745 18.5939 5.33702 18.5939 5.41999C18.5939 5.50296 18.6269 5.58253 18.6855 5.6412C18.7442 5.69987 18.8238 5.73283 18.9068 5.73283H19.9643C20.0775 5.73302 20.1892 5.70747 20.291 5.65812C20.3929 5.60876 20.4821 5.53689 20.5521 5.44794C20.6556 5.31673 20.7115 5.15418 20.7104 4.98703C23.382 5.11925 24.7883 5.31509 25.3766 5.48569C25.3879 5.48887 25.3978 5.49549 25.4051 5.50461C25.4124 5.51373 25.4167 5.52491 25.4173 5.53658C25.418 5.54824 25.415 5.55982 25.4087 5.56969C25.4025 5.57956 25.3933 5.58723 25.3825 5.59163Z" fill="#354999"/></svg>`}
            />
            <Text
              style={[
                {
                  color: Colors.orange,
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 22,
                  width: 300,
                },
              ]}
            >
              Reservas
            </Text>
          </Pressable>
        )}
        {restaurant.field_foodzone_1 && (
          <Link
          style={{marginBottom:15}}
            href={{
              pathname: "/restaurantes",
              params: { zone: restaurant.field_foodzone, filterID },
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                marginBottom: 15,
                alignItems: "center",
              }}
            >
              <IconSvg
                width={20}
                height={20}
                icon={`<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.28987 4.80688H6.02978C5.73354 4.80688 5.49268 5.04774 5.49268 5.34399V10.6693C5.49268 10.9653 5.73354 11.2064 6.02978 11.2064H9.28987C9.58612 11.2064 9.82698 10.9653 9.82698 10.6693V5.34399C9.82698 5.04774 9.58612 4.80688 9.28987 4.80688ZM7.33748 10.5618H6.13721V9.24391H7.33748V10.5618ZM7.33748 8.59938H6.13721V7.41371H7.33748V8.59938ZM7.33748 6.76918H6.13721V5.45142H7.33748V6.76918ZM9.18245 10.5618H7.98201V9.24391H9.18245V10.5618ZM9.18245 8.59938H7.98201V7.41371H9.18245V8.59938ZM9.18245 6.76918H7.98201V5.45142H9.18245V6.76918Z" fill="#354999"/><path d="M13.6123 17.6729C13.4342 17.6729 13.29 17.8172 13.29 17.9951V18.7689C13.29 18.9468 13.4342 19.0912 13.6123 19.0912C13.7904 19.0912 13.9346 18.9468 13.9346 18.7689V17.9951C13.9346 17.8172 13.7904 17.6729 13.6123 17.6729Z" fill="#354999"/><path d="M22.1395 14.4184C22.1246 14.3052 22.0667 14.2044 21.9765 14.1345L15.149 8.8519C14.9976 8.73491 14.8167 8.67297 14.6257 8.67297C14.4345 8.67297 14.2536 8.73491 14.102 8.85207L13.0694 9.65102V8.72551C13.0694 8.54742 12.9252 8.40324 12.7472 8.40324C12.5691 8.40324 12.4249 8.54742 12.4249 8.72551V10.1497L7.27502 14.1344C7.18539 14.2035 7.1258 14.3078 7.1117 14.4197C7.0971 14.533 7.12748 14.6455 7.19714 14.7363L7.71964 15.4159C7.80172 15.5221 7.92559 15.5831 8.0597 15.5831C8.15403 15.5831 8.24719 15.5513 8.32205 15.4934L14.6257 10.6161L19.3904 14.3027V21.0173H16.7948V20.413C16.7948 20.2349 16.6506 20.0907 16.4725 20.0907C16.2944 20.0907 16.1502 20.2349 16.1502 20.413V21.0173H13.1006V16.0802H16.1502V18.8984C16.1502 19.0764 16.2944 19.2206 16.4725 19.2206C16.6506 19.2206 16.7948 19.0764 16.7948 18.8984V15.9728C16.7948 15.6767 16.5537 15.4357 16.2577 15.4357H12.9934C12.6971 15.4357 12.4561 15.6767 12.4561 15.9728V21.0173H10.0072V20.1382C10.0072 19.842 9.76637 19.6011 9.47012 19.6011H9.16161C9.18729 19.4729 9.20123 19.3405 9.20123 19.2048C9.20123 18.0895 8.29368 17.1821 7.17834 17.1821C6.57292 17.1821 6.00643 17.4599 5.6276 17.9104C5.48426 17.8651 5.33186 17.8404 5.17375 17.8404C5.0576 17.8404 4.94346 17.8533 4.83252 17.8792C4.48155 17.278 3.82661 16.8913 3.11863 16.8913C3.04327 16.8913 2.96875 16.896 2.89523 16.9045V6.117L7.66006 2.43008L12.4251 6.117V7.22144C12.4251 7.39952 12.5692 7.5437 12.7473 7.5437C12.9252 7.5437 13.0696 7.39952 13.0696 7.22144V6.61568L13.9639 7.30754C14.0386 7.36545 14.1317 7.39717 14.226 7.39717C14.3605 7.39717 14.4845 7.33607 14.5663 7.22966C14.5674 7.22815 14.5686 7.22647 14.5698 7.22496L15.0703 6.54887L15.0735 6.54485C15.1066 6.50339 15.1944 6.39345 15.1739 6.23248C15.1589 6.11885 15.1009 6.01797 15.0109 5.94865L8.18357 0.666016C8.03217 0.549026 7.85124 0.487091 7.66006 0.487091C7.46888 0.487091 7.28794 0.549026 7.13638 0.666183L5.26187 2.11655V1.71036C5.51532 1.66739 5.70901 1.44684 5.70901 1.18147V0.537109C5.70901 0.24086 5.46798 0 5.1719 0H2.56038C2.2643 0 2.02327 0.24086 2.02327 0.537109V1.1813C2.02327 1.44684 2.21696 1.66722 2.47041 1.71036V4.2764L0.30989 5.94815C0.219924 6.0173 0.160339 6.1217 0.14624 6.23332C0.131469 6.34679 0.161682 6.45924 0.231506 6.55022L0.754012 7.22983C0.835921 7.33624 0.959792 7.39717 1.09407 7.39717C1.1884 7.39717 1.28139 7.36545 1.35658 7.30754L2.2507 6.61568V17.094C1.7391 17.3458 1.34517 17.8124 1.19881 18.3816C0.71289 18.5689 0.379043 19.0409 0.379043 19.5766C0.379043 19.6357 0.383239 19.6938 0.39096 19.7509C0.288741 19.8487 0.22496 19.986 0.22496 20.1382V21.1248C0.22496 21.4209 0.46582 21.662 0.762069 21.662H20.9689C21.147 21.662 21.2912 21.5176 21.2912 21.3397C21.2912 21.1616 21.147 21.0174 20.9689 21.0174H20.0349V14.8014L20.9293 15.4934C21.004 15.5512 21.0972 15.5831 21.1915 15.5831C21.326 15.5831 21.45 15.522 21.5317 15.4154C21.5329 15.4139 21.5341 15.4124 21.5353 15.4108L22.0359 14.7346L22.0393 14.7304C22.0722 14.6891 22.1598 14.5792 22.1395 14.4184ZM7.17834 17.8267C7.93835 17.8267 8.55669 18.445 8.55669 19.2048C8.55669 19.3427 8.53588 19.4756 8.49812 19.6011H6.65986C6.67379 19.5192 6.68151 19.435 6.68151 19.349C6.68151 18.9118 6.49436 18.5177 6.19644 18.2417C6.45123 17.9831 6.80371 17.8267 7.17834 17.8267ZM2.6678 0.644531H5.06448V1.07388H2.6678V0.644531ZM4.61734 1.71841V2.61522L3.11494 3.77773V1.71841H4.61734ZM1.13318 6.66553L0.873183 6.32732L7.53065 1.17593C7.56875 1.14656 7.61222 1.13162 7.66006 1.13162C7.70789 1.13162 7.75137 1.14656 7.7893 1.17577L14.4377 6.3201L14.1839 6.66301L7.85728 1.76776C7.74113 1.67796 7.57899 1.67796 7.46284 1.76776L1.13318 6.66553ZM9.36269 21.0174H0.869491V20.2457H3.83802C4.01594 20.2457 4.16029 20.1015 4.16029 19.9234C4.16029 19.7453 4.01594 19.6011 3.83802 19.6011H1.02441C1.02408 19.5929 1.02357 19.5849 1.02357 19.5766C1.02357 19.2727 1.23959 19.01 1.53752 18.9522C1.6723 18.9261 1.77569 18.8175 1.79516 18.6817C1.88916 18.0286 2.45816 17.5359 3.11863 17.5359C3.66716 17.5359 4.16868 17.8802 4.36657 18.3925C4.3988 18.4761 4.46426 18.5424 4.54751 18.5758C4.63076 18.609 4.72392 18.606 4.80499 18.5677C4.9208 18.513 5.04501 18.4851 5.17375 18.4851C5.64976 18.4851 6.03698 18.8727 6.03698 19.3492C6.03698 19.437 6.02322 19.5214 5.99871 19.6011H5.3849C5.20681 19.6011 5.06263 19.7455 5.06263 19.9234C5.06263 20.1015 5.20681 20.2457 5.3849 20.2457H9.36269V21.0174ZM21.1495 14.8489L14.8229 9.95381C14.7068 9.86385 14.5446 9.86385 14.4285 9.95381L8.09864 14.8514L7.83865 14.5132L14.4963 9.36198C14.5344 9.33244 14.5779 9.3175 14.6257 9.3175C14.6734 9.3175 14.717 9.33244 14.7549 9.36182L21.4033 14.506L21.1495 14.8489Z" fill="#354999"/></svg>`}
              />
              <Text
                 style={{
                  color: Colors.orange,
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 22,
                  width: 300,
                }}
              >
                {restaurant.field_foodzone_1}
              </Text>
            </View>
          </Link>
        )}
        {restaurant.field_htel && (
          <Pressable
            onPress={() => Linking.openURL(`tel:${restaurant.field_htel}`)}
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <IconSvg
              width={20}
              height={20}
              icon={`<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.78995 12.1212C5.57207 14.2434 7.71734 15.9144 10.1659 17.0967C11.0981 17.5369 12.3448 18.059 13.7338 18.1485C13.82 18.1523 13.9023 18.156 13.9884 18.156C14.9207 18.156 15.6695 17.8352 16.2797 17.1751C16.2835 17.1713 16.291 17.1639 16.2947 17.1564C16.5118 16.8953 16.7589 16.6604 17.0173 16.4105C17.1932 16.2426 17.373 16.0673 17.5452 15.8883C18.3426 15.0603 18.3426 14.0085 17.5377 13.2066L15.2876 10.965C14.9057 10.5696 14.4489 10.3607 13.9697 10.3607C13.4905 10.3607 13.03 10.5696 12.6369 10.9612L11.2965 12.2965C11.173 12.2256 11.0457 12.1622 10.9259 12.1025C10.7761 12.0279 10.6376 11.9571 10.5141 11.8788C9.29354 11.1067 8.18533 10.0996 7.1258 8.8054C6.59042 8.13031 6.231 7.56338 5.98016 6.98526C6.33209 6.66823 6.66155 6.33628 6.97979 6.01179C7.0921 5.89616 7.20817 5.78054 7.32423 5.66492C7.72857 5.2621 7.94572 4.79587 7.94572 4.32219C7.94572 3.8485 7.73232 3.38228 7.32423 2.97946L6.20854 1.86798C6.0775 1.73744 5.95395 1.61063 5.82665 1.48008C5.57955 1.22646 5.32122 0.965372 5.06664 0.730395C4.68101 0.353685 4.22799 0.156006 3.74877 0.156006C3.27329 0.156006 2.81653 0.353685 2.41593 0.734124L1.0157 2.12907C0.506521 2.63632 0.218238 3.25174 0.158335 3.96413C0.0872005 4.85555 0.251934 5.80292 0.678742 6.94797C1.33393 8.71962 2.32233 10.3645 3.78995 12.1212ZM1.07186 4.04245C1.11678 3.54639 1.30772 3.13238 1.66714 2.77432L3.05989 1.38684C3.27703 1.17797 3.51665 1.06981 3.74877 1.06981C3.97715 1.06981 4.20927 1.17797 4.42268 1.3943C4.67352 1.62555 4.90939 1.86798 5.16398 2.12534C5.29127 2.25588 5.42231 2.38642 5.55335 2.5207L6.66904 3.63218C6.90116 3.86342 7.02097 4.0984 7.02097 4.32965C7.02097 4.5609 6.90116 4.79587 6.66904 5.02712C6.55298 5.14274 6.43692 5.2621 6.32085 5.37772C5.97267 5.72832 5.64695 6.06027 5.28753 6.37731C5.28004 6.38477 5.2763 6.3885 5.26881 6.39596C4.95806 6.70553 5.00673 7.00018 5.08161 7.22397C5.08535 7.23516 5.0891 7.24262 5.09284 7.25381C5.38113 7.94382 5.78173 8.60027 6.40696 9.38352C7.53014 10.7635 8.71323 11.834 10.0161 12.6583C10.1771 12.7627 10.3493 12.8448 10.5103 12.9268C10.6601 13.0014 10.7986 13.0723 10.9221 13.1506C10.9371 13.1581 10.9484 13.1655 10.9633 13.173C11.0869 13.2364 11.2067 13.2662 11.3265 13.2662C11.626 13.2662 11.8207 13.076 11.8843 13.0126L13.2846 11.6177C13.5017 11.4013 13.7376 11.2857 13.9697 11.2857C14.2543 11.2857 14.4864 11.461 14.6324 11.6177L16.89 13.863C17.3393 14.3106 17.3355 14.7955 16.8788 15.2691C16.7215 15.437 16.5568 15.5974 16.3808 15.7652C16.1187 16.0188 15.8454 16.2799 15.5983 16.5746C15.1678 17.0371 14.6549 17.2534 13.9922 17.2534C13.9285 17.2534 13.8611 17.2497 13.7975 17.2459C12.5695 17.1676 11.4276 16.6902 10.5702 16.2836C8.24149 15.161 6.1973 13.5684 4.5013 11.5468C3.10481 9.87213 2.16508 8.31307 1.54359 6.64212C1.15797 5.61643 1.01195 4.79214 1.07186 4.04245Z" fill="#354999"/></svg>`}
            />
            <Text
              style={[
                {
                  color: Colors.orange,
                  fontFamily: "MuseoSans_500",
                  fontSize: 16,
                  lineHeight: 22,
                  width: 300,
                },
              ]}
            >
              {restaurant.field_htel}
            </Text>
          </Pressable>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_500",
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
    fontFamily: "MuseoSans_500",
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
