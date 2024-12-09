import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../../src/store/actions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";
import {
  selectActualLanguage,
  selectActualLocation,
  selectBlogsData,
  selectWordsLang,
} from "../../../src/store/selectors";
import { PreloaderComponent } from "../../../src/components";
import { router } from "expo-router";
import CardBlog from "../../../src/components/CardBlog";
import IconSvg from "../../../src/components/IconSvg";

const List = () => {
  const dispatch = useDispatch();
  const actualLocation = useSelector(selectActualLocation);
  const wordsLanguage = useSelector(selectWordsLang);
  const actualLanguage = useSelector(selectActualLanguage);
  const blogData = useSelector(selectBlogsData);
  const [queriesCompleted, setQueriesCompleted] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllBlogs());
      setQueriesCompleted(true);
    }
    fetchData();
  }, [actualLanguage]);
  if (!queriesCompleted) {
    return <PreloaderComponent />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          gap: 8,
        }}
      >
        <IconSvg
          width="30"
          height="30"
          icon={`<svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.57154C0.015226 3.53564 0.0277139 3.49855 0.0373483 3.46062C0.11633 3.08735 0.313089 2.75223 0.596346 2.50855C0.879603 2.26486 1.2331 2.1266 1.60064 2.11573H1.86741C5.81388 2.11573 9.75946 2.11573 13.7041 2.11573C14.2804 2.11573 14.8219 2.17673 15.2568 2.67032C15.5075 2.39303 15.7423 2.15455 15.9797 1.90776C16.4492 1.41972 16.9134 0.923355 17.3936 0.446405C17.6241 0.223565 17.9137 0.0779531 18.2249 0.0284996C18.536 -0.0209538 18.8543 0.028039 19.1383 0.169109C19.4142 0.30806 19.6441 0.529046 19.7989 0.804031C19.9538 1.07902 20.0265 1.39561 20.008 1.71365C19.9706 2.13995 19.7801 2.53597 19.4745 2.82283C18.2713 4.07067 17.0735 5.3185 15.8677 6.56911C15.8132 6.61987 15.7702 6.68244 15.7416 6.7524C15.7131 6.82236 15.6996 6.898 15.7023 6.97396C15.7023 8.58505 15.7023 10.1961 15.7023 11.8072C15.7023 12.9164 15.0167 13.6346 13.9469 13.6346C11.7469 13.6346 9.54604 13.6346 7.34427 13.6346C7.28138 13.6287 7.21815 13.6414 7.16195 13.6714C7.10575 13.7013 7.05889 13.7472 7.02681 13.8038C6.66667 14.3584 6.29585 14.913 5.92504 15.4537C5.44218 16.1719 4.63119 16.1719 4.14566 15.4537C3.79085 14.9296 3.43071 14.4055 3.07856 13.8703C3.03606 13.7887 2.97069 13.7225 2.89112 13.6804C2.81155 13.6383 2.72155 13.6223 2.63305 13.6346C2.28892 13.654 1.94478 13.6346 1.59797 13.6346C1.24086 13.6264 0.896141 13.497 0.616325 13.2662C0.336509 13.0354 0.136939 12.7159 0.0480192 12.3563C0.0480192 12.2981 0.0160064 12.2398 0 12.1816V3.57154ZM14.8486 3.06408C14.744 2.94174 14.6147 2.84498 14.4698 2.78074C14.325 2.71649 14.1683 2.68636 14.0109 2.69251H1.68601C1.53383 2.68256 1.38137 2.70662 1.2389 2.76308C1.09642 2.81954 0.967243 2.90708 0.86006 3.0198C0.752877 3.13253 0.670179 3.26782 0.617537 3.41656C0.564896 3.56531 0.543533 3.72406 0.554889 3.88211C0.554889 6.55524 0.554889 9.22838 0.554889 11.9015C0.548089 12.0579 0.572672 12.2141 0.627075 12.3601C0.681477 12.5061 0.764509 12.6387 0.870892 12.7496C0.977275 12.8604 1.10468 12.947 1.24501 13.0039C1.38534 13.0608 1.53552 13.0867 1.68601 13.08C2.10217 13.08 2.51834 13.08 2.93451 13.08C3.02461 13.0716 3.11516 13.09 3.19551 13.1333C3.27585 13.1765 3.34264 13.2427 3.38802 13.324C3.79085 13.9396 4.20435 14.5469 4.61251 15.157C4.65076 15.241 4.71118 15.312 4.78675 15.3618C4.86231 15.4115 4.94991 15.4379 5.03935 15.4379C5.12879 15.4379 5.21639 15.4115 5.29195 15.3618C5.36752 15.312 5.42794 15.241 5.46619 15.157C5.86901 14.558 6.26651 13.9618 6.66933 13.3573C6.71892 13.2676 6.79167 13.1941 6.87935 13.1451C6.96704 13.096 7.06617 13.0735 7.16553 13.08C9.43844 13.08 11.7105 13.08 13.9816 13.08C14.1383 13.092 14.2957 13.0688 14.4431 13.0118C14.5904 12.9549 14.7242 12.8656 14.8353 12.7501C14.9465 12.6346 15.0323 12.4955 15.0871 12.3424C15.1419 12.1892 15.1643 12.0256 15.1527 11.8627C15.1527 10.4263 15.1527 8.99268 15.1527 7.55628C15.1527 7.50082 15.1527 7.44536 15.1527 7.38713L15.0967 7.35108C15.0595 7.41536 15.0176 7.47655 14.9713 7.5341C14.275 8.26339 13.5814 8.99822 12.8691 9.71365C12.6793 9.90657 12.4603 10.0658 12.2209 10.1851C11.4713 10.5372 10.7323 10.8422 9.99333 11.1778C9.8857 11.2432 9.76041 11.2703 9.63661 11.2548C9.5128 11.2392 9.39729 11.182 9.30772 11.0918C9.22016 10.9989 9.1654 10.8779 9.15232 10.7485C9.13925 10.6192 9.16863 10.489 9.23569 10.3792C9.53982 9.64987 9.85194 8.92058 10.1534 8.18575C10.2721 7.87206 10.454 7.58841 10.6869 7.35386C10.9137 7.13479 11.1325 6.90741 11.3565 6.68557L11.3379 6.65507H3.73483C3.66374 6.65926 3.59249 6.65926 3.52141 6.65507C3.44889 6.65507 3.37934 6.62513 3.32806 6.57182C3.27677 6.51852 3.24797 6.44622 3.24797 6.37084C3.24797 6.29546 3.27677 6.22316 3.32806 6.16986C3.37934 6.11656 3.44889 6.08661 3.52141 6.08661C3.59338 6.08246 3.66552 6.08246 3.73749 6.08661C6.40523 6.08661 9.08097 6.08661 11.7647 6.08661C11.8603 6.08944 11.9542 6.05921 12.0315 6.00065C12.9705 5.01348 13.9016 4.04571 14.8486 3.06408ZM17.0068 1.6776L11.0364 7.8724L12.405 9.30325L18.3753 3.09736L17.0068 1.6776ZM18.8262 2.68419C18.9649 2.53167 19.1116 2.40689 19.229 2.23774C19.335 2.10039 19.4051 1.93693 19.4325 1.76318C19.4599 1.58943 19.4438 1.41127 19.3855 1.24592C19.3273 1.08058 19.2291 0.933639 19.1002 0.819323C18.9714 0.705008 18.8164 0.627182 18.6501 0.593372C18.1379 0.482454 17.7724 0.729247 17.4203 1.22006L18.8262 2.68419ZM11.8741 9.70533L10.6709 8.44086L10.2681 9.4114L10.9671 10.1351L11.8741 9.70533ZM9.988 10.0409L9.70522 10.7202L10.3401 10.4208L9.988 10.0409Z" fill="#1B4F9B"/><path d="M5.89034 9.70538H3.64678C3.56941 9.70538 3.47071 9.70538 3.42269 9.66656C3.37467 9.62774 3.26262 9.48077 3.2733 9.38926C3.28397 9.29776 3.39601 9.20348 3.48138 9.13692C3.52406 9.10365 3.60676 9.12306 3.67346 9.12306H8.12323C8.17926 9.12306 8.24061 9.12306 8.29664 9.12306C8.36739 9.11865 8.43693 9.14363 8.48996 9.19251C8.54299 9.2414 8.57517 9.31017 8.57942 9.38372C8.58366 9.45726 8.55963 9.52955 8.5126 9.58467C8.46557 9.63979 8.3994 9.67324 8.32865 9.67765C8.26486 9.69303 8.19925 9.69863 8.13391 9.69429L5.89034 9.70538Z" fill="#1B4F9B"/><path d="M8.33399 12.2232C8.60067 12.2232 8.81685 11.9985 8.81685 11.7213C8.81685 11.4441 8.60067 11.2194 8.33399 11.2194C8.06732 11.2194 7.85114 11.4441 7.85114 11.7213C7.85114 11.9985 8.06732 12.2232 8.33399 12.2232Z" fill="#1B4F9B"/></svg>`}
        />
        <Text
          style={{
            fontFamily: "MuseoSans_500",
            fontSize: 20,
            textAlign: "center",
            paddingVertical: 20,
            color: "#354999",
          }}
        >
          {wordsLanguage[actualLanguage][65]}
        </Text>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
        data={blogData}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <CardBlog
            isHorizontal
            onPress={() => router.push(`(tabs)/blog/${item.nid}`)}
            title={item.title}
            intro={item.field_intro_blog}
            image={`https://files.visitbogota.co${
              item.field_image ? item.field_image : "/img/noimg.png"
            }`}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

export default List;
