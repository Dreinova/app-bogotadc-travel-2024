import { View, Text, Dimensions } from "react-native";
import React from "react";
import { fetchBogotaDrplV2 } from "../../../src/api/imperdibles";
import PreloaderComponent from "../../../src/components/PreloaderComponent";
import { ScrollView } from "react-native";
import { selectActualLanguage } from "../../../src/store/selectors";
import { useSelector } from "react-redux";

const politics = () => {
  const [politics, setPolitics] = React.useState(null);
  const actualLanguage = useSelector(selectActualLanguage);
  const getPolitics = async () => {
    const data = await fetchBogotaDrplV2("/gcontent/1", actualLanguage);

    setPolitics(data[0]);
  };
  React.useEffect(() => {
    getPolitics();
  }, []);

  if (!politics) {
    return <PreloaderComponent />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#FFF",
        minHeight: Dimensions.get("window").height,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          marginBottom: 30,
          lineHeight: 25,
          textAlign: "center",
          fontFamily: "MuseoSans_900",
        }}
      >
        {politics.title}
      </Text>
      <Text style={{ fontSize: 16, lineHeight: 25, textAlign: "justify" }}>
        {politics.body}
      </Text>
    </ScrollView>
  );
};

export default politics;
