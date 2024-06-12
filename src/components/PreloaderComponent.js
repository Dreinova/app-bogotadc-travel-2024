import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";

const PreloaderComponent = ({ planBogota }) => {
  return planBogota ? (
    <PreloaderComponent />
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#35498e" />
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
