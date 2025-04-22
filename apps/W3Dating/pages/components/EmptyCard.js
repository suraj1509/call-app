import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { FONTS, IMAGES } from "../../../../app/constants/theme";
import Button from "../../../../app/components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";

const EmptyCard = () => {
  const { colors } = useTheme();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.cardBg,
          marginHorizontal: 15,
          borderRadius: 20,
          marginTop: 10,
          marginBottom: 12,
          justifyContent: "center",
          paddingHorizontal: 30,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 5,
              borderColor: colors.cardBg,
              marginBottom: 20,
              shadowColor: "rgba(0,0,0,.4)",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: 8,
            }}
          >
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
              }}
              source={IMAGES.userPic}
            />
          </View>
        </View>
        <Text
          style={{
            ...FONTS.font,
            textAlign: "center",
            color: colors.text,
            marginBottom: 25,
          }}
        >
          You've run out of people. Go global to see people around the world.
        </Text>
        <View style={{ gap: 10 }}>
          <Button
            onPress={() => {
              const isSwiping = true;
              const isRefreshButton = true;
              if (currentUser) {
                dispatch(
                  Actions?.fetchFeedUsers(
                    currentUser?.preferences?.genderPreference,
                    currentUser?.preferences?.ageRange?.max,
                    isSwiping,
                    isRefreshButton,
                  ),
                );
              }
            }}
            btnRounded
            title="Refresh"
            // loader={fetchFeedLoader}
          />
          <Button onPress={() => navigation.navigate("Filter")} btnRounded title="Update Search" />
          {/* <Button onPress={() => navigation.navigate("Filter")} btnRounded title="Reset" /> */}
        </View>
      </View>
    </>
  );
};

export default EmptyCard;
