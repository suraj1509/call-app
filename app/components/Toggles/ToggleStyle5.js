import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { COLORS, SIZES } from "../../constants/theme";

const ToggleStyle5 = (props) => {
  const theme = useTheme();

  const [active, setActive] = useState(false);

  const offset = useSharedValue(0);
  const toggleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });
  useEffect(() => {
    if (props.active) {
      setActive(true);
      offset.value = withSpring(15);
    } else {
      setActive(false);
      offset.value = withSpring(0);
    }
  }, [props.active]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.onToggle && props.onToggle(active);
          setActive(!active);
          if (active) {
            offset.value = withSpring(0);
          } else {
            offset.value = withSpring(28);
          }
        }}
        style={[
          {
            height: 22,
            width: 40,
            borderColor: active ? COLORS.primary : theme.dark ? "rgba(255,255,255,.1)" : "#141414",
            borderWidth: 1,
            //backgroundColor : active ? COLORS.primary : theme.dark ? 'rgba(255,255,255,.1)' : '#e8e9ea',
            borderRadius: 30,
          },
        ]}
      >
        <Animated.View
          style={[
            toggleStyle,
            {
              height: 14,
              width: 14,
              backgroundColor: active ? COLORS.primary : theme.dark ? "rgba(255,255,255,.1)" : "#141414",
              borderRadius: 30,
              top: 3,
              left: 3,
            },
          ]}
        />
      </TouchableOpacity>
    </>
  );
};

export default ToggleStyle5;
