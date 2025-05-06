import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from "../../../../app/constants/theme";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";

const tags = [
  "9-10",
  "10-11",
  "11-12",
  "12-1",
  "1-2",
  "2-3",
  "3-4",
  "4-5",
  "5-6",
  "6-7",
];

const TimeSlotSheet = ({ sheetRef }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [timeSlots, setTimeSlots] = React.useState(currentUser?.timeSlots);
  const [timeSlotData, setTimeSlotData] = React.useState(tags);

  const filteredTimeSlotFunc = async () => {
    const filteredTimeSlotData = await tags.filter(
      (item) => !currentUser.timeSlots.some((itm) => itm.toLowerCase() === item.toLowerCase()),
    );
    setTimeSlotData(filteredTimeSlotData);
  };

  React.useEffect(() => {
    if (currentUser?.timeSlots) {
        filteredTimeSlotFunc();
    }
  }, []);

  const removeTimeSlot = async (index, data) => {
    const updatedTimeSlots = [...timeSlots];
    await updatedTimeSlots.splice(index, 1);
    await setTimeSlots(updatedTimeSlots);
    await setTimeSlotData([...timeSlotData, data]);
  };

  const addTimeSlot = async (data, index) => {
    setTimeSlots((previousTimeSlots) => {
      return [...previousTimeSlots, data];
    });
    const filteredData = await timeSlotData.filter((_, i) => i !== index);
    setTimeSlotData(filteredData);
  };

  const SaveTimeSlots = async () => {
    if (timeSlots?.length !== 0) {
      dispatch(
        Actions?.updateCurrentUser({
          timeSlots: timeSlots,
          // profileStatusToAdd: ["time-slot"],
        }),
      );
    } else {
      dispatch(
        Actions?.updateCurrentUser({
            timeSlots: timeSlots,
            // profileStatusToRemove: ["time-slot"],
        }),
      );
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={450}
      openDuration={100}
      closeOnDragDown={true}
      onClose={SaveTimeSlots}
      customStyles={{
        wrapper: {},
        container: {
          backgroundColor: colors.cardBg,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        draggableIcon: {
          marginTop: 5,
          marginBottom: 0,
          height: 5,
          width: 90,
          backgroundColor: colors.borderColor,
        },
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ ...FONTS.h5, color: colors.title, flex: 1 }}>Time Slots</Text>
        <TouchableOpacity
          onPress={() => sheetRef.current.close()}
          style={{
            padding: 5,
          }}
        >
          <FeatherIcon size={24} color={colors.title} name="x" />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 12,
              paddingHorizontal: 15,
            }}
          >
            {timeSlots?.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={{
                    backgroundColor: COLORS.primary,
                    marginRight: 8,
                    marginBottom: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    //borderWidth:1,
                    //borderColor:colors.borderColor,
                    borderRadius: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                  }}
                >
                  <FeatherIcon color={COLORS.white} size={14} style={{ marginRight: 6 }} name={data.icon} />
                  <Text style={{ ...FONTS.font, color: COLORS.white, top: -1 }}>{data}</Text>
                  <TouchableOpacity onPress={() => removeTimeSlot(index, data)} activeOpacity={1}>
                    <FeatherIcon style={{ marginLeft: 6 }} size={16} color={COLORS.white} name="x" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
      >
        <View>
          <TextInput
            style={{
              backgroundColor: colors.bgLight,
              borderRadius: 30,
              paddingLeft: 45,
              height: 38,
              paddingRight: 15,
              paddingVertical: 6,
            }}
            placeholder="Search..."
            placeholderTextColor={colors.textLight}
          />
          <FeatherIcon
            style={{
              position: "absolute",
              left: 15,
              top: 10,
            }}
            name="search"
            size={18}
            color={colors.textLight}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
        }}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            {timeSlotData.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() => addTimeSlot(data, index)}
                  key={index}
                  activeOpacity={1}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.03)",
                    marginRight: 8,
                    marginBottom: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: colors.borderColor,
                    borderRadius: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: colors.text, top: -1 }}>{data}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </TouchableOpacity>
    </RBSheet>
  );
};

export default TimeSlotSheet;
