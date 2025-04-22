/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import LinearGradient from "react-native-linear-gradient";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import debounce from "lodash.debounce";
import { getSearchUsers } from "../../../../services/user";

const Likes = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const feedUserLoading = useSelector((state) => state?.user?.feedUser);
  const feedUsers = useSelector((state) => state?.user?.feedUsers2);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [saveUsers, setSaveUsers] = React.useState(null);

  React.useEffect(() => {
    setFilteredUsers(feedUsers);
  }, [feedUsers]);

  const fetchFeedUsers = () => {
    const isSwiping = false;
    dispatch(
      Actions?.fetchFeed2Users(
        currentUser?.preferences?.genderPreference,
        currentUser?.preferences?.ageRange?.max,
        isSwiping,
      ),
    );
  };

  React.useEffect(() => {
    fetchFeedUsers();
  }, []);

  React.useEffect(() => {
    fetchFeedUsers();
  }, [currentUser?.preferences?.genderPreference, currentUser?.preferences?.ageRange?.max]);

  const debouncedFetchUsers = React.useCallback(
    debounce(async (query) => {
      if (query.length !== 0) {
        try {
          const res = await getSearchUsers(query.toLowerCase());
          setFilteredUsers(res);
        } catch (error) {
          console.error(error);
        }
      } else {
        setFilteredUsers(feedUsers);
      }
    }, 400),
    [],
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <View style={GlobalStyleSheet.homeHeader}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={[GlobalStyleSheet.headerBtn, { borderColor: colors.borderColor }]}
        >
          <FeatherIcon color={colors.title} size={22} name={"grid"} />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.h5,
            flex: 1,
            textAlign: "center",
            color: colors.title,
          }}
        >
          Users
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Filter")}
          style={[GlobalStyleSheet.headerBtn, { borderColor: colors.borderColor }]}
        >
          <Image
            style={{
              height: 22,
              width: 22,
              tintColor: colors.title,
            }}
            source={IMAGES.filter}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 2,
        }}
      >
        <View>
          <TextInput
            style={{
              borderRadius: 30,
              borderColor: colors.border,
              borderWidth: 1,
              paddingLeft: 45,
              height: 48,
              paddingRight: 15,
              paddingVertical: 10,
              color: colors.textLight,
            }}
            placeholder="Search..."
            placeholderTextColor={colors.textLight}
            onChangeText={(text) => debouncedFetchUsers(text)}
          />
          <FeatherIcon
            style={{
              position: "absolute",
              left: 15,
              top: 15,
            }}
            name="search"
            size={18}
            color={colors.textLight}
          />
        </View>
      </View>
      <View style={GlobalStyleSheet.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >
          <View style={GlobalStyleSheet.row}>
            {filteredUsers?.map((data, index) => {
              return (
                <View key={index} style={[GlobalStyleSheet.col50, { marginBottom: 15 }]}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: colors.borderColor,
                      borderRadius: SIZES.radius,
                      opacity: currentUser?.rejectedUsers?.includes(data?._id) ? 0.4 : 1,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={async () => navigation.navigate("ProfileDetails", { item: data })}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: undefined,
                          aspectRatio: 1 / 1.2,
                          borderRadius: SIZES.radius,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                        source={{ uri: data?.profilePhoto }}
                      />
                      <LinearGradient
                        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          bottom: 0,
                          borderRadius: SIZES.radius,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          justifyContent: "flex-end",
                          alignItems: "flex-start",
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                        }}
                      >
                        <Text style={[FONTS.h6, { color: COLORS.white, lineHeight: 18 }]}>
                          {data.name}, {data.age}
                        </Text>
                        <Text style={[FONTS.fontSm, { color: COLORS.white, opacity: 0.7 }]}>
                          {data?.about && data?.about.length > 20 ? `${data?.about.slice(0, 46)}...` : data?.about}
                        </Text>
                        <View
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 0,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => setSaveUsers((prev) => (prev === IMAGES.save ? IMAGES.unsave : IMAGES.save))}
                          >
                            <Image
                              style={{ height: 18, width: 18, top: 1, tintColor: COLORS.white }}
                              source={data?.savedUser ? IMAGES.save : IMAGES.unsave}
                            />
                          </TouchableOpacity>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        marginTop: 10,
                        paddingHorizontal: 10,
                        marginBottom: 10,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                          height: 35,
                          backgroundColor: currentUser?.rejectedUsers?.includes(data?._id)
                            ? "rgba(255,74,92,.15)"
                            : "white",
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: "rgba(255,74,92,.25)",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                        }}
                        onPress={async () => {
                          await dispatch(Actions?.updateFeedUserInfo({ type: "reject", userId: data._id }));
                        }}
                      >
                        {feedUserLoading?.[data?._id]?.reject ? (
                          <ActivityIndicator />
                        ) : (
                          <Image
                            style={{
                              height: 14,
                              width: 14,
                              tintColor: COLORS.danger,
                              resizeMode: "contain",
                            }}
                            source={IMAGES.close}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                          height: 35,
                          backgroundColor: currentUser?.likedUsers?.includes(data?._id)
                            ? "rgba(186,112,255,.15)"
                            : "white",
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: "rgba(186,112,255,.25)",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                        }}
                        onPress={async () => {
                          await dispatch(Actions?.updateFeedUserInfo({ type: "like", userId: data._id }));
                        }}
                      >
                        {feedUserLoading?.[data?._id]?.like ? (
                          <ActivityIndicator />
                        ) : (
                          <Image
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: "#BA70FF",
                              resizeMode: "contain",
                            }}
                            source={IMAGES.heart2}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Likes;
