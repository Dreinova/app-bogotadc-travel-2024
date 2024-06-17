import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import { windowHeight, windowWidth } from "../../../src/constants/ScreenWidth";
import { Colors } from "../../../src/constants";
import { ComoLlegar, PreloaderComponent } from "../../../src/components";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  selectActualLanguage,
  selectWordsLang,
} from "../../../src/store/selectors";
import IconSvg from "../../../src/components/IconSvg";
import RenderHTML from "react-native-render-html";
import WebView from "react-native-webview";

const SingleRutas = () => {
  const { id } = useLocalSearchParams();
  const [events, setEvents] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);

  React.useEffect(() => {
    const getSingleEvents = async () => {
      const data = await fetchBogotaDrplV2(`/rt/${id}`, actualLanguage);
      setEvents(data[0]);
    };
    getSingleEvents();
  }, []);

  if (!events) {
    return <PreloaderComponent />;
  }
  const source = {
    html: events.body,
  };

  const tagsStyles = {
    p: {
      textAlign: "left",
      color: "#777", fontFamily: "MuseoSans_500", fontSize: 16, lineHeight: 20,margin:0, marginBottom:10
    },
    a: {
      color: "#6474AD",
    },
    ul: { paddingLeft: 25, margin: 0 },
    li: {
      color: "#777", fontFamily: "MuseoSans_500", fontSize: 16, lineHeight: 20,
    },
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
            events.field_thumbnail ? events.field_thumbnail : "/img/noimg.png"
          }`,
        }}
      ></ImageBackground>
      <View
        style={{
          alignSelf: "center",
          marginTop: -60,
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 10,
          padding: 10,
          justifyContent: "flex-end",
          width: windowWidth - 40,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:'center'
            }}
          >
            <Text
              style={{
                color: Colors.orange,
                fontFamily: "MuseoSans_500",
                fontSize: 22,
                width: "50%",
              }}
            >
              {events.title}
            </Text>
            <View
              style={{
                backgroundColor: Colors.orange,
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSvg
                width="18"
                height="18"
                icon={`<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2.75515C17.6381 4.22633 16.7258 5.36097 15.85 6.51163C15.8233 6.5522 15.788 6.58572 15.747 6.60958C15.706 6.63343 15.6603 6.64697 15.6135 6.64914C15.5667 6.65131 15.52 6.64206 15.4772 6.6221C15.4343 6.60214 15.3964 6.57201 15.3664 6.53407C14.5842 5.61234 13.9281 4.5799 13.4171 3.4667C13.2192 3.04446 13.1506 2.56784 13.2209 2.10274C13.2912 1.63764 13.4969 1.20705 13.8094 0.870496C14.0986 0.498682 14.4879 0.22798 14.9261 0.0940868C15.3642 -0.0398068 15.8305 -0.0306043 16.2636 0.120481C16.7013 0.241388 17.0957 0.495052 17.3979 0.850017C17.7 1.20498 17.8967 1.64563 17.9635 2.11732C17.9635 2.15898 17.9878 2.19744 18 2.23591V2.75515ZM15.5976 5.84816C15.7739 5.60777 15.9442 5.3802 16.1085 5.14943C16.5639 4.53019 16.9506 3.85807 17.261 3.14618C17.3603 2.90837 17.4052 2.64927 17.392 2.38982C17.3788 2.13036 17.3079 1.87781 17.185 1.65256C16.9676 1.22343 16.6024 0.898491 16.1645 0.744655C15.7266 0.590818 15.2494 0.619797 14.8312 0.825623C14.4152 1.02749 14.0915 1.39414 13.9304 1.84599C13.7693 2.29784 13.7837 2.79844 13.9706 3.23913C14.4185 4.1703 14.9642 5.04547 15.5976 5.84816Z" fill="white"/>
<path d="M8.43597 18.9904C8.28391 18.9037 8.18052 18.7817 8.23222 18.5891C8.28391 18.3965 8.42988 18.3484 8.60322 18.3548C8.77656 18.3612 8.87388 18.3548 9.00768 18.3548C9.14149 18.3548 9.33004 18.3548 9.40302 18.5506C9.47601 18.7464 9.37869 18.8716 9.24489 18.9904H8.43597Z" fill="white"/>
<path d="M6.57175 18.9903C6.51433 18.9327 6.46238 18.8693 6.41665 18.801C6.39853 18.753 6.39164 18.7011 6.39657 18.6497C6.40149 18.5983 6.41809 18.549 6.44496 18.5058C6.47182 18.4627 6.50816 18.427 6.55088 18.4018C6.5936 18.3766 6.64144 18.3627 6.69035 18.3612C6.86369 18.3612 7.04007 18.3612 7.21341 18.3612C7.38675 18.3612 7.53272 18.4029 7.58442 18.5923C7.63611 18.7817 7.53272 18.9133 7.38371 18.9968L6.57175 18.9903Z" fill="white"/>
<path d="M12.0913 18.9904C12.0244 18.8845 11.918 18.785 11.8967 18.6694C11.8754 18.5539 12.0153 18.3645 12.2008 18.3484C12.3863 18.3324 12.5292 18.3484 12.6904 18.3484C12.8516 18.3484 13.0219 18.3484 13.0888 18.5699C13.1557 18.7914 13.0432 18.8909 12.9093 18.984L12.0913 18.9904Z" fill="white"/>
<path d="M13.9221 18.9904C13.7366 18.8364 13.6849 18.7144 13.7457 18.5571C13.7667 18.4952 13.8063 18.4423 13.8585 18.4064C13.9106 18.3705 13.9725 18.3535 14.0346 18.3581H14.5789C14.6543 18.3463 14.7312 18.3648 14.7943 18.41C14.8574 18.4552 14.9021 18.5237 14.9195 18.602C14.956 18.7625 14.883 18.8877 14.7036 18.9712C14.6878 18.9796 14.6725 18.9893 14.658 19.0001L13.9221 18.9904Z" fill="white"/>
<path d="M10.2635 18.9904C10.1358 18.9037 10.0263 18.801 10.0598 18.6213C10.069 18.5446 10.1056 18.4746 10.1622 18.4257C10.2187 18.3767 10.2909 18.3525 10.3639 18.358H10.9721C11.0384 18.3492 11.1055 18.3657 11.1613 18.4046C11.2171 18.4434 11.2579 18.5021 11.2762 18.5699C11.2973 18.6344 11.2984 18.7044 11.2793 18.7697C11.2601 18.8349 11.2218 18.892 11.1698 18.9326C11.1471 18.9501 11.1258 18.9694 11.1059 18.9904H10.2635Z" fill="white"/>
<path d="M4.74414 18.9903C4.68733 18.9401 4.6363 18.883 4.59208 18.8202C4.57057 18.7728 4.56042 18.7205 4.56253 18.668C4.56463 18.6155 4.57892 18.5643 4.60415 18.519C4.62937 18.4737 4.66476 18.4356 4.7072 18.4081C4.74963 18.3806 4.79782 18.3645 4.84753 18.3612C5.01783 18.3612 5.18813 18.3612 5.35539 18.3612C5.52265 18.3612 5.68686 18.3901 5.74769 18.5891C5.80851 18.7881 5.69295 18.9101 5.55306 18.9968L4.74414 18.9903Z" fill="white"/>
<path d="M3.19921 18.9904C2.9985 18.8267 2.94984 18.6694 3.04412 18.5089C3.15569 18.4034 3.30026 18.345 3.4501 18.345C3.59994 18.345 3.7445 18.4034 3.85608 18.5089C3.95035 18.6758 3.89561 18.8299 3.68882 18.9872L3.19921 18.9904Z" fill="white"/>
<path d="M3.2965 8.23914C4.16192 8.23732 4.99331 8.59426 5.6112 9.2329C6.22909 9.87155 6.58392 10.7407 6.59909 11.6527C6.58186 12.1971 6.44884 12.7306 6.20983 13.2136C5.66919 14.4064 5.01505 15.5383 4.25748 16.5919C4.03244 16.9124 3.79524 17.2329 3.55803 17.5534C3.53174 17.5982 3.49541 17.6354 3.45224 17.6618C3.40907 17.6882 3.36039 17.7031 3.31049 17.705C3.2606 17.7069 3.21103 17.6958 3.16616 17.6727C3.12129 17.6496 3.08251 17.6153 3.05322 17.5727C1.99998 16.2206 1.09984 14.7437 0.37101 13.1719C0.151079 12.7189 0.0246382 12.2218 1.40542e-06 11.7136C-0.000398609 11.2572 0.0845949 10.8052 0.250118 10.3835C0.415641 9.96174 0.658444 9.57855 0.964633 9.25584C1.27082 8.93312 1.63438 8.67722 2.03451 8.50276C2.43464 8.3283 2.86349 8.23872 3.2965 8.23914ZM3.2965 16.8932C3.55804 16.5149 3.80436 16.1624 4.0446 15.8066C4.67303 14.9008 5.21976 13.935 5.67765 12.9219C5.94168 12.4021 6.03979 11.8064 5.95743 11.2232C5.89753 10.8553 5.76926 10.5036 5.57999 10.1881C5.39072 9.87264 5.14419 9.5997 4.85454 9.38497C4.5649 9.17023 4.23785 9.01792 3.89219 8.9368C3.54653 8.85567 3.18907 8.84732 2.84035 8.91223C1.17689 9.19429 0.167259 11.095 0.793717 12.627C1.42017 14.1591 2.34465 15.5245 3.29955 16.9028L3.2965 16.8932Z" fill="white"/>
<path d="M11.7112 9.18787C11.8176 9.18787 11.924 9.18787 12.0153 9.18787C12.0885 9.19477 12.1569 9.22947 12.2078 9.28554C12.2587 9.34161 12.2886 9.41525 12.292 9.4928C12.2953 9.53237 12.291 9.57224 12.2794 9.61002C12.2678 9.6478 12.2491 9.68272 12.2244 9.71269C12.1997 9.74266 12.1695 9.76706 12.1357 9.78443C12.1018 9.8018 12.065 9.81179 12.0274 9.81379C11.8006 9.82985 11.573 9.82985 11.3462 9.81379C11.2843 9.79347 11.2301 9.75276 11.1916 9.69761C11.1531 9.64245 11.1323 9.57575 11.1323 9.50725C11.1323 9.43875 11.1531 9.37205 11.1916 9.31689C11.2301 9.26174 11.2843 9.22102 11.3462 9.20071C11.4627 9.19268 11.5795 9.19268 11.696 9.20071L11.7112 9.18787Z" fill="white"/>
<path d="M15.3604 9.81378C15.257 9.81378 15.1506 9.81378 15.0563 9.81378C14.9794 9.80808 14.9074 9.77176 14.8549 9.71217C14.8024 9.65258 14.7733 9.57417 14.7735 9.49279C14.7719 9.41415 14.7997 9.33801 14.8509 9.28091C14.9022 9.22381 14.9727 9.19037 15.0472 9.18785C15.264 9.17501 15.4812 9.17501 15.698 9.18785C15.7369 9.1877 15.7754 9.1961 15.811 9.21252C15.8466 9.22894 15.8786 9.25301 15.9049 9.28322C15.9313 9.31342 15.9513 9.34908 15.9639 9.38793C15.9764 9.42678 15.9811 9.46795 15.9778 9.50884C15.9778 9.59397 15.9457 9.67561 15.8887 9.73581C15.8317 9.79601 15.7543 9.82983 15.6737 9.82983C15.5703 9.82983 15.4638 9.82983 15.3696 9.82983L15.3604 9.81378Z" fill="white"/>
<path d="M13.5418 9.19109C13.6522 9.18467 13.7629 9.18467 13.8733 9.19109C13.9106 9.19351 13.9471 9.2038 13.9806 9.22135C14.0141 9.23891 14.0439 9.26337 14.0683 9.29329C14.0927 9.32322 14.1111 9.358 14.1225 9.39558C14.134 9.43315 14.1381 9.47277 14.1348 9.51208C14.1373 9.54954 14.1326 9.58715 14.121 9.62264C14.1094 9.65814 14.0911 9.6908 14.0672 9.71867C14.0434 9.74654 14.0144 9.76904 13.9822 9.78484C13.9499 9.80063 13.9149 9.8094 13.8794 9.8106C13.6515 9.82665 13.423 9.82665 13.1951 9.8106C13.1575 9.80908 13.1206 9.79939 13.0867 9.78213C13.0528 9.76487 13.0226 9.74041 12.9981 9.71029C12.9735 9.68016 12.9551 9.64502 12.944 9.60704C12.9329 9.56907 12.9294 9.5291 12.9336 9.48961C12.9328 9.41153 12.961 9.33621 13.0121 9.2798C13.0633 9.22339 13.1334 9.1904 13.2073 9.18788C13.3168 9.18788 13.4293 9.18788 13.5418 9.18788V9.19109Z" fill="white"/>
<path d="M16.4461 16.297C16.4477 16.3716 16.4246 16.4444 16.3807 16.5029C16.3369 16.5614 16.275 16.6019 16.2059 16.6176C16.1401 16.6369 16.0699 16.6299 16.0087 16.598C15.9475 16.566 15.8997 16.5114 15.8744 16.4445C15.7832 16.2458 15.695 16.0438 15.6159 15.8419C15.585 15.777 15.5781 15.7023 15.5967 15.6323C15.6152 15.5624 15.6579 15.5022 15.7163 15.4637C15.7417 15.4394 15.7715 15.4207 15.8038 15.4087C15.8362 15.3967 15.8705 15.3916 15.9047 15.3936C15.939 15.3957 15.9725 15.405 16.0033 15.4209C16.0341 15.4367 16.0616 15.4589 16.0842 15.4861C16.2697 15.7187 16.3945 15.9982 16.4461 16.297Z" fill="white"/>
<path d="M15.9778 17.2426C16.2424 17.2426 16.4096 17.4541 16.3184 17.6432C16.1997 17.883 16.057 18.1086 15.8926 18.3163C15.8669 18.344 15.8361 18.366 15.8022 18.3811C15.7682 18.3961 15.7318 18.4038 15.695 18.4038C15.6582 18.4038 15.6217 18.3961 15.5878 18.3811C15.5538 18.366 15.5231 18.344 15.4973 18.3163C15.4431 18.2636 15.409 18.192 15.4011 18.1148C15.3933 18.0376 15.4123 17.96 15.4547 17.8964C15.5642 17.7233 15.6706 17.5438 15.7923 17.3804C15.8463 17.3238 15.909 17.2772 15.9778 17.2426Z" fill="white"/>
<path d="M9.35722 12.5054C9.19605 12.8259 9.07136 13.0951 8.90715 13.3484C8.86761 13.406 8.68819 13.4028 8.60304 13.3676C8.57315 13.3572 8.54559 13.3406 8.52203 13.3186C8.49848 13.2966 8.47942 13.2698 8.46604 13.2398C8.45266 13.2098 8.44523 13.1772 8.44421 13.1441C8.44319 13.1109 8.4486 13.0779 8.46011 13.0471C8.56286 12.7967 8.68279 12.5546 8.81895 12.3227C8.85219 12.2732 8.90156 12.2383 8.95766 12.2247C9.01375 12.2111 9.07263 12.2197 9.12306 12.249C9.21088 12.3239 9.28953 12.41 9.35722 12.5054Z" fill="white"/>
<path d="M17.9423 11.1431C17.8837 11.4645 17.7121 11.7507 17.4618 11.9444C17.4074 11.9839 17.3405 11.9996 17.2753 11.9883C17.2101 11.9769 17.1516 11.9394 17.1121 11.8835C17.0644 11.8331 17.0351 11.7665 17.0295 11.6955C17.024 11.6245 17.0425 11.5537 17.0817 11.4957L17.3858 10.9796C17.4144 10.9184 17.4618 10.8692 17.5204 10.8401C17.579 10.811 17.6452 10.8037 17.7082 10.8194C17.7767 10.8364 17.8376 10.878 17.8803 10.937C17.923 10.9961 17.9449 11.0689 17.9423 11.1431Z" fill="white"/>
<path d="M17.7203 9.94131C17.6534 10.0246 17.6017 10.1464 17.5165 10.1817C17.4148 10.2101 17.3068 10.1988 17.2124 10.1496C17.0482 10.0631 16.9083 9.9349 16.7471 9.82912C16.6841 9.79013 16.6365 9.72849 16.613 9.65549C16.5895 9.5825 16.5918 9.50305 16.6194 9.43168C16.6461 9.35916 16.6983 9.30032 16.7652 9.26746C16.8321 9.23461 16.9084 9.23028 16.9783 9.2554C17.2306 9.33613 17.4548 9.4933 17.623 9.70733C17.6649 9.78057 17.6976 9.85921 17.7203 9.94131Z" fill="white"/>
<path d="M14.4877 14.5503C14.658 14.5856 14.8313 14.6081 14.9986 14.6562C15.0751 14.6788 15.1402 14.732 15.18 14.8046C15.2198 14.8772 15.2311 14.9634 15.2114 15.0446C15.1888 15.1249 15.1373 15.1927 15.068 15.2334C14.9987 15.2742 14.917 15.2848 14.8404 15.2629C14.6914 15.2372 14.5363 15.2115 14.3934 15.1987C14.144 15.1794 14.0133 15.0639 14.0254 14.8584C14.0376 14.653 14.1714 14.5599 14.4147 14.5631H14.4846L14.4877 14.5503Z" fill="white"/>
<path d="M10.1692 8.54706C10.2167 8.35815 10.2735 8.17199 10.3395 7.98936C10.3533 7.95158 10.3744 7.91725 10.4015 7.88854C10.4285 7.85984 10.461 7.83738 10.4967 7.82261C10.5325 7.80784 10.5708 7.80107 10.6091 7.80274C10.6475 7.80441 10.6851 7.81447 10.7196 7.8323C10.7928 7.86493 10.851 7.92647 10.8817 8.00375C10.9124 8.08103 10.9132 8.1679 10.8838 8.24577C10.8488 8.39798 10.8305 8.55391 10.8291 8.71052C10.8363 8.79116 10.8143 8.87168 10.7675 8.9359C10.7206 9.00012 10.6525 9.04327 10.5767 9.05668C10.5013 9.06846 10.4244 9.04997 10.3613 9.00485C10.2983 8.95974 10.2536 8.8913 10.2361 8.81309C10.2178 8.72975 10.2118 8.64321 10.1996 8.55667L10.1692 8.54706Z" fill="white"/>
<path d="M11.93 7.91316C11.8266 7.91316 11.7201 7.91316 11.6259 7.91316C11.5529 7.90883 11.4839 7.87693 11.4314 7.8233C11.3789 7.76966 11.3465 7.69787 11.34 7.62106C11.3322 7.54549 11.3526 7.4697 11.3969 7.40976C11.4412 7.34983 11.5059 7.31048 11.5772 7.30007C11.8211 7.27921 12.0662 7.27921 12.3101 7.30007C12.346 7.30403 12.3808 7.31555 12.4125 7.33393C12.4441 7.35231 12.4719 7.37719 12.4943 7.40711C12.5167 7.43702 12.5332 7.47136 12.5428 7.5081C12.5525 7.54485 12.555 7.58325 12.5503 7.62106C12.5455 7.69799 12.5145 7.77049 12.4631 7.8253C12.4117 7.88012 12.3434 7.91358 12.2706 7.91958C12.1641 7.91958 12.0425 7.91316 11.93 7.91316Z" fill="white"/>
<path d="M10.3822 12.3492C10.2849 12.3492 10.1845 12.3492 10.0781 12.3492C10.0006 12.3443 9.9279 12.3083 9.87476 12.2486C9.82162 12.189 9.7921 12.1101 9.79224 12.0282C9.79254 11.9873 9.80081 11.9469 9.81652 11.9095C9.83223 11.8722 9.85505 11.8386 9.88356 11.8109C9.91208 11.7832 9.94568 11.762 9.98228 11.7486C10.0189 11.7352 10.0577 11.7298 10.0963 11.7329C10.3031 11.7329 10.5069 11.7329 10.7046 11.7329C10.7802 11.7325 10.8533 11.7619 10.9095 11.8153C10.9657 11.8687 11.0011 11.9423 11.0087 12.0218C11.0092 12.1007 10.9822 12.177 10.9329 12.2362C10.8835 12.2954 10.8152 12.3333 10.741 12.3428C10.6236 12.3508 10.5057 12.3508 10.3883 12.3428L10.3822 12.3492Z" fill="white"/>
<path d="M12.216 12.3491C12.1247 12.3491 12.0305 12.3491 11.9362 12.3491C11.8555 12.3491 11.7782 12.3153 11.7212 12.2551C11.6641 12.1949 11.6321 12.1133 11.6321 12.0281C11.632 11.987 11.6399 11.9462 11.6555 11.9084C11.671 11.8707 11.6937 11.8367 11.7223 11.8087C11.7509 11.7806 11.7846 11.7591 11.8214 11.7455C11.8582 11.7319 11.8973 11.7265 11.9362 11.7296C12.1389 11.7296 12.3366 11.7296 12.5292 11.7296C12.5677 11.727 12.6064 11.7327 12.6428 11.7462C12.6792 11.7598 12.7126 11.7811 12.741 11.8087C12.7695 11.8363 12.7923 11.8697 12.8081 11.9068C12.824 11.944 12.8326 11.9842 12.8333 12.0249C12.8335 12.1063 12.8044 12.1847 12.7519 12.2443C12.6994 12.3039 12.6274 12.3402 12.5505 12.3459C12.438 12.3459 12.3285 12.3459 12.216 12.3459V12.3491Z" fill="white"/>
<path d="M14.0648 12.3492C13.9584 12.3492 13.8519 12.3492 13.7607 12.3492C13.6833 12.3442 13.6105 12.3083 13.5574 12.2486C13.5042 12.1889 13.4747 12.1101 13.4749 12.0282C13.4817 11.9481 13.5167 11.8737 13.573 11.8197C13.6294 11.7656 13.7028 11.7358 13.779 11.7361C13.9766 11.7361 14.1773 11.7361 14.3872 11.7361C14.4258 11.733 14.4646 11.7383 14.5012 11.7517C14.5378 11.7652 14.5714 11.7864 14.6 11.8141C14.6285 11.8417 14.6513 11.8753 14.667 11.9127C14.6827 11.9501 14.691 11.9905 14.6913 12.0314C14.6915 12.1128 14.6624 12.1912 14.6099 12.2508C14.5574 12.3104 14.4854 12.3467 14.4085 12.3524C14.2747 12.3556 14.1713 12.3492 14.0648 12.3492Z" fill="white"/>
<path d="M13.7668 7.91329C13.6564 7.91971 13.5457 7.91971 13.4353 7.91329C13.3666 7.91173 13.3011 7.88268 13.252 7.83202C13.2028 7.78135 13.1738 7.71287 13.1707 7.64045C13.1647 7.60414 13.1655 7.56692 13.1733 7.53098C13.1811 7.49504 13.1956 7.46111 13.216 7.43119C13.2364 7.40127 13.2623 7.37597 13.2921 7.35678C13.322 7.33759 13.3551 7.3249 13.3897 7.31946C13.6457 7.297 13.903 7.297 14.1591 7.31946C14.1934 7.32482 14.2264 7.33753 14.256 7.35681C14.2855 7.37608 14.3111 7.40152 14.331 7.43157C14.3509 7.46162 14.3648 7.49564 14.3719 7.53155C14.3789 7.56747 14.3789 7.60452 14.3719 7.64045C14.3704 7.71601 14.3415 7.78809 14.2912 7.84183C14.2408 7.89557 14.1729 7.92689 14.1013 7.92934C13.9918 7.92934 13.8793 7.92934 13.7668 7.92934V7.91329Z" fill="white"/>
<path d="M15.9079 11.7201C16.0052 11.7201 16.1055 11.7201 16.212 11.7201C16.2891 11.7199 16.3634 11.7507 16.4198 11.8061C16.4763 11.8615 16.5107 11.9375 16.5161 12.0187C16.5199 12.0573 16.5163 12.0963 16.5056 12.1335C16.4949 12.1707 16.4773 12.2052 16.4538 12.2351C16.4302 12.265 16.4013 12.2896 16.3687 12.3076C16.3361 12.3255 16.3004 12.3364 16.2637 12.3396C16.0308 12.3557 15.7971 12.3557 15.5642 12.3396C15.4906 12.3315 15.4227 12.2935 15.3751 12.2336C15.3274 12.1737 15.3037 12.0967 15.3088 12.0187C15.3142 11.9375 15.3486 11.8615 15.4051 11.8061C15.4615 11.7507 15.5358 11.7199 15.6129 11.7201C15.698 11.7137 15.8136 11.7201 15.9079 11.7201Z" fill="white"/>
<path d="M10.966 14.5695C11.0775 14.5631 11.1891 14.5631 11.3005 14.5695C11.3713 14.5752 11.4374 14.6087 11.4859 14.6633C11.5343 14.718 11.5615 14.79 11.5621 14.8648C11.5663 14.9028 11.5633 14.9413 11.5534 14.9781C11.5434 15.0148 11.5266 15.0491 11.504 15.079C11.4813 15.1088 11.4533 15.1337 11.4215 15.152C11.3897 15.1703 11.3548 15.1818 11.3188 15.1858C11.0799 15.2035 10.84 15.2035 10.6011 15.1858C10.5651 15.1818 10.5302 15.1703 10.4984 15.152C10.4666 15.1337 10.4386 15.1088 10.4159 15.079C10.3933 15.0491 10.3765 15.0148 10.3665 14.9781C10.3566 14.9413 10.3536 14.9028 10.3578 14.8648C10.3619 14.7878 10.3921 14.715 10.443 14.6596C10.4938 14.6042 10.5618 14.5699 10.6346 14.5631H10.966V14.5695Z" fill="white"/>
<path d="M8.97712 13.9733C9.07444 14.0406 9.1535 14.0854 9.22345 14.1399C9.34509 14.2393 9.45457 14.3483 9.57621 14.4412C9.61274 14.4608 9.64515 14.4879 9.67149 14.521C9.69783 14.554 9.71755 14.5924 9.72948 14.6337C9.74141 14.675 9.7453 14.7184 9.74091 14.7614C9.73652 14.8043 9.72394 14.8459 9.70393 14.8835C9.68485 14.9225 9.65794 14.9566 9.62508 14.9834C9.59221 15.0103 9.55418 15.0292 9.51365 15.039C9.47311 15.0488 9.43105 15.0491 9.39038 15.0399C9.34971 15.0308 9.31142 15.0124 9.27819 14.9861C9.08689 14.85 8.91135 14.6908 8.75512 14.5117C8.73042 14.4629 8.71576 14.4091 8.71209 14.3539C8.70843 14.2986 8.71583 14.2432 8.73384 14.1912C8.76121 14.1079 8.87981 14.047 8.97712 13.9733Z" fill="white"/>
<path d="M12.7876 14.5696C12.9041 14.5632 13.0209 14.5632 13.1374 14.5696C13.2059 14.5737 13.2705 14.6052 13.3179 14.6576C13.3654 14.7101 13.3921 14.7796 13.3928 14.8521C13.3984 14.8891 13.3969 14.9268 13.3883 14.9632C13.3798 14.9995 13.3645 15.0336 13.3432 15.0636C13.3219 15.0935 13.2951 15.1187 13.2645 15.1375C13.2338 15.1563 13.1999 15.1684 13.1647 15.1731C12.9147 15.194 12.6636 15.194 12.4136 15.1731C12.378 15.1699 12.3435 15.1587 12.3124 15.1402C12.2813 15.1218 12.2543 15.0964 12.2333 15.066C12.2122 15.0356 12.1976 15.0007 12.1904 14.9638C12.1832 14.9269 12.1836 14.8888 12.1916 14.8521C12.189 14.7793 12.2132 14.7082 12.2591 14.6538C12.305 14.5994 12.3691 14.5657 12.4379 14.56C12.5544 14.5536 12.6711 14.5536 12.7876 14.56V14.5696Z" fill="white"/>
<path d="M15.4334 7.91332C15.3757 7.91813 15.3178 7.91813 15.2601 7.91332C15.192 7.90929 15.1279 7.8783 15.0805 7.82652C15.0331 7.77475 15.006 7.70601 15.0046 7.63406C14.998 7.59864 14.9981 7.56218 15.005 7.5268C15.0118 7.49143 15.0253 7.45784 15.0445 7.42798C15.0637 7.39812 15.0884 7.37259 15.117 7.35287C15.1457 7.33314 15.1778 7.31962 15.2114 7.31307C15.3664 7.28578 15.5247 7.28578 15.6797 7.31307C15.7136 7.31924 15.7461 7.3325 15.775 7.35206C15.804 7.37162 15.829 7.3971 15.8486 7.427C15.8681 7.4569 15.8818 7.49061 15.8889 7.52617C15.8959 7.56173 15.8961 7.59841 15.8896 7.63406C15.8865 7.70649 15.8575 7.77497 15.8083 7.82563C15.7592 7.87629 15.6937 7.90535 15.625 7.9069C15.5642 7.9069 15.4973 7.9069 15.4334 7.9069V7.91332Z" fill="white"/>
<path d="M16.4948 2.22303C16.4577 2.44589 16.3473 2.64784 16.183 2.79336C16.0186 2.93889 15.8108 3.01867 15.5961 3.01867C15.3815 3.01867 15.1737 2.93889 15.0093 2.79336C14.845 2.64784 14.7346 2.44589 14.6975 2.22303C14.6975 1.96801 14.7936 1.72344 14.9647 1.54311C15.1358 1.36278 15.3679 1.26147 15.6098 1.26147C15.847 1.26898 16.0721 1.37359 16.2373 1.55311C16.4025 1.73263 16.4949 1.97293 16.4948 2.22303ZM15.8866 2.22303C15.8866 2.13802 15.8545 2.0565 15.7975 1.99639C15.7405 1.93628 15.6631 1.90251 15.5825 1.90251C15.5018 1.90251 15.4245 1.93628 15.3674 1.99639C15.3104 2.0565 15.2784 2.13802 15.2784 2.22303C15.2784 2.30804 15.3104 2.38956 15.3674 2.44967C15.4245 2.50978 15.5018 2.54355 15.5825 2.54355C15.6238 2.54741 15.6655 2.54172 15.7046 2.52686C15.7437 2.512 15.7793 2.48834 15.8088 2.45753C15.8383 2.42671 15.8611 2.38948 15.8756 2.34843C15.8901 2.30738 15.8959 2.26349 15.8926 2.21983L15.8866 2.22303Z" fill="white"/>
<path d="M3.30558 12.6592C3.06834 12.6605 2.83609 12.5875 2.63826 12.4495C2.44042 12.3115 2.2859 12.1147 2.19428 11.8841C2.10266 11.6535 2.07806 11.3993 2.1236 11.154C2.16915 10.9086 2.28278 10.683 2.4501 10.5057C2.61743 10.3284 2.83091 10.2075 3.0635 10.1583C3.29608 10.109 3.53731 10.1337 3.7566 10.2291C3.97589 10.3244 4.16338 10.4863 4.29531 10.6941C4.42724 10.9019 4.49767 11.1463 4.49767 11.3964C4.49847 11.5619 4.46823 11.726 4.40868 11.8792C4.34913 12.0323 4.26145 12.1716 4.15067 12.289C4.0399 12.4063 3.90821 12.4994 3.76318 12.563C3.61815 12.6265 3.46264 12.6592 3.30558 12.6592ZM3.30558 12.0182C3.46688 12.0182 3.62159 11.9506 3.73565 11.8304C3.84971 11.7102 3.91379 11.5472 3.91379 11.3771C3.91379 11.2071 3.84971 11.0441 3.73565 10.9239C3.62159 10.8036 3.46688 10.7361 3.30558 10.7361C3.14799 10.7419 2.9987 10.812 2.8892 10.9316C2.77971 11.0512 2.71856 11.2109 2.71865 11.3771C2.71455 11.4602 2.7264 11.5433 2.75348 11.6215C2.78057 11.6996 2.82233 11.7712 2.87627 11.832C2.93022 11.8927 2.99523 11.9414 3.06743 11.975C3.13963 12.0087 3.21752 12.0266 3.29645 12.0278L3.30558 12.0182Z" fill="white"/>
</svg>`}
              />
            </View>
          </View>
          <Text
            style={{
              color: "#777", fontFamily: "MuseoSans_500", fontSize: 16, lineHeight: 20,
              marginBottom: 10,
              width: 250,
            }}
          >
            {events.field_subtitle}
          </Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <RenderHTML
          contentWidth={windowWidth}
          source={{ html: events.field_intro_blog }}
          tagsStyles={tagsStyles}
        />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ backgroundColor: "#F1F1F1", marginBottom: 30 }}
        contentContainerStyle={{ paddingVertical: 10 }}
        data={[
          {
            field: "body",
            label: wordsLanguage[actualLanguage][75],
          },
          {
            field: "field_como_llegar",
            label: wordsLanguage[actualLanguage][73],
          },
          {
            field: "field_quieres_ir",
            label: wordsLanguage[actualLanguage][74],
          },
          {
            field: "field_conocer",
            label: wordsLanguage[actualLanguage][76],
          },
        ]}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              setActiveIndex(index);
            }}
          >
            <View
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
                  fontFamily: "MuseoSans_500",
                  textAlignVertical: "center",
                }}
              >
                {item.label}
              </Text>
            </View>
          </Pressable>
        )}
      />
      <View style={{ paddingHorizontal: 20 }}>
        {activeIndex == 0 && (
          <RenderHTML
            contentWidth={windowWidth}
            source={{ html: events.body }}
            tagsStyles={tagsStyles}
          />
        )}
        {activeIndex == 1 && (
          <RenderHTML
            contentWidth={windowWidth}
            source={{ html: events.field_como_llegar }}
            tagsStyles={tagsStyles}
          />
        )}
        {activeIndex == 2 && (
          <RenderHTML
            contentWidth={windowWidth}
            source={{ html: events.field_quieres_ir }}
            tagsStyles={tagsStyles}
          />
        )}
        {activeIndex == 3 && (
          <RenderHTML
            contentWidth={windowWidth}
            source={{ html: events.field_conocer }}
            tagsStyles={tagsStyles}
          />
        )}
        {activeIndex == 4 && (
          <RenderHTML
            contentWidth={windowWidth}
            source={source}
            tagsStyles={tagsStyles}
          />
        )}
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {events.field_iframe_google_maps ? (
          <WebView
            style={{ width: 620, height: windowWidth }}
            originWhitelist={["*"]}
            source={{ html: events.field_iframe_google_maps }}
          />
        ) : (
          <Image
            source={{ uri: events.field_imagen_ruta }}
            style={{ width: "100%", height: 320 }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontFamily: "MuseoSans_500",
    fontSize: 18,
    textAlign: "center",
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

export default SingleRutas;
