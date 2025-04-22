import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import CheckList from "./CheckList";

const RelationshipGoalsSheet = ({ sheetRef, lookingFor, setLookingFor }) => {
  const { colors } = useTheme();
  const genderData = [
    "Long-term partner",
    "Long-term, open to short",
    "Short-term, open to long",
    "Short-term fun",
    "New friends",
    "Stil figuring it out",
  ];

  const handleOptionSelect = async (data) => {
    if (lookingFor !== data) {
      await setLookingFor(data);
    }
    await sheetRef.current.close();
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
        }}
      >
        <Text style={{ ...FONTS.h5, color: colors.title }}>Relationship Goals</Text>
      </View>
      <View style={GlobalStyleSheet.container}>
        {genderData.map((data, index) => {
          return (
            <CheckList
              onPress={() => handleOptionSelect(index)}
              item={data}
              checked={data === genderData[lookingFor] ? true : false}
              key={index}
            />
          );
        })}
      </View>
    </>
  );
};

export default RelationshipGoalsSheet;
