import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Header } from "../../src/components";

function TabBarIcon(props) {
  return <FontAwesome size={40} style={{ marginBottom: -3 }} {...props} />;
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 27,
        paddingVertical: 14,
        backgroundColor: "#FFF",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const { tabBarIcon, tabBarActiveTintColor, tabBarInactiveTintColor } =
          options || {};

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
              >
                {tabBarIcon &&
                  tabBarIcon(
                    isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor
                  )}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E50728",
        tabBarInactiveTintColor: "#666",
        header: () => <Header />,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name="descubre"
        options={{
          title: "",
          tabBarIcon: (color) => <TabBarIcon name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: (color) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: (color) => <TabBarIcon name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}
