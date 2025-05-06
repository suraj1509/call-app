import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { List } from "react-native-paper";
import uuid from "react-native-uuid";
import FeatherIcon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import storage from "@react-native-firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import LanguageSheet from "../components/LanguageSheet";
import AboutSheet from "../components/AboutSheet";
import ImageResizer from "react-native-image-resizer";
import * as services from "../../../../services/user";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TimeSlotSheet from "../components/TimeSlotSheet";
import ToggleStyle3 from "../../../../app/components/Toggles/ToggleStyle3";
import ToggleStyleRevert from "../../../../app/components/Toggles/ToggleStyleRevert";
import CheckList from "../components/CheckList";
import { indianStates } from "../../Utilities/States";
import ButtonLight from "../../../../app/components/Button/ButtonLight";
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";

const EditProfile = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const { colors } = useTheme();
  // const profileSheet = useRef();
  // const sheetRef = useRef();
  const languageSheet = useRef();
  const timeSlotSheet = useRef();
  const aboutSheet = useRef();
  const dispatch = useDispatch();

  const [imageData, setImageData] = useState(user?.profilePhotos || []);
  const [loader0, setLoader0] = React.useState(false);
  const [loader1, setLoader1] = React.useState(false);
  const [loader2, setLoader2] = React.useState(false);
  const [loader3, setLoader3] = React.useState(false);
  const [loader4, setLoader4] = React.useState(false);
  const [loader5, setLoader5] = React.useState(false);
  const [image0, setImage0] = React.useState("");
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [image3, setImage3] = React.useState("");
  const [image4, setImage4] = React.useState("");
  const [image5, setImage5] = React.useState("");
  const [upload, setUpload] = React.useState(false);
  const [rate, setRate] = useState([user?.rate] || [5]);
  const [modal, setModal] = React.useState(false)
  const height = Dimensions.get('window').height
  const [state, setState] = React.useState(user?.state)

  React.useEffect(() => {
    if (user?.profilePhotos) {
      setImage0(user?.profilePhotos[0]);
      setImage1(user?.profilePhotos[1]);
      setImage2(user?.profilePhotos[2]);
      setImage3(user?.profilePhotos[3]);
      setImage4(user?.profilePhotos[4]);
      setImage5(user?.profilePhotos[5]);
    }
  }, [user]);

  React.useEffect(() => {
    const backAction = () => {
      if (loader0 || loader1 || loader2 || loader3 || loader4 || loader5) {
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [loader0, loader1, loader2, loader3, loader4, loader5]);

  React.useEffect(() => {
    if (upload === true) {
      let profilePhotos = [];
      if (image0) {
        profilePhotos.push(image0);
      }
      if (image1) {
        profilePhotos.push(image1);
      }
      if (image2) {
        profilePhotos.push(image2);
      }
      if (image3) {
        profilePhotos.push( image3 );
      }
      if (image4) {
        profilePhotos.push( image4 );
      }
      if (image5) {
        profilePhotos.push(image5);
      }
      // if (profilePhotos.length > 0) {
      //   profilePhotos[0].isProfilePhoto = true;
      // }
      services.updateUser({ profilePhotos });
      ToastAndroid.show("Photos Adjusted Successfully", ToastAndroid.SHORT);
      setUpload(false);
    }
  }, [upload]);

  const uploadToFirebaseStorage = async (uri, path) => {
    try {
      const reference = storage().ref(path);
      await reference.putFile(uri);
      return await reference.getDownloadURL();
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
    }
  };

  const UploadFile = async (index) => {
    if (Platform.OS === "ios") {
      let options = {
        mediaType: "photo",
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
      try {
        launchImageLibrary(
          {
            mediaType: "photo",
          },
          async (response) => {
            if (response.didCancel || !response.assets || response.assets.length === 0) {
              console.warn("User cancelled image selection");
              return;
            }
            if (index === 0) {
              setLoader0(true);
            } else if (index === 1) {
              setLoader1(true);
            } else if (index === 2) {
              setLoader2(true);
            } else if (index === 3) {
              setLoader3(true);
            } else if (index === 4) {
              setLoader4(true);
            } else if (index === 5) {
              setLoader5(true);
            }
            const asset = response.assets[0];
            const imageUri = asset.uri;
            const fileName = `${uuid.v4()}.jpg`;

            const spImage = await ImageResizer.createResizedImage(imageUri, 720, 1280, "JPEG", 30);
            const url = await uploadToFirebaseStorage(spImage.uri, `sp/${fileName}`);
            if (index === 0) {
              setLoader0(false);
              setImage0(url);
              setUpload(true);
            } else if (index === 1) {
              setLoader1(false);
              setImage1(url);
              setUpload(true);
            } else if (index === 2) {
              setLoader2(false);
              setImage2(url);
              setUpload(true);
            } else if (index === 3) {
              setLoader3(false);
              setImage3(url);
              setUpload(true);
            } else if (index === 4) {
              setLoader4(false);
              setImage4(url);
              setUpload(true);
            } else if (index === 5) {
              setLoader5(false);
              setImage5(url);
              setUpload(true);
            }
          },
        );
      } catch (err) {
        if (index === 0) {
          setLoader0(false);
        } else if (index === 1) {
          setLoader1(false);
        } else if (index === 2) {
          setLoader2(false);
        } else if (index === 3) {
          setLoader3(false);
        } else if (index === 4) {
          setLoader4(false);
        } else if (index === 5) {
          setLoader5(false);
        }
        console.error("Error selecting image:", err);
      }
    }
  };

  const removeImageItem = async (index) => {
    let profilePhotos = [];
    if (image0) {
      profilePhotos.push({ url: image0 });
    }
    if (image1) {
      profilePhotos.push({ url: image1 });
    }
    if (image2) {
      profilePhotos.push({ url: image2 });
    }
    if (image3) {
      profilePhotos.push({ url: image3 });
    }
    if (image4) {
      profilePhotos.push({ url: image4 });
    }
    if (image5) {
      profilePhotos.push({ url: image5 });
    }
    if (profilePhotos.length > 1) {
      if (index === 0) {
        setImage0("");
        setUpload(true);
      } else if (index === 1) {
        setImage1("");
        setUpload(true);
      } else if (index === 2) {
        setImage2("");
        setUpload(true);
      } else if (index === 3) {
        setImage3("");
        setUpload(true);
      } else if (index === 4) {
        setImage4("");
        setUpload(true);
      } else if (index === 5) {
        setImage5("");
        setUpload(true);
      }
    } else {
      ToastAndroid.show("Atleast one photo of the user should be available");
    }
  };

  return (
    <>
      {/* <InterestsSheet sheetRef={profileSheet} /> */}
      <LanguageSheet sheetRef={languageSheet} />
      <TimeSlotSheet sheetRef={timeSlotSheet} />
      <AboutSheet sheetRef={aboutSheet} />

      {/* <RBSheet
        ref={sheetRef}
        height={480}
        openDuration={100}
        closeOnDragDown={true}
        onClose={SaveRelationShipGoals}
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
        {sheetType == "relation" ? (
          <RelationshipGoalsSheet sheetRef={sheetRef} setLookingFor={setLookingFor} lookingFor={lookingFor} />
        ) : sheetType == "orientation" ? (
          <SexualOrientationSheet />
        ) : (
          <></>
        )}
      </RBSheet> */}

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Header
          leftIcon={"back"}
          title={"Edit Profile"}
          titleLeft
          backAction={() => {
            if (loader0 || loader1 || loader2 || loader3 || loader4 || loader5) {
              return;
            } else {
              navigation.navigate("DrawerNavigation");
            }
          }}
        />

        <ScrollView>
          <View style={GlobalStyleSheet.container}>
          <Modal visible={modal} transparent onLayout={() => setModal(false)}>
            <TouchableWithoutFeedback onPress={() => setModal(false)}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      justifyContent: "center",
                      alignContent: "center",
                     
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.cardBg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        margin: 20,
                        borderRadius: 10,
                        padding: 16,
                        gap: 10,
                        height: height *  0.7 ,
                        overflow: "hidden",
                        // backgroundColor: "blue",
                      }}
                    >
                      <View style={{ padding: 16 }}>
                        <Text
                          style={{
                            ...FONTS.h5,
                            // flex: 1,
                            textAlign: "center",
                            color: colors.title,
                          }}
                        >
                          Please select your state
                        </Text>
                      </View>
                     
                      <View >
                        <ScrollView >
                      {indianStates?.map((data, index) => {
                      return (
                        <CheckList
                          onPress={() => {
                            setState(data)
                            setModal(false)
                            dispatch(Actions?.updateCurrentUser({state: data}))
                        }}
                          item={data}
                          checked={state === data ? true : false}
                          key={index}
                        />
                      );
                    })}
                    </ScrollView>
                      </View>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                </Modal>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <View style={GlobalStyleSheet.col66}>
                <TouchableOpacity
                  onPress={() => {
                    if (!image0) {
                      UploadFile(0);
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      height: SIZES.width / 1.8,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg,
                    },
                  ]}
                >
                  {image0 ? (
                    <>
                      <Image
                        source={{ uri: image0 }}
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
                        }}
                      >
                        <FeatherIcon name="x" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : loader0 ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="image" color={colors.borderColor} size={45} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  onPress={() => {
                    if (!image1) {
                      UploadFile(1);
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg,
                    },
                  ]}
                >
                  {image1 ? (
                    <>
                      <Image
                        source={{ uri: image1 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SIZES.radius,
                        }}
                      />
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => removeImageItem(1)}
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
                        }}
                      >
                        <FeatherIcon name="x" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : loader1 ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (!image2) {
                      UploadFile(2);
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg,
                    },
                  ]}
                >
                  {image2 ? (
                    <>
                      <Image
                        source={{ uri: image2 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SIZES.radius,
                        }}
                      />
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => removeImageItem(2)}
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
                        }}
                      >
                        <FeatherIcon name="x" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : loader2 ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  onPress={() => {
                    if (!image3) {
                      UploadFile(3);
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg,
                    },
                  ]}
                >
                  {image3 ? (
                    <>
                      <Image
                        source={{ uri: image3 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SIZES.radius,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImageItem(3)}
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
                        }}
                      >
                        <FeatherIcon name="x" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : loader3 ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  onPress={() => {
                    if (!image4) {
                      UploadFile(4);
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg,
                    },
                  ]}
                >
                  {image4 ? (
                    <>
                      <Image
                        source={{ uri: image4 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SIZES.radius,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImageItem(4)}
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
                        }}
                      >
                        <FeatherIcon name="x" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : loader4 ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  onPress={() => {
                    if (!image5) {
                      UploadFile(5);
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      borderColor: colors.borderColor,
                      backgroundColor: colors.cardBg,
                    },
                  ]}
                >
                  {image5 ? (
                    <>
                      <Image
                        source={{ uri: image5 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SIZES.radius,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImageItem(5)}
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
                        }}
                      >
                        <FeatherIcon name="x" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : loader5 ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="plus" color={colors.borderColor} size={40} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 5,
                  marginTop: 25,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
                Languages Spoken
              </Text>
              <List.Item
                onPress={() => {
                  languageSheet.current.open();
                }}
                style={{
                  marginHorizontal: -15,
                }}
                titleStyle={{ ...FONTS.font, fontSize: 16, color: colors.text }}
                title={user?.languagesSpoken?.map((languagesSpoken) => languagesSpoken).join(", ") || "Add Languages"}
              />
            </View>  
            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 5,
                  marginTop: 25,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
                Time Slots
              </Text>
              <List.Item
                onPress={() => {
                  timeSlotSheet.current.open();
                }}
                style={{
                  marginHorizontal: -15,
                }}
                titleStyle={{ ...FONTS.font, fontSize: 16, color: colors.text }}
                title={user?.timeSlots?.map((timeSlots) => timeSlots).join(", ") || "Select slots"}
              />
            </View>
            {/* <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 5,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
                Relationship Goals
              </Text>
              <List.Item
                onPress={() => {
                  setSheetType("relation");
                  sheetRef.current.open();
                }}
                style={{
                  marginHorizontal: -15,
                }}
                right={() => <FeatherIcon size={18} color={colors.text} name="chevron-right" />}
                titleStyle={{ ...FONTS.font, fontSize: 16, color: colors.text }}
                title={genderData[lookingFor] || "Long-term partner"}
              />
            </View> */}
            <View>
          
          <CheckList
            onPress={() => {
                setModal(true)}}
            item={state ? [state] : ["Select state"]}
            dropdown={true}
            checked={false}
       
          />
    
    </View>
            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 5,
                },
              ]}
            >
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  // borderBottomWidth: 1,
                  // borderBottomColor: colors.borderColor,
                }}
              >
                Set Rate
              </Text>
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  // borderBottomWidth: 1,
                  // borderBottomColor: colors.borderColor,
                }}
              >
                {rate}
              </Text>
              </View>
              <View style={{alignItems:"center"}}>

               <MultiSlider
                trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                selectedStyle={{
                    backgroundColor:COLORS.primary3,
                }}
                values={rate}
                markerStyle={{
                    backgroundColor:COLORS.white,
                    top:1,
                    height:16,
                    width:16,
                    borderWidth:3,
                    borderColor:COLORS.primary3,
                }}
                onValuesChange={(val) => setRate(val)}
                onValuesChangeFinish={(val) => {
                  dispatch(Actions?.updateCurrentUser({ rate: val[0] }));
                }}
                min={5}
                sliderLength={SIZES.width - 100}
                max={20}
            />
              </View>
            </View>
            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  // paddingBottom: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  // paddingBottom: 8,
                  // marginBottom: 5,
                  // borderBottomWidth: 1,
                  // borderBottomColor: colors.borderColor,
                }}
              >
                Vacation Mode
              </Text>
              <ToggleStyle3 mode="vacation"/>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  aboutSheet.current.open();
                }}
              >
                <List.Item
                  style={{
                    marginHorizontal: -15,
                  }}
                  right={() => <FeatherIcon size={18} color={colors.text} name="edit" />}
                  titleStyle={{ ...FONTS.font, fontSize: 16, color: colors.text }}
                  title={user?.about}
                />
              </TouchableOpacity> */}
            </View><View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  // paddingBottom: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  // paddingBottom: 8,
                  // marginBottom: 5,
                  // borderBottomWidth: 1,
                  // borderBottomColor: colors.borderColor,
                }}
              >
                Turn Off Notifications
              </Text>
              <ToggleStyleRevert mode="notification"/>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  aboutSheet.current.open();
                }}
              >
                <List.Item
                  style={{
                    marginHorizontal: -15,
                  }}
                  right={() => <FeatherIcon size={18} color={colors.text} name="edit" />}
                  titleStyle={{ ...FONTS.font, fontSize: 16, color: colors.text }}
                  title={user?.about}
                />
              </TouchableOpacity> */}
            </View>
            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 5,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
                About Me
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  aboutSheet.current.open();
                }}
              >
                <List.Item
                  style={{
                    marginHorizontal: -15,
                  }}
                  right={() => <FeatherIcon size={18} color={colors.text} name="edit" />}
                  titleStyle={{ ...FONTS.font, fontSize: 16, color: colors.text }}
                  title={user?.about}
                />
              </TouchableOpacity>
            </View>
            <ButtonOutline title="Request Admin Approval" btnRounded onPress={()=>ToastAndroid.show("Requested for admin approval", ToastAndroid.SHORT)}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
