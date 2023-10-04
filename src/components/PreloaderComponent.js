import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";

const PreloaderComponent = ({ planBogota }) => {
  return planBogota ? (
    <ImageBackground
      source={require("../../assets/images/bgpattern.png")}
      imageStyle={{ resizeMode: "repeat", opacity: 0.03 }}
      style={[styles.container, { backgroundColor: "#0f2c52" }]}
    >
      <ActivityIndicator size="large" color="#FFF" />
    </ImageBackground>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff7c47" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PreloaderComponent;
