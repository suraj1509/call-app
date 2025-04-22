import React, { useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import uuid from "react-native-uuid";
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, IMAGES, SIZES, FONTS } from "../../../../app/constants/theme";
import { launchImageLibrary } from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomInput from "../../../../app/components/Input/CustomInput";
import Button from "../../../../app/components/Button/Button";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Chip } from "react-native-paper";

const intrestData = [
  {
    icon: "camera",
    title: "Photography",
  },
  {
    icon: "music",
    title: "Music",
  },
  {
    icon: "book",
    title: "Study",
  },
  {
    icon: "film",
    title: "Movies",
  },
  {
    icon: "instagram",
    title: "Instagram",
  },
  {
    icon: "map-pin",
    title: "Travelling",
  },
];

const tags = [
  "Ludo",
  "Football",
  "Cricket",
  "Tea",
  "Brunch",
  "Shopping",
  "Instagram",
  "Collecting",
  "Travel",
  "Cofee",
  "Dancing",
  "Wine",
  "Manga",
  "Anime",
  "Memes",
  "Fashion",
  "Gym",
  "Drawing",
  "Boxing",
  "Walking",
  "Basketball",
  "Running",
  "Movies",
  "Web Series",
  "Cars",
  "Bike",
  "Maggi",
  "Sushi",
];

const EditProfile = () => {
  const { colors } = useTheme();
  const refRBSheet = useRef();
  const intrestSheet = useRef();

  const [sheetType, setSheetType] = useState("");
  const [imageData, setImageData] = useState([
    {
      id: uuid.v4(),
      imagePath: IMAGES.likedPic6,
    },
  ]);

  const [height, setHeight] = useState(174);

  const UploadFile = async (type) => {
    try {
      if (Platform.OS === "ios") {
        let options = {
          mediaType: type,
          maxWidth: 200,
          maxHeight: 200,
          quality: 1,
        };
        launchImageLibrary(options, (response) => {
          if (!response.didCancel) {
            setImageData([...imageData, { id: uuid.v4(), image: response.assets[0].uri }]);
          }
        });
      } else {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]).then((result) => {
          if (result["android.permission.CAMERA"] && result["android.permission.READ_EXTERNAL_STORAGE"] === "granted") {
            let options = {
              mediaType: type,
              maxWidth: 200,
              maxHeight: 200,
              quality: 1,
            };
            launchImageLibrary(options, (response) => {
              if (!response.didCancel) {
                setImageData([...imageData, { id: uuid.v4(), image: response.assets[0].uri }]);
              }
            });
          }
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const removeImageItem = (index) => {
    setImageData([...imageData.slice(0, index), ...imageData.slice(index + 1, imageData.length)]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}>
      <RBSheet
        ref={intrestSheet}
        closeOnDragDown={true}
        height={SIZES.height / 2}
        openDuration={100}
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
        }}>
        <View
          style={{
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Text style={{ ...FONTS.h5, color: colors.title, flex: 1 }}>Interests</Text>
          <TouchableOpacity
            onPress={() => sheetRef.current.close()}
            style={{
              padding: 5,
            }}>
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
              }}>
              {intrestData.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: COLORS.primary3,
                      marginRight: 8,
                      marginBottom: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      //borderWidth:1,
                      //borderColor:colors.borderColor,
                      borderRadius: 30,
                      paddingHorizontal: 12,
                      paddingVertical: 5,
                    }}>
                    <FeatherIcon color={COLORS.white} size={14} style={{ marginRight: 6 }} name={data.icon} />
                    <Text style={{ ...FONTS.font, color: COLORS.white, top: -1 }}>{data.title}</Text>
                    <TouchableOpacity>
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
          }}>
          <View>
            <TextInput
              style={{
                backgroundColor: colors.bgLight,
                borderRadius: 30,
                paddingLeft: 45,
                paddingRight: 15,
                height: 38,
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
          }}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}>
              {tags.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
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
                    }}>
                    <Text style={{ ...FONTS.font, color: colors.text, top: -1 }}>{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </TouchableOpacity>
      </RBSheet>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={250}
        openDuration={100}
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
        }}>
        {sheetType === "work" ? (
          <View style={GlobalStyleSheet.container}>
            <Text style={[FONTS.h6, { color: colors.title, marginBottom: 10 }]}>Add your work</Text>
            <View style={{ marginBottom: 18 }}>
              <CustomInput placeholder={"Enter your job title"} defaultValue={"Web Developer"} />
            </View>
            <Button onPress={() => refRBSheet.current.close()} btnRounded color={COLORS.primary3} title={"Save"} />
          </View>
        ) : sheetType === "education" ? (
          <View style={GlobalStyleSheet.container}>
            <Text style={[FONTS.h6, { color: colors.title, marginBottom: 10 }]}>Add your school name</Text>
            <View style={{ marginBottom: 18 }}>
              <CustomInput placeholder={"Enter your school name"} defaultValue={"Kota University"} />
            </View>
            <Button onPress={() => refRBSheet.current.close()} btnRounded color={COLORS.primary3} title={"Save"} />
          </View>
        ) : null}
      </RBSheet>

      <Header titleLeft leftIcon={"back"} title={"Edit Profile"} />
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}>
            <View style={GlobalStyleSheet.col66}>
              <TouchableOpacity
                onPress={() => UploadFile("photo")}
                activeOpacity={0.9}
                style={[
                  styles.imageBox,
                  { height: SIZES.width / 1.8, borderColor: colors.borderColor, backgroundColor: colors.cardBg },
                ]}>
                {imageData[0] ? (
                  <>
                    <Image
                      source={imageData[0].image ? { uri: imageData[0].image } : imageData[0].imagePath}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => removeImageItem(0)}
                      activeOpacity={0.8}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.danger,
                      }}>
                      <FeatherIcon name="x" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <FeatherIcon name="image" color={colors.borderColor} size={45} />
                )}
              </TouchableOpacity>
            </View>
            <View style={GlobalStyleSheet.col33}>
              <TouchableOpacity
                onPress={() => UploadFile("photo")}
                activeOpacity={0.9}
                style={[styles.imageBox, { borderColor: colors.borderColor, backgroundColor: colors.cardBg }]}>
                {imageData[1] ? (
                  <>
                    <Image
                      source={{ uri: imageData[1].image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.danger,
                      }}>
                      <FeatherIcon name="x" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => UploadFile("photo")}
                activeOpacity={0.9}
                style={[styles.imageBox, { borderColor: colors.borderColor, backgroundColor: colors.cardBg }]}>
                {imageData[2] ? (
                  <>
                    <Image
                      source={{ uri: imageData[2].image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.danger,
                      }}>
                      <FeatherIcon name="x" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                )}
              </TouchableOpacity>
            </View>
            <View style={GlobalStyleSheet.col33}>
              <TouchableOpacity
                onPress={() => UploadFile("photo")}
                activeOpacity={0.9}
                style={[styles.imageBox, { borderColor: colors.borderColor, backgroundColor: colors.cardBg }]}>
                {imageData[3] ? (
                  <>
                    <Image
                      source={{ uri: imageData[3].image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.danger,
                      }}>
                      <FeatherIcon name="x" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                )}
              </TouchableOpacity>
            </View>
            <View style={GlobalStyleSheet.col33}>
              <TouchableOpacity
                onPress={() => UploadFile("photo")}
                activeOpacity={0.9}
                style={[styles.imageBox, { borderColor: colors.borderColor, backgroundColor: colors.cardBg }]}>
                {imageData[4] ? (
                  <>
                    <Image
                      source={{ uri: imageData[4].image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.danger,
                      }}>
                      <FeatherIcon name="x" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                )}
              </TouchableOpacity>
            </View>
            <View style={GlobalStyleSheet.col33}>
              <TouchableOpacity
                onPress={() => UploadFile("photo")}
                activeOpacity={0.9}
                style={[styles.imageBox, { borderColor: colors.borderColor, backgroundColor: colors.cardBg }]}>
                {imageData[5] ? (
                  <>
                    <Image
                      source={{ uri: imageData[5].image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.danger,
                      }}>
                      <FeatherIcon name="x" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.background,
              marginTop: 20,
              marginHorizontal: -15,
              paddingTop: 8,
            }}>
            <TouchableOpacity
              onPress={() => {
                setSheetType("work");
                refRBSheet.current.open();
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.cardBg,
                marginBottom: 8,
                paddingHorizontal: 15,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View style={{ flex: 1 }}>
                <Text style={[FONTS.h6, { color: colors.title }]}>Work</Text>
                <Text numberOfLines={1} style={{ ...FONTS.font, color: colors.textLight }}>
                  Web Developer
                </Text>
              </View>
              <FeatherIcon color={colors.textLight} size={26} name="chevron-right" />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: colors.cardBg,
                marginBottom: 8,
                paddingHorizontal: 15,
                paddingTop: 15,
                paddingBottom: 5,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text style={[FONTS.h6, { color: colors.title }]}>Height</Text>
                <Text numberOfLines={1} style={{ ...FONTS.font, fontSize: 16, color: colors.title }}>
                  {height}cm
                </Text>
              </View>

              <MultiSlider
                trackStyle={{ height: 4, borderRadius: 2, backgroundColor: "rgba(142,165,200,.3)" }}
                selectedStyle={{
                  backgroundColor: COLORS.primary3,
                }}
                values={[height]}
                markerStyle={{
                  backgroundColor: COLORS.white,
                  top: 1,
                  height: 16,
                  width: 16,
                  borderWidth: 3,
                  borderColor: COLORS.primary3,
                }}
                onValuesChange={(val) => setHeight(val[0])}
                min={90}
                sliderLength={SIZES.width - 30}
                max={220}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSheetType("education");
                refRBSheet.current.open();
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.cardBg,
                marginBottom: 8,
                paddingHorizontal: 15,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View style={{ flex: 1 }}>
                <Text style={[FONTS.h6, { color: colors.title }]}>Education</Text>
                <Text numberOfLines={1} style={{ ...FONTS.font, color: colors.textLight }}>
                  Kota University
                </Text>
              </View>
              <FeatherIcon color={colors.textLight} size={26} name="chevron-right" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                intrestSheet.current.open();
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.cardBg,
                marginBottom: 8,
                paddingHorizontal: 15,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View style={{ flex: 1 }}>
                <Text style={[FONTS.h6, { color: colors.title, marginBottom: 2 }]}>Intrests</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}>
                  <Chip
                    style={{ backgroundColor: colors.background, marginRight: 6, marginBottom: 6 }}
                    textStyle={{ color: COLORS.primary3 }}
                    onPress={() => null}>
                    Basketball
                  </Chip>
                  <Chip
                    style={{ backgroundColor: colors.background, marginRight: 6, marginBottom: 6 }}
                    textStyle={{ color: COLORS.primary3 }}
                    onPress={() => null}>
                    Cricket
                  </Chip>
                  <Chip
                    style={{ backgroundColor: colors.background, marginRight: 6, marginBottom: 6 }}
                    textStyle={{ color: COLORS.primary3 }}
                    onPress={() => null}>
                    Swimming
                  </Chip>
                  <Chip
                    style={{ backgroundColor: colors.background, marginRight: 6, marginBottom: 6 }}
                    textStyle={{ color: COLORS.primary3 }}
                    onPress={() => null}>
                    Food
                  </Chip>
                </View>
              </View>
              <FeatherIcon color={colors.textLight} size={26} name="chevron-right" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    borderWidth: 1.3,
    marginVertical: 5,
    borderRadius: SIZES.radius,
    borderStyle: "dashed",
    minHeight: SIZES.width / 3.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});

export default EditProfile;
