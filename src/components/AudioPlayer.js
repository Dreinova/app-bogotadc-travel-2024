import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const waveImage = require("../../assets/images/waves_sound.png");

const AudioPlayer = ({ image, audios }) => {
  const [soundObjects, setSoundObjects] = useState([]);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(0);
  const [lastKnownPositions, setLastKnownPositions] = useState({});

  const loadAudios = async () => {
    const loadedSoundObjects = await Promise.all(
      audios.map(async (item) => {
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync({ uri: item.audio });
          const status = await soundObject.getStatusAsync();
          const duration = status.durationMillis || 0;
          return { soundObject, duration };
        } catch (error) {
          console.error(`Error loading audio ${item.audio}`, error);
          return null;
        }
      })
    );

    setSoundObjects(
      loadedSoundObjects.filter((soundObject) => soundObject !== null)
    );
  };

  const playAudio = async (index) => {
    if (soundObjects[index] && soundObjects[index].soundObject) {
      try {
        await stopAudio();
        const lastKnownPosition = lastKnownPositions[index] || 0;
        await soundObjects[index].soundObject.setPositionAsync(
          lastKnownPosition
        );
        await soundObjects[index].soundObject.playAsync();
        setIsPlaying(true);
        setCurrentlyPlayingIndex(index);
        const status = await soundObjects[index].soundObject.getStatusAsync();
        setDuration(status.durationMillis || 0);
      } catch (error) {
        console.error("Error playing audio", error);
      }
    } else {
      console.error(`Audio at index ${index} is not loaded.`);
    }
  };

  const pauseAudio = async () => {
    if (currentlyPlayingIndex !== null && soundObjects[currentlyPlayingIndex]) {
      try {
        await soundObjects[currentlyPlayingIndex].soundObject.pauseAsync();
        // No detenemos la reproducción aquí para evitar reiniciar al reanudar
        setIsPlaying(false);
      } catch (error) {
        console.error("Error pausing audio", error);
      }
    }
  };

  const stopAudio = async () => {
    if (soundObjects[currentlyPlayingIndex] && isPlaying) {
      try {
        await soundObjects[currentlyPlayingIndex].soundObject.stopAsync();
        setIsPlaying(false);
        setCurrentlyPlayingIndex(null);
        const position = await soundObjects[
          currentlyPlayingIndex
        ].soundObject.getStatusAsync();
        setLastKnownPositions((prevPositions) => ({
          ...prevPositions,
          [currentlyPlayingIndex]: position.positionMillis || 0,
        }));
      } catch (error) {
        console.error("Error stopping audio", error);
      }
    }
  };

  useEffect(() => {
    loadAudios();
  }, []);

  useEffect(() => {
    const updatePosition = async () => {
      while (isPlaying) {
        if (
          soundObjects[currentlyPlayingIndex] &&
          soundObjects[currentlyPlayingIndex].soundObject
        ) {
          const status = await soundObjects[
            currentlyPlayingIndex
          ].soundObject.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    updatePosition();
  }, [isPlaying, soundObjects, currentlyPlayingIndex]);

  const handleAudioPress = async (index) => {
    // Si se está reproduciendo un audio y se presiona otro audio
    if (isPlaying && currentlyPlayingIndex !== null) {
      await stopAudio(); // Detener el audio actual
    }

    // Iniciar la reproducción del audio seleccionado
    await playAudio(index);
  };

  const handleSliderChange = async (value) => {
    if (soundObjects[currentlyPlayingIndex] && isPlaying) {
      try {
        // Calcula la nueva posición del control deslizante
        const newPosition = (value * duration) / 1000; // Calcula en segundos

        await soundObjects[currentlyPlayingIndex].soundObject.setPositionAsync(
          newPosition
        );
        setPosition(newPosition);
      } catch (error) {
        console.error("Error setting audio position", error);
      }
    }
  };

  const formattedTime = (timeInMilliseconds) => {
    const seconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    return `${minutes}:${formattedSeconds < 10 ? "0" : ""}${formattedSeconds}`;
  };

  // Agrega un efecto de limpieza para detener y liberar los objetos de audio al desmontar el componente
  useEffect(() => {
    return () => {
      // Detener y liberar todos los objetos de audio
      soundObjects.forEach(async (soundObject, index) => {
        try {
          await soundObject.soundObject.stopAsync();
          await soundObject.soundObject.unloadAsync();
        } catch (error) {
          console.error(
            `Error stopping/unloading audio at index ${index}`,
            error
          );
        }
      });
    };
  }, [soundObjects]);

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: image }}
        style={{
          width: 220,
          height: 220,
          marginBottom: 30,
          borderRadius: 25,
          overflow: "hidden",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity onPress={() => playAudio(currentlyPlayingIndex - 1)}>
          <FontAwesome name="fast-backward" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isPlaying ? stopAudio() : playAudio(currentlyPlayingIndex)
          }
        >
          <FontAwesome
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => playAudio(currentlyPlayingIndex + 1)}>
          <FontAwesome name="fast-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <Slider
        style={{ marginTop: 10 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleSliderChange}
        thumbTintColor="#e1582f"
        disabled={!isPlaying}
        trackImage={waveImage}
        minimumTrackTintColor="#e1582f"
        maximumTrackTintColor="#e1582f"
        onSlidingComplete={async () => {
          setPosition(0);
        }}
      />
      {/* Muestra el tiempo transcurrido y el tiempo total */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ color: "#FFF", fontFamily: "MuseoSans_700", fontSize: 18 }}
        >
          {formattedTime(position)}
        </Text>
        <Text
          style={{ color: "#FFF", fontFamily: "MuseoSans_700", fontSize: 18 }}
        >
          {formattedTime(duration)}
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
            }}
            onPress={() => {
              handleAudioPress(index);
              setIsPlaying(true); // Automatically play when changing audio
            }}
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
            <Text
              style={{
                color: "#FFF",
                fontFamily: "MuseoSans_700",
                fontSize: 18,
              }}
            >
              {item.field_totaltime}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default AudioPlayer;
