import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { formattedTime } from "../api/imperdibles";
import { useFocusEffect } from "expo-router";
import { Colors } from "../constants";
import IconSvg from "./IconSvg";

const AudioPlayer = ({ image, audios }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);
  const [isSeeking, setIsSeeking] = useState(false);

  const onPlaybackStatusUpdate = (status) => {
    let { durationMillis, isPlaying, positionMillis } = status;
    if (!isSeeking) {
      // Update position only if not currently seeking
      setPosition(positionMillis);
    }

    setIsPlaying(isPlaying);
    setDuration(durationMillis);
  };

  const playCurrentSong = async (initialPosition = 0) => {
    // await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (sound) {
      await sound.unloadAsync();
    }

    // const { sound: newSound } = await Audio.Sound.createAsync(
    //   { uri: audios[0].audio },
    //   {
    //     shouldPlay: isPlaying,
    //     positionMillis: initialPosition, // Set the initial position here
    //   },
    //   onPlaybackStatusUpdate
    // );
    setSound(newSound);
  };

  const onPlayPausePress = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const handleSliderValueChange = (value) => {
    setPosition(value);
    setIsSeeking(true);
  };

  const handleSliderSlidingComplete = async (value) => {
    const newPositionInMilliseconds = value;
    if (newPositionInMilliseconds < duration) {
      await sound.pauseAsync(); // Pause the audio
      await sound.setPositionAsync(newPositionInMilliseconds); // Set the new position in milliseconds
      await sound.playAsync(); // Resume playback
    }
    setIsSeeking(false);
  };

  const playAudio = async (audioUri) => {
    if (sound) {
      await sound.unloadAsync();
    }

    // const { sound: newSound } = await Audio.Sound.createAsync(
    //   { uri: audioUri },
    //   {
    //     shouldPlay: isPlaying,
    //     positionMillis: 0, // Comienza desde el principio
    //   },
    //   onPlaybackStatusUpdate
    // );
    setSound(newSound);
  };

  useEffect(() => {
    playCurrentSong();

    // Limpiar al desmontar
    return () => {
      if (sound) {
        sound.stopAsync().then(() => sound.unloadAsync());
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (sound) {
          sound.pauseAsync();
        }
      };
    }, [sound])
  );

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={[
        audios.length == 1 && {
          justifyContent: "center",
          flex: 1,
        },
        { padding: 20, width: "100%" },
      ]}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 180,
          height: 180,
          marginBottom: 30,
          borderRadius: 25,
          overflow: "hidden",
          alignSelf: "center",
        }}
      />
      <Slider
        style={{ marginVertical: 10 }}
        minimumValue={0}
        step={1}
        maximumValue={duration}
        value={position}
        thumbTintColor="#F8C823"
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSliderSlidingComplete}
        minimumTrackTintColor="#F8C823"
        maximumTrackTintColor="#F8C823"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome name="fast-backward" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPausePress}>
          <FontAwesome
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome name="fast-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ color: "#FFF", fontFamily: "MuseoSans_500", fontSize: 18 }}
        >
          {position ? formattedTime(position) : "0:00"}
        </Text>
        <Text
          style={{ color: "#FFF", fontFamily: "MuseoSans_500", fontSize: 18 }}
        >
          {duration ? formattedTime(duration) : "0:00"}
        </Text>
      </View>
      {audios.length > 1 && (
        <FlatList
          data={audios}
          style={{ height: 250 }}
          contentContainerStyle={{ paddingVertical: 25 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={{
                padding: 20,
                backgroundColor:
                  activeIndex == index ? "#F8C823" : "rgba(255,255,255,.5)",
                marginBottom: 15,
                borderRadius: 25,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                width: "100%",
              }}
              onPress={() => {
                playAudio(item.audio);
                setActiveIndex(index);
              }} // Llama a playAudio con la URL del audio
            >
              <>
                {activeIndex == index ? (
                  <IconSvg
                    width="30"
                    height="30"
                    icon={`<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.49055 0C9.80246 0.0452148 10.1172 0.0762999 10.4263 0.13847C11.5254 0.336743 12.5679 0.771421 13.4812 1.41223C14.3945 2.05304 15.1566 2.88457 15.7146 3.84891C16.4387 5.0587 16.8126 6.44466 16.7949 7.85324C16.7949 8.29974 16.7949 8.74341 16.7949 9.18707C16.7949 9.28881 16.8176 9.33402 16.931 9.36228C17.2364 9.43299 17.5085 9.60536 17.7023 9.85094C17.8961 10.0965 18.0001 10.4006 17.9972 10.7131C17.9972 11.202 17.9972 11.6937 17.9972 12.1854C18 12.4975 17.8959 12.8012 17.702 13.0463C17.5082 13.2914 17.2362 13.4632 16.931 13.5333C16.8838 13.5401 16.8403 13.5624 16.8074 13.5967C16.7745 13.6311 16.7541 13.6754 16.7495 13.7227C16.665 14.1046 16.4452 14.4435 16.1305 14.6772C15.8158 14.9109 15.4271 15.0238 15.0357 14.9954C14.6443 14.9669 14.2762 14.7989 13.9989 14.5221C13.7216 14.2453 13.5535 13.8783 13.5255 13.4881C13.4972 13.1123 13.5113 12.7308 13.5113 12.3578C13.5113 11.461 13.5113 10.5671 13.5113 9.67596C13.5113 8.69537 14.0161 8.09062 14.983 7.90976C15.0103 7.90169 15.0369 7.89129 15.0624 7.87867C14.9915 5.69989 14.1068 3.92238 12.2609 2.74115C10.1484 1.3734 7.93951 1.35644 5.80718 2.69028C3.91588 3.87151 3.00284 5.65185 2.93195 7.88433C3.05388 7.90976 3.14745 7.92389 3.23535 7.9465C3.58088 8.0275 3.88947 8.22095 4.11234 8.49629C4.33521 8.77163 4.45964 9.11314 4.46597 9.46684C4.48015 10.7865 4.48299 12.1063 4.46597 13.4231C4.45849 13.8186 4.30471 14.1975 4.03416 14.4869C3.76361 14.7764 3.39533 14.9561 3 14.9915C2.59657 15.0309 2.19275 14.9206 1.86579 14.6818C1.53883 14.443 1.31168 14.0925 1.22779 13.6972C1.2214 13.6668 1.20811 13.6383 1.18894 13.6138C1.16977 13.5893 1.14523 13.5695 1.1172 13.556C0.843638 13.4977 0.593478 13.3601 0.398212 13.1605C0.202945 12.9608 0.0713007 12.7081 0.0198488 12.4341C0.0198488 12.4341 0.0198488 12.4143 0 12.4058V10.5124L0.0482042 10.3457C0.111 10.1071 0.237496 9.88995 0.414242 9.71728C0.590988 9.54462 0.811379 9.42291 1.05198 9.36511C1.17958 9.3312 1.20227 9.28033 1.20227 9.16729C1.20227 8.73493 1.20227 8.30256 1.20227 7.8702C1.1939 6.78994 1.41031 5.71967 1.83783 4.72696C2.26536 3.73424 2.89472 2.84062 3.6862 2.10249C3.78261 2.00923 3.9017 1.94706 4.01229 2.04314C4.09026 2.11767 4.13774 2.21835 4.14556 2.32573C4.14556 2.38508 4.07467 2.46703 4.01796 2.52072C2.88621 3.58185 2.12505 4.9762 1.84594 6.49962C1.74293 7.08429 1.70489 7.6785 1.73251 8.27148L2.40737 7.91258C2.39517 6.15915 3.07782 4.47177 4.30698 3.21715C5.53613 1.96253 7.21246 1.24206 8.97164 1.21232C12.7599 1.19819 15.7004 4.48474 15.5955 7.91258L16.2675 8.2743C16.3497 7.04229 16.1114 5.80999 15.5756 4.69668C14.2486 2.08836 12.1134 0.675396 9.17013 0.534099C7.83306 0.480071 6.50933 0.817003 5.362 1.50339C5.16352 1.61643 5.02457 1.59382 4.93667 1.44122C4.84877 1.28862 4.90265 1.15863 5.10113 1.04842C5.8648 0.601079 6.70192 0.29205 7.57372 0.135644C7.87146 0.0819518 8.17202 0.0452148 8.47259 0H9.49055ZM16.2703 11.4535C16.2703 10.8233 16.2703 10.1931 16.2703 9.56292C16.2741 9.26553 16.1602 8.97861 15.9532 8.76437C15.7462 8.55013 15.4628 8.42584 15.1645 8.41842C15.0176 8.41655 14.8718 8.44385 14.7356 8.49875C14.5994 8.55365 14.4756 8.63504 14.3713 8.73817C14.267 8.8413 14.1844 8.9641 14.1283 9.0994C14.0722 9.2347 14.0437 9.37978 14.0444 9.52619C14.0331 10.811 14.0331 12.095 14.0444 13.3779C14.0387 13.5994 14.1033 13.8171 14.2291 13.9998C14.3549 14.1825 14.5354 14.3209 14.7448 14.3953C14.9153 14.4635 15.1001 14.4886 15.2828 14.4682C15.4654 14.4478 15.6401 14.3826 15.7912 14.2784C15.9423 14.1743 16.0652 14.0344 16.1488 13.8714C16.2324 13.7083 16.2742 13.5271 16.2703 13.344C16.276 12.7167 16.2703 12.0836 16.2703 11.4535ZM3.94423 11.4535C3.94423 10.8007 3.94423 10.1479 3.94423 9.4951C3.94085 9.20205 3.8208 8.92235 3.61048 8.71752C3.40017 8.51269 3.11682 8.39951 2.82278 8.40288C2.52873 8.40625 2.24808 8.5259 2.04255 8.7355C1.83702 8.9451 1.72346 9.22749 1.72684 9.52053C1.72684 10.8035 1.72684 12.0874 1.72684 13.3723C1.73177 13.5524 1.77732 13.7292 1.86011 13.8894C1.97344 14.104 2.15477 14.2752 2.37587 14.3764C2.59697 14.4776 2.84544 14.503 3.08259 14.4489C3.31974 14.3947 3.53227 14.2639 3.68708 14.0769C3.8419 13.8898 3.93031 13.657 3.93856 13.4147C3.95274 12.7647 3.94423 12.1119 3.94423 11.4563V11.4535ZM1.18809 12.9992V9.89073C1.00812 9.92471 0.845143 10.0188 0.726063 10.1575C0.606982 10.2962 0.538911 10.4713 0.533081 10.6537C0.533081 11.185 0.533081 11.7135 0.533081 12.2447C0.541298 12.4256 0.610399 12.5983 0.729236 12.7352C0.848072 12.8721 1.00972 12.9651 1.18809 12.9992ZM16.8034 12.9992C16.9822 12.9638 17.1441 12.8702 17.2637 12.7331C17.3833 12.5961 17.4538 12.4233 17.4641 12.2419C17.4773 11.705 17.4773 11.168 17.4641 10.6311C17.4545 10.4513 17.3839 10.2802 17.2638 10.1456C17.1438 10.0111 16.9814 9.92123 16.8034 9.89073V12.9992Z" fill="#FFF"/></svg>`}
                  />
                ) : (
                  <IconSvg
                    width="30"
                    height="30"
                    icon={`<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.49055 0C9.80246 0.0452148 10.1172 0.0762999 10.4263 0.13847C11.5254 0.336743 12.5679 0.771421 13.4812 1.41223C14.3945 2.05304 15.1566 2.88457 15.7146 3.84891C16.4387 5.0587 16.8126 6.44466 16.7949 7.85324C16.7949 8.29974 16.7949 8.74341 16.7949 9.18707C16.7949 9.28881 16.8176 9.33402 16.931 9.36228C17.2364 9.43299 17.5085 9.60536 17.7023 9.85094C17.8961 10.0965 18.0001 10.4006 17.9972 10.7131C17.9972 11.202 17.9972 11.6937 17.9972 12.1854C18 12.4975 17.8959 12.8012 17.702 13.0463C17.5082 13.2914 17.2362 13.4632 16.931 13.5333C16.8838 13.5401 16.8403 13.5624 16.8074 13.5967C16.7745 13.6311 16.7541 13.6754 16.7495 13.7227C16.665 14.1046 16.4452 14.4435 16.1305 14.6772C15.8158 14.9109 15.4271 15.0238 15.0357 14.9954C14.6443 14.9669 14.2762 14.7989 13.9989 14.5221C13.7216 14.2453 13.5535 13.8783 13.5255 13.4881C13.4972 13.1123 13.5113 12.7308 13.5113 12.3578C13.5113 11.461 13.5113 10.5671 13.5113 9.67596C13.5113 8.69537 14.0161 8.09062 14.983 7.90976C15.0103 7.90169 15.0369 7.89129 15.0624 7.87867C14.9915 5.69989 14.1068 3.92238 12.2609 2.74115C10.1484 1.3734 7.93951 1.35644 5.80718 2.69028C3.91588 3.87151 3.00284 5.65185 2.93195 7.88433C3.05388 7.90976 3.14745 7.92389 3.23535 7.9465C3.58088 8.0275 3.88947 8.22095 4.11234 8.49629C4.33521 8.77163 4.45964 9.11314 4.46597 9.46684C4.48015 10.7865 4.48299 12.1063 4.46597 13.4231C4.45849 13.8186 4.30471 14.1975 4.03416 14.4869C3.76361 14.7764 3.39533 14.9561 3 14.9915C2.59657 15.0309 2.19275 14.9206 1.86579 14.6818C1.53883 14.443 1.31168 14.0925 1.22779 13.6972C1.2214 13.6668 1.20811 13.6383 1.18894 13.6138C1.16977 13.5893 1.14523 13.5695 1.1172 13.556C0.843638 13.4977 0.593478 13.3601 0.398212 13.1605C0.202945 12.9608 0.0713007 12.7081 0.0198488 12.4341C0.0198488 12.4341 0.0198488 12.4143 0 12.4058V10.5124L0.0482042 10.3457C0.111 10.1071 0.237496 9.88995 0.414242 9.71728C0.590988 9.54462 0.811379 9.42291 1.05198 9.36511C1.17958 9.3312 1.20227 9.28033 1.20227 9.16729C1.20227 8.73493 1.20227 8.30256 1.20227 7.8702C1.1939 6.78994 1.41031 5.71967 1.83783 4.72696C2.26536 3.73424 2.89472 2.84062 3.6862 2.10249C3.78261 2.00923 3.9017 1.94706 4.01229 2.04314C4.09026 2.11767 4.13774 2.21835 4.14556 2.32573C4.14556 2.38508 4.07467 2.46703 4.01796 2.52072C2.88621 3.58185 2.12505 4.9762 1.84594 6.49962C1.74293 7.08429 1.70489 7.6785 1.73251 8.27148L2.40737 7.91258C2.39517 6.15915 3.07782 4.47177 4.30698 3.21715C5.53613 1.96253 7.21246 1.24206 8.97164 1.21232C12.7599 1.19819 15.7004 4.48474 15.5955 7.91258L16.2675 8.2743C16.3497 7.04229 16.1114 5.80999 15.5756 4.69668C14.2486 2.08836 12.1134 0.675396 9.17013 0.534099C7.83306 0.480071 6.50933 0.817003 5.362 1.50339C5.16352 1.61643 5.02457 1.59382 4.93667 1.44122C4.84877 1.28862 4.90265 1.15863 5.10113 1.04842C5.8648 0.601079 6.70192 0.29205 7.57372 0.135644C7.87146 0.0819518 8.17202 0.0452148 8.47259 0H9.49055ZM16.2703 11.4535C16.2703 10.8233 16.2703 10.1931 16.2703 9.56292C16.2741 9.26553 16.1602 8.97861 15.9532 8.76437C15.7462 8.55013 15.4628 8.42584 15.1645 8.41842C15.0176 8.41655 14.8718 8.44385 14.7356 8.49875C14.5994 8.55365 14.4756 8.63504 14.3713 8.73817C14.267 8.8413 14.1844 8.9641 14.1283 9.0994C14.0722 9.2347 14.0437 9.37978 14.0444 9.52619C14.0331 10.811 14.0331 12.095 14.0444 13.3779C14.0387 13.5994 14.1033 13.8171 14.2291 13.9998C14.3549 14.1825 14.5354 14.3209 14.7448 14.3953C14.9153 14.4635 15.1001 14.4886 15.2828 14.4682C15.4654 14.4478 15.6401 14.3826 15.7912 14.2784C15.9423 14.1743 16.0652 14.0344 16.1488 13.8714C16.2324 13.7083 16.2742 13.5271 16.2703 13.344C16.276 12.7167 16.2703 12.0836 16.2703 11.4535ZM3.94423 11.4535C3.94423 10.8007 3.94423 10.1479 3.94423 9.4951C3.94085 9.20205 3.8208 8.92235 3.61048 8.71752C3.40017 8.51269 3.11682 8.39951 2.82278 8.40288C2.52873 8.40625 2.24808 8.5259 2.04255 8.7355C1.83702 8.9451 1.72346 9.22749 1.72684 9.52053C1.72684 10.8035 1.72684 12.0874 1.72684 13.3723C1.73177 13.5524 1.77732 13.7292 1.86011 13.8894C1.97344 14.104 2.15477 14.2752 2.37587 14.3764C2.59697 14.4776 2.84544 14.503 3.08259 14.4489C3.31974 14.3947 3.53227 14.2639 3.68708 14.0769C3.8419 13.8898 3.93031 13.657 3.93856 13.4147C3.95274 12.7647 3.94423 12.1119 3.94423 11.4563V11.4535ZM1.18809 12.9992V9.89073C1.00812 9.92471 0.845143 10.0188 0.726063 10.1575C0.606982 10.2962 0.538911 10.4713 0.533081 10.6537C0.533081 11.185 0.533081 11.7135 0.533081 12.2447C0.541298 12.4256 0.610399 12.5983 0.729236 12.7352C0.848072 12.8721 1.00972 12.9651 1.18809 12.9992ZM16.8034 12.9992C16.9822 12.9638 17.1441 12.8702 17.2637 12.7331C17.3833 12.5961 17.4538 12.4233 17.4641 12.2419C17.4773 11.705 17.4773 11.168 17.4641 10.6311C17.4545 10.4513 17.3839 10.2802 17.2638 10.1456C17.1438 10.0111 16.9814 9.92123 16.8034 9.89073V12.9992Z" fill="#354999"/></svg>`}
                  />
                )}
                <Text
                  style={{
                    color: activeIndex == index ? "#FFF" : Colors.orange,
                    fontFamily: "MuseoSans_500",
                    fontSize: 22,
                  }}
                >
                  {item.title ? item.title : `Audio ${index + 1}`}
                </Text>
              </>
              <Text
                style={{
                  color: activeIndex == index ? "#FFF" : Colors.black,
                  fontFamily: "MuseoSans_500",
                  fontSize: 18,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                {item.subtitle ? item.subtitle : `Audio ${index + 1}`}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default AudioPlayer;
