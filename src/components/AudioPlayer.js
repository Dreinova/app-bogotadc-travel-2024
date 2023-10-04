import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { formattedTime } from "../api/imperdibles";
import { useFocusEffect } from "expo-router";

const AudioPlayer = ({ image, audios }) => {
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
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audios[0].audio },
      {
        shouldPlay: isPlaying,
        positionMillis: initialPosition, // Set the initial position here
      },
      onPlaybackStatusUpdate
    );
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

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioUri },
      {
        shouldPlay: isPlaying,
        positionMillis: 0, // Comienza desde el principio
      },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
  };

  React.useEffect(() => {
    playCurrentSong(); // Play the song from the beginning

    // Limpiar al desmontar
    return async () => {
      console.log(sound);
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    };
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ padding: 20, width: "100%" }}>
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
        thumbTintColor="#e1582f"
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSliderSlidingComplete}
        minimumTrackTintColor="#e1582f"
        maximumTrackTintColor="#e1582f"
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
          style={{ color: "#FFF", fontFamily: "MuseoSans_700", fontSize: 18 }}
        >
          {position ? formattedTime(position) : "0:00"}
        </Text>
        <Text
          style={{ color: "#FFF", fontFamily: "MuseoSans_700", fontSize: 18 }}
        >
          {duration ? formattedTime(duration) : "0:00"}
        </Text>
      </View>
      <FlatList
        data={audios}
        contentContainerStyle={{ paddingVertical: 25 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={{
              padding: 20,
              backgroundColor: "rgba(0,0,0,.5)",
              marginBottom: 15,
              borderRadius: 25,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
            onPress={() => playAudio(item.audio)} // Llama a playAudio con la URL del audio
          >
            <Text
              style={{
                color: "#FFF",
                fontFamily: "MuseoSans_700",
                fontSize: 18,
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default AudioPlayer;
