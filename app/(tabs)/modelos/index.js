import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const ModelosScreen = ({}) => {
  return (
    <View>
      <View
        style={{
          height: Dimensions.get("screen").height - 250,
          width: Dimensions.get("screen").width,
        }}
      >
        <WebView
          scalesPageToFit
          javaScriptEnabled
          style={{
            height: Dimensions.get("screen").height - 250,
            width: Dimensions.get("screen").width,
          }}
          originWhitelist={["*"]}
          source={{
            html: `<iframe allowfullscreen="allowfullscreen" height="100%" frameBorder="0" src="https://visitbogota.co/vacacional/model3d.html" width="100%"></iframe>`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModelosScreen;
