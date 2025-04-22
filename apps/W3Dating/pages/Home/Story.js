import { FlatList, View } from "react-native";
import React from "react";
import StoryItem from "../components/StoryItem";
import { IMAGES } from "../../../../app/constants/theme";
import AddStory from "../components/AddStory";
import { useSelector } from "react-redux";

const Story = ({ theme, backgroundColor, users }) => {
  // const { colors } = theme;
  const currentUserDisplayPic = useSelector((state) => state?.user?.currentUser?.profilePhoto?.url);
  return (
    <View style={{ marginHorizontal: -5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <AddStory currentUserDisplayPic={currentUserDisplayPic} />
      <FlatList
        contentContainerStyle={{ paddingLeft: 10, paddingTop: 5 }}
        horizontal
        data={users}
        renderItem={({ item }) => {
          if (item?.stories?.length === 0) return null;
          return (
            <StoryItem
              title={item?.name}
              image={item?.profilePhoto}
              storyItem={item?.stories}
              id={item?._id}
              backgroundColor={backgroundColor}
              age={item?.age}
              address={item?.currentAddress}
            />
          );
        }}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Story;
