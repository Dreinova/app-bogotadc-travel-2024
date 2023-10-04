import { Stack, router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Pressable, View } from "react-native";
const logoWhite = require("../../assets/images/logo_bogota.png");
function _layout() {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <View
            style={{
              padding: 8,
              backgroundColor: "#6dc184",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{ flex: 1, padding: 10 }}
            >
              <FontAwesome name="arrow-left" size={24} color="white" />
            </Pressable>
            <Image
              source={logoWhite}
              style={{ width: 120, resizeMode: "contain", height: 40, flex: 1 }}
            />
            <View style={{ flex: 1 }} />
          </View>
        ),
      }}
    />
  );
}

export default _layout;
